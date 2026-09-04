# NexGenAI — Campus→Career AI

> "The Student & TPO Operating System for Skills, Learning, Proof of Work, Placements & Modern Hiring."

NexGenAI is a full-stack production platform connecting the unbroken student continuum from **Class 11 & Class 12** to **College Years 1–4**, **Internships**, **Campus Placements**, and **First Job / Career Growth**.

---

## 🌟 Core System Highlights

- **Unbroken Student Continuum**: Class 11 (Career Discovery) → Class 12 (Direction & Pathways) → Year 1 (CS Foundations) → Year 2 (Specialization) → Year 3 (Industry Prep & Internships) → Year 4 (Placement Command) → Career Growth.
- **Three Product Surfaces in One**:
  - **Student OS**: Dashboard, Career Passport, Learning Engine, Practice Labs, AI Career Mentor, Resume ATS, Job Matches.
  - **College / TPO OS**: Placement Drives, Automated Eligibility Engine, Student Directory, Analytics.
  - **Recruiter OS**: Candidate Talent Search, Job Openings, Shortlists, Verified Offers.
- **Interactive Practice & Verification Labs**:
  - **Coding Lab**: In-browser sandbox code runner with unit tests and automated skill verification.
  - **System Design Canvas**: Architecture builder with real-time SPOF, latency, and bottleneck analysis.
  - **SOC Incident Simulator**: Synthetic cybersecurity threat triage, syslog analysis, and containment response.
  - **Resume & ATS Studio**: Real keyword matching against job descriptions, metrics and action verb detection.
- **AI & Voice Architecture**:
  - **AIService**: Centralized AI engine supporting Gemini 2.5/Pro and deterministic intelligent local NLP heuristic fallbacks.
  - **VoiceService**: Global Web Speech API audio narration for course lessons, spoken AI mentor chat, and mock interviews.
- **Zero Monetization**: Absolutely no plans, subscriptions, pricing tiers, paywalls, or billing integrations.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v20+ (Tested on v24.14.0)
- **npm**: v10+ (Tested on 11.9.0)

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/dheeraj815/nexgenai.git
cd nexgenai

# Install root workspaces dependencies
npm install
```

### 2. Database Migration & Seed
```bash
# Push schema to SQLite and run comprehensive 30-domain seed script
npm run db:migrate --workspace=server
npm run db:seed --workspace=server
```

### 3. Run Development Servers
```bash
# Start backend (port 5000) and frontend (port 5173) concurrently
npm run dev
```

Visit: **http://localhost:5173**

---

## 🧪 Automated Testing
```bash
npm run test --workspace=server
```
Runs the 12 automated API, persistence, security, and RBAC integration tests.

---

## 📁 Repository Structure
```
nexgenai/
├── client/              # React 18/19 + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── api/         # Typed API client
│   │   ├── components/  # Layout, Voice controls, Skeletons, Modals
│   │   ├── context/     # AuthContext, VoiceContext, NotificationContext
│   │   └── pages/       # Student OS, TPO OS, Recruiter OS, Labs, Auth
├── server/              # Node.js + Express + TypeScript + Prisma ORM
│   ├── prisma/          # Relational schema (38 models) & rich seed script
│   ├── src/
│   │   ├── config/      # Environment variables and security configurations
│   │   ├── middleware/  # JWT authentication, RBAC, error handlers
│   │   └── modules/     # Auth, Passport, Learning, Skills, Coding, SOC, ATS, TPO, Recruiter
│   └── tests/           # Automated end-to-end API test suites
└── docs/                # Architectural and technical documentation
```