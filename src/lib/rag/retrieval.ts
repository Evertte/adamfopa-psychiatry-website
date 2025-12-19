import type { Chunk } from "./chunk";

export type TfidfVector = {
  weights: Record<string, number>;
  norm: number;
};

export type RagIndexChunk = Chunk &
  TfidfVector;

export type RagIndexFile = {
  generatedAt: string;
  totalDocuments: number;
  docFrequency: Record<string, number>;
  chunks: RagIndexChunk[];
};

// Lightweight stopword list keeps scoring focused on intent-bearing words.
export const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "are",
  "with",
  "that",
  "this",
  "you",
  "your",
  "our",
  "but",
  "not",
  "have",
  "has",
  "had",
  "was",
  "were",
  "can",
  "will",
  "just",
  "into",
  "from",
  "about",
  "there",
  "their",
  "they",
  "them",
  "these",
  "those",
  "then",
  "than",
  "over",
  "under",
  "such",
  "only",
  "also",
  "very",
  "may",
  "might",
  "should",
  "would",
  "could",
  "a",
  "an",
  "of",
  "in",
  "on",
  "to",
  "at",
  "or",
  "as",
  "by",
  "it",
  "be",
  "is",
  "if",
  "so",
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

export function countDocFrequency(tokenLists: string[][]): Record<string, number> {
  const df = new Map<string, number>();

  for (const tokens of tokenLists) {
    const seen = new Set<string>();
    for (const token of tokens) {
      if (seen.has(token)) continue;
      seen.add(token);
      df.set(token, (df.get(token) ?? 0) + 1);
    }
  }

  return Object.fromEntries(df.entries());
}

export function buildTfidfVector(
  tokens: string[],
  docFrequency: Record<string, number>,
  totalDocuments: number,
): TfidfVector {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) ?? 0) + 1);
  }

  const weights: Record<string, number> = {};
  let normSquared = 0;

  for (const [token, count] of tf.entries()) {
    const df = docFrequency[token];
    if (!df) continue;
    const idf = Math.log((totalDocuments + 1) / (df + 1)) + 1;
    const weight = (count / tokens.length) * idf;
    weights[token] = weight;
    normSquared += weight * weight;
  }

  return {
    weights,
    norm: Math.sqrt(normSquared) || 1,
  };
}

export function cosineSimilarity(
  query: TfidfVector,
  target: TfidfVector,
): number {
  let score = 0;
  for (const [token, weight] of Object.entries(query.weights)) {
    const targetWeight = target.weights[token];
    if (!targetWeight) continue;
    score += weight * targetWeight;
  }
  return score / (query.norm * target.norm);
}
