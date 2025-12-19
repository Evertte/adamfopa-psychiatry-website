import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import {
  cosineSimilarity,
  buildTfidfVector,
  tokenize,
  type RagIndexChunk,
  type RagIndexFile,
} from "@/lib/rag/retrieval";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatRole = "user" | "assistant";

type ChatTurn = {
  role: ChatRole;
  content: string;
};

type AssistantResponse = {
  answer: string;
  sources: { title: string; slug: string }[];
};

const INDEX_PATH = path.join(process.cwd(), "src/content/rag-index.json");
const MAX_RESULTS = 6;
const MIN_RESULTS = 4;
const CONFIDENCE_THRESHOLD = 0.08;

let cachedIndex: RagIndexFile | null = null;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { message, history } = body as {
    message?: string;
    history?: ChatTurn[];
  };

  const userMessage = (message ?? "").trim();
  if (!userMessage) {
    return NextResponse.json(
      { error: "Message is required" },
      { status: 400 },
    );
  }

  if (isEmergency(userMessage)) {
    return NextResponse.json(
      buildEmergencyResponse(),
      { status: 200 },
    );
  }

  if (asksForMedicalAdvice(userMessage)) {
    return NextResponse.json(
      buildClinicalRefusal(),
      { status: 200 },
    );
  }

  let index: RagIndexFile;
  try {
    index = await loadIndex();
  } catch (error) {
    console.error("Failed to load RAG index", error);
    return NextResponse.json(
      buildLowConfidenceResponse(),
      { status: 200 },
    );
  }
  if (!index.chunks?.length) {
    return NextResponse.json(
      buildLowConfidenceResponse(),
      { status: 200 },
    );
  }

  const queryTokens = tokenize(userMessage);
  if (!queryTokens.length) {
    return NextResponse.json(
      buildLowConfidenceResponse(),
      { status: 200 },
    );
  }

  const queryVector = buildTfidfVector(
    queryTokens,
    index.docFrequency,
    index.totalDocuments,
  );

  const scored = index.chunks
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(queryVector, chunk),
    }))
    .sort((a, b) => b.score - a.score);

  const topMatches = scored
    .slice(0, MAX_RESULTS)
    .filter((entry) => entry.score > 0);

  const bestScore = topMatches[0]?.score ?? 0;
  const isLowConfidence =
    topMatches.length < MIN_RESULTS || bestScore < CONFIDENCE_THRESHOLD;

  if (isLowConfidence) {
    return NextResponse.json(
      buildLowConfidenceResponse(topMatches.map((match) => match.chunk)),
      { status: 200 },
    );
  }

  const sources = dedupeSources(topMatches.map((match) => match.chunk));
  const answer = await generateAnswer(userMessage, topMatches, history ?? []);

  return NextResponse.json(
    {
      answer,
      sources,
    },
    { status: 200 },
  );
}

async function loadIndex(): Promise<RagIndexFile> {
  if (cachedIndex) return cachedIndex;
  const raw = await fs.readFile(INDEX_PATH, "utf8");
  cachedIndex = JSON.parse(raw) as RagIndexFile;
  return cachedIndex;
}

function isEmergency(message: string): boolean {
  const normalized = message.toLowerCase();
  const patterns = [
    /suicide/,
    /kill myself/,
    /harm myself/,
    /self[-\s]?harm/,
    /overdose/,
    /end it all/,
    /immediate danger/,
    /urgent help/,
    /emergency/,
    /crisis/,
  ];
  return patterns.some((pattern) => pattern.test(normalized));
}

function asksForMedicalAdvice(message: string): boolean {
  const normalized = message.toLowerCase();
  const patterns = [
    /diagnos/,
    /do i have/,
    /what is wrong with me/,
    /should i (take|start|stop)/,
    /medication/,
    /dose|dosage|mg\b/,
    /prescrib/,
    /side effects?/,
    /symptom/,
    /adjust.*meds?/,
    /can you treat/,
  ];
  return patterns.some((pattern) => pattern.test(normalized));
}

function buildEmergencyResponse(): AssistantResponse {
  return {
    answer:
      "I’m not able to help with emergencies here. Please call 911, go to the nearest emergency room, or contact the Suicide & Crisis Lifeline at 988 for immediate assistance.",
    sources: [{ title: "Contact", slug: "/contact" }],
  };
}

function buildClinicalRefusal(): AssistantResponse {
  return {
    answer:
      "I can only share general practice information like services, scheduling, fees, insurance, telehealth, and policies. I can’t provide medical advice, diagnose conditions, or guide medications. Please contact the practice to discuss your care.",
    sources: [
      { title: "Contact", slug: "/contact" },
      { title: "New Patients", slug: "/new-patients" },
    ],
  };
}

function buildLowConfidenceResponse(
  chunks: RagIndexChunk[] = [],
): AssistantResponse {
  const sources = dedupeSources(chunks);
  if (!sources.length) {
    sources.push({ title: "Contact", slug: "/contact" });
    sources.push({ title: "New Patients", slug: "/new-patients" });
  }
  return {
    answer:
      "I may not have that information yet. Please reach out through the contact form or review the New Patients page for next steps.",
    sources,
  };
}

async function generateAnswer(
  message: string,
  matches: { chunk: RagIndexChunk; score: number }[],
  history: ChatTurn[],
): Promise<string> {
  const sourcesText = matches
    .map(
      ({ chunk }, idx) =>
        `${idx + 1}. [${chunk.sourceTitle}](${chunk.sourceSlug}): ${chunk.text}`,
    )
    .join("\n\n");

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return buildExtractiveAnswer(matches.map((match) => match.chunk));
  }

  const systemPrompt =
    "You are a helpful Practice Info Assistant for an outpatient psychiatry practice. Scope: fees, insurance, scheduling, services, locations, telehealth, policies, and new patient steps. Do NOT provide medical advice, diagnosis, or medication guidance. Always include short citations like (Source: Title). If asked about emergencies, direct to call 911/988 and nearest ER. Keep answers concise and grounded ONLY in the provided context.";

  const trimmedHistory = (history ?? [])
    .filter(
      (turn) =>
        (turn.role === "user" || turn.role === "assistant") &&
        typeof turn.content === "string" &&
        turn.content.trim().length,
    )
    .slice(-6);

  const messages = [
    { role: "system", content: systemPrompt },
    ...trimmedHistory.map((turn) => ({
      role: turn.role,
      content: turn.content.trim(),
    })),
    {
      role: "user",
      content: `User question: "${message}"\n\nUse only the context below to answer concisely with citations.\n\nContext:\n${sourcesText}`,
    },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.2,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI request failed", await response.text());
      return buildExtractiveAnswer(matches.map((match) => match.chunk));
    }

    const json = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content;
    if (!content) {
      return buildExtractiveAnswer(matches.map((match) => match.chunk));
    }
    return content.trim();
  } catch (error) {
    console.error("OpenAI request error", error);
    return buildExtractiveAnswer(matches.map((match) => match.chunk));
  }
}

function buildExtractiveAnswer(chunks: RagIndexChunk[]): string {
  const sentences: string[] = [];
  for (const chunk of chunks.slice(0, 3)) {
    const parts = chunk.text.split(/(?<=[.!?])\s+/).filter(Boolean);
    sentences.push(...parts.slice(0, 2));
  }

  const summary = sentences.slice(0, 5).join(" ");
  const fallback = summary || "I found a few related details.";
  return `${fallback} If you need more details, you can contact the practice or request an appointment.`;
}

function dedupeSources(chunks: RagIndexChunk[]): { title: string; slug: string }[] {
  const seen = new Set<string>();
  const sources: { title: string; slug: string }[] = [];
  for (const chunk of chunks) {
    if (seen.has(chunk.sourceSlug)) continue;
    seen.add(chunk.sourceSlug);
    sources.push({ title: chunk.sourceTitle, slug: chunk.sourceSlug });
  }
  return sources;
}
