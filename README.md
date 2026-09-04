# NexGenAI — Campus→Career AI

> "The Student & TPO Operating System for Skills, Learning, Proof of Work, Placements & Modern Hiring."

NexGenAI is a production-grade full-stack platform connecting the complete student continuum: **Class 11 & Class 12** → **College Years 1–4** → **Internships** → **Campus Placements** → **First Job & Career Growth**.

---

## 🌟 Core System Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS (`frontend/`)
- **Backend**: Python 3.13 + FastAPI + SQLAlchemy + Pydantic (`backend/`)
- **Database**: PostgreSQL single source of truth with zero-config local SQLite fallback (`database/`)
- **Object Storage**: Clean storage abstraction layer for resumes and artifacts (`uploads/`)
- **AI Engine**: Centralized AI Provider with Google Gemini adapter & deterministic local NLP fallback (`backend/app/services/ai_service.py`)
- **Voice Engine**: Global Voice Provider abstraction supporting text-to-speech, speech-to-text, and accessibility (`backend/app/services/voice_service.py`)
- **Practice Labs**: Sandboxed Python Coding Lab, Defensive Cybersecurity SOC Simulator, System Design Canvas, Resume ATS Studio.
- **Zero Monetization**: Zero subscription tiers, zero billing, zero paywalls, zero payment webhooks.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Python**: 3.11+
- **Node.js**: v20+ / npm v10+

### 2. Launching with One Click (Windows)
Double-click `scripts/dev.bat` or run:
```bash
npm run dev
```
This concurrently boots:
- **FastAPI Backend**: `http://127.0.0.1:8000` (Interactive API Docs: `http://127.0.0.1:8000/docs`)
- **React Frontend**: `http://localhost:5173`

### 3. Running Automated Tests
```bash
npm run test
# or:
backend\venv\Scripts\python.exe -m pytest tests/test_api.py -v
```

---

## 🔑 Pre-Seeded Demo Accounts

| Role | Email | Password | Surface |
| :--- | :--- | :--- | :--- |
| **Student** | `student@demo.edu` | `Demo@123` | Student Dashboard, Passport, Journey, Labs |
| **TPO / College Admin** | `tpo@demo.edu` | `Demo@123` | Placement Drives, Eligibility Engine, Student Analytics |
| **Recruiter** | `recruiter@techcorp.com` | `Demo@123` | Talent Search, Job Postings, Shortlists |
| **Super Admin** | `admin@demo.edu` | `Demo@123` | System Statistics, Audit Logs, Governance |

---

## 📁 Repository Structure

```
nexgenai/
├── frontend/             # React + TypeScript + Vite Client
├── backend/              # Python + FastAPI REST API
│   ├── app/              # Core, Models, Schemas, Routers, Services
│   ├── requirements.txt
│   └── venv/             # Self-contained virtual environment
├── database/             # Database migrations & seed scripts
├── tests/                # Automated pytest suite
├── docs/                 # Complete architectural documentation
├── scripts/              # Developer batch scripts (dev.bat, test.bat, seed.bat)
├── .github/workflows/    # CI/CD pipeline
├── .env.example
├── README.md
└── START_HERE.md
```
