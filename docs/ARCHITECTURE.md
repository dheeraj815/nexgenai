# NexGenAI System Architecture

## Architecture Overview
NexGenAI employs a modular layered client-server architecture:
- **Presentation Layer (Client)**: Built with React 18, TypeScript, Vite, Tailwind CSS, Lucide icons, and the browser Web Speech API. Supports responsive layouts from mobile (390px) to desktop (1440px).
- **Application Services Layer (Backend)**: Built with Node.js 24 and Express in TypeScript. Organizes services into modular domains with strict Role-Based Access Control (RBAC).
- **Persistence Layer**: Powered by Prisma ORM with SQLite (dev/local zero-dependency) and seamless PostgreSQL support via DATABASE_URL.
- **AI & Voice Services**: Clean adapter pattern connecting external LLMs (Google Gemini 2.5/Pro, OpenAI) with deterministic intelligent local heuristic fallbacks, and browser-standard SpeechSynthesis & SpeechRecognition.