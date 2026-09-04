# NexGenAI AI Architecture

## Hybrid Architecture: LLM + Local Heuristic Fallback
- **Class Definition**: `server/src/modules/ai/ai.service.ts`
- **Online Mode**: When `GEMINI_API_KEY` is present, queries Google Gemini 1.5/2.5 for generative advice.
- **Offline / Local Heuristic Mode**: When no key is set or network is unreachable, executes a deterministic NLP engine informed by:
  - Exact academic stage (Class 11 to Career)
  - Claimed, assessed, and verified skills
  - Delivered projects and Coding Lab records
  - Target industry role
- **No Hallucinated Claims**: Returns honest diagnostic headers (`provider: "gemini" | "local_heuristic"`).