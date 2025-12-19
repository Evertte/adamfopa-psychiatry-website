import fs from "fs/promises";
import path from "path";
import { loadChunks } from "../src/lib/rag/chunk.ts";
import {
  buildTfidfVector,
  countDocFrequency,
  type RagIndexFile,
  type RagIndexChunk,
  tokenize,
} from "../src/lib/rag/retrieval.ts";

async function main() {
  const projectRoot = process.cwd();
  const knowledgeDir = path.join(projectRoot, "src/content/knowledge");
  const outputPath = path.join(projectRoot, "src/content/rag-index.json");

  const chunks = await loadChunks(knowledgeDir);
  if (!chunks.length) {
    throw new Error(`No markdown files found in ${knowledgeDir}`);
  }

  const tokenLists = chunks.map((chunk) => tokenize(chunk.text));
  const docFrequency = countDocFrequency(tokenLists);
  const totalDocuments = chunks.length;

  const weightedChunks: RagIndexChunk[] = chunks.map((chunk, idx) => {
    const vector = buildTfidfVector(
      tokenLists[idx],
      docFrequency,
      totalDocuments,
    );
    return {
      ...chunk,
      weights: vector.weights,
      norm: vector.norm,
    };
  });

  const index: RagIndexFile = {
    generatedAt: new Date().toISOString(),
    totalDocuments,
    docFrequency,
    chunks: weightedChunks,
  };

  await fs.writeFile(outputPath, JSON.stringify(index, null, 2), "utf8");
  console.log(
    `Indexed ${weightedChunks.length} chunks into ${path.relative(projectRoot, outputPath)}`,
  );
}

main().catch((error) => {
  console.error("Failed to build rag index:", error);
  process.exitCode = 1;
});
