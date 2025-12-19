import fs from "fs/promises";
import path from "path";

export type KnowledgeMetadata = {
  title: string;
  slug: string;
  lastUpdated: string;
};

export type KnowledgeDocument = KnowledgeMetadata & {
  content: string;
};

export type Chunk = {
  id: string;
  sourceTitle: string;
  sourceSlug: string;
  text: string;
};

const KNOWLEDGE_DIR = path.join(process.cwd(), "src/content/knowledge");
const MIN_CHUNK_LEN = 400;
const MAX_CHUNK_LEN = 900;

export async function readKnowledgeDocuments(
  dir = KNOWLEDGE_DIR,
): Promise<KnowledgeDocument[]> {
  const entries = await fs.readdir(dir);
  const markdownFiles = entries.filter((file) => file.endsWith(".md"));

  const docs: KnowledgeDocument[] = [];
  for (const file of markdownFiles) {
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    const parsed = parseMarkdown(raw);
    if (parsed) {
      docs.push(parsed);
    }
  }

  return docs;
}

export async function loadChunks(dir = KNOWLEDGE_DIR): Promise<Chunk[]> {
  const docs = await readKnowledgeDocuments(dir);
  return docs.flatMap((doc) => chunkDocument(doc));
}

export function chunkDocument(doc: KnowledgeDocument): Chunk[] {
  const paragraphs = splitIntoParagraphs(doc.content);
  const chunks: string[] = [];
  let current = "";

  const pushCurrent = () => {
    const text = current.trim();
    if (text) {
      chunks.push(text);
    }
    current = "";
  };

  for (const paragraph of paragraphs) {
    const candidate = current
      ? `${current}\n\n${paragraph}`
      : paragraph;

    if (candidate.length > MAX_CHUNK_LEN && current) {
      pushCurrent();
    }

    if (paragraph.length > MAX_CHUNK_LEN) {
      const splits = splitLongParagraph(paragraph, MAX_CHUNK_LEN);
      for (const split of splits) {
        current = current
          ? `${current}\n\n${split}`
          : split;
        if (current.length >= MIN_CHUNK_LEN) {
          pushCurrent();
        }
      }
      continue;
    }

    current = candidate;
    if (current.length >= MIN_CHUNK_LEN) {
      pushCurrent();
    }
  }

  if (current.trim()) {
    pushCurrent();
  }

  const baseId =
    doc.slug.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "chunk";

  return chunks.map((text, idx) => ({
    id: `${baseId}-${idx + 1}`,
    sourceTitle: doc.title,
    sourceSlug: doc.slug,
    text,
  }));
}

function parseMarkdown(raw: string): KnowledgeDocument | null {
  const trimmed = raw.trimStart();
  if (!trimmed.startsWith("---")) {
    return null;
  }

  const end = trimmed.indexOf("\n---", 3);
  if (end === -1) {
    return null;
  }

  const header = trimmed.slice(3, end).trim();
  const body = trimmed.slice(end + 4).trim();

  const metadata: Record<string, string> = {};
  for (const line of header.split("\n")) {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;
    metadata[key.trim()] = rest.join(":").trim().replace(/^"|"$/g, "");
  }

  const { title, slug, lastUpdated } = metadata;
  if (!title || !slug || !lastUpdated) {
    return null;
  }

  return {
    title,
    slug,
    lastUpdated,
    content: body,
  };
}

function splitIntoParagraphs(content: string): string[] {
  const paragraphs: string[] = [];
  let buffer: string[] = [];

  const flush = () => {
    const text = buffer.join(" ").trim();
    if (text) {
      paragraphs.push(text);
    }
    buffer = [];
  };

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    const headingMatch = /^#{1,6}\s+(.*)$/.exec(trimmed);
    if (headingMatch) {
      flush();
      const headingText = headingMatch[1].trim();
      if (headingText) {
        paragraphs.push(headingText);
      }
      continue;
    }

    if (!trimmed) {
      flush();
      continue;
    }

    buffer.push(trimmed);
  }

  flush();
  return paragraphs;
}

function splitLongParagraph(text: string, maxLen: number): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const parts: string[] = [];
  let current = "";

  const push = () => {
    const trimmed = current.trim();
    if (trimmed) {
      parts.push(trimmed);
    }
    current = "";
  };

  for (const sentence of sentences) {
    const candidate = current
      ? `${current} ${sentence}`
      : sentence;
    if (candidate.length > maxLen && current) {
      push();
      current = sentence;
      continue;
    }
    current = candidate;
  }

  if (current.trim()) {
    push();
  }

  return parts;
}
