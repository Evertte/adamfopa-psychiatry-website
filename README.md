# Adamfopa Psychiatry Website

Next.js (App Router) site for Adamfopa Outpatient Psychiatry.

## Commands
- `npm run dev` — start the dev server.
- `npm run build` — production build.
- `npm run start` — start the production server.
- `npm run lint` — lint the codebase.
- `npm run build:rag` — regenerate the RAG index (requires Node 22+ with `--experimental-strip-types`).

## Practice Info Assistant (RAG)
- Source content lives in `src/content/knowledge/*.md` with frontmatter (`title`, `slug`, `lastUpdated`) plus Markdown body text.
- Rebuild the retrieval index after editing content: `npm run build:rag` (writes `src/content/rag-index.json`).
- API: `POST /api/assistant` with `{ message: string, history?: { role: "user" | "assistant", content: string }[] }`.
  - Handles emergencies and medical-advice questions with safe responses.
  - Uses TF-IDF retrieval against the in-repo index; if `OPENAI_API_KEY` is set, answers are synthesized with provided context only, otherwise a deterministic extractive reply is returned.

## Running locally
1. Install dependencies: `npm install`
2. (Optional) set `OPENAI_API_KEY` in your environment for LLM-backed responses.
3. Build the RAG index: `npm run build:rag`
4. Start dev server: `npm run dev` then visit `http://localhost:3000`
