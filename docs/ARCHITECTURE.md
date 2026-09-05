# NexGenAI System Architecture & Engineering Blueprint

## 1. Executive Architecture Overview
NexGenAI is designed as an end-to-end operating system bridging academic exploration (Class 11) to enterprise career success (Engineering Leadership). The platform follows a clean decoupled client-server architecture:

```
+-------------------------------------------------------------------------+
|                      NexGenAI Frontend (React + Vite)                   |
|  - 12 Progressive Stage & Career Flow Engines (Class 11 to Career)     |
|  - 16-Step Deep Topic Execution Framework (DeepTopicPlayer)             |
|  - Unified Journey State (CareerJourneyContext + readinessEngine)       |
|  - Two-Way Voice Layer (Web Speech Synthesis & Webkit SpeechRecognition)|
|  - Adaptive Drawer ("I Don't Understand" - Multi-Tier Diagnostic)       |
+-------------------------------------------------------------------------+
                                    |
                           REST APIs + JSON
                                    |
                                    v
+-------------------------------------------------------------------------+
|                     FastAPI Backend (Python 3.12+)                      |
|  - Routers: Auth, Profile, Journey, Learning, Skills, Coding, Resumes,  |
|             SOC, Assessments, TPO, Recruiter, AI, Voice, Admin          |
|  - Core: JWT Authentication, Password Hashing (Bcrypt), Strict RBAC     |
|  - Services: AIService (Gemini / Heuristic), VoiceService, CodingService|
+-------------------------------------------------------------------------+
                                    |
                            SQLAlchemy ORM
                                    |
                                    v
+-------------------------------------------------------------------------+
|                     PostgreSQL Database Engine                          |
|  - Unified Single Database Schema                                       |
|  - Primary Keys (UUID), Indexes, Foreign Key Constraints                |
|  - Entities: User, Profile, Domain, Course, Lesson, UserSkill,          |
|              SkillEvidence, Project, Assessment, CodingSubmission,      |
|              SocIncident, Resume, PlacementDrive, Job, DriveApplication |
+-------------------------------------------------------------------------+
```

## 2. Layer Specifications

### 2.1 Presentation Layer (Client)
- **Framework**: React 18, TypeScript, Vite.
- **Styling**: Tailwind CSS with custom glassmorphic navy/indigo enterprise palettes.
- **State Management**: React Context API (`CareerJourneyContext`) maintaining persistent local and API-synchronized state with zero dummy defaults.
- **Dynamic Readiness Engine**: Evaluates candidate employability across 6 mathematical dimensions (Skills, Evidence, Projects, ATS Resume, Coding Arena, Mock Interviews). Initial state is strictly 0.0%.

### 2.2 Application Services Layer (Backend)
- **Framework**: FastAPI (Python 3.12+).
- **Security & RBAC**: Passlib Bcrypt password hashing, PyJWT bearer token authentication with server-side role validation (`STUDENT`, `TPO`, `RECRUITER`, `SUPER_ADMIN`).
- **AI Integration**: `AIService` abstraction with Google Gemini API connectivity and robust contextual deterministic fallbacks.
- **Voice Integration**: `VoiceService` abstraction paired with Web Speech API for bidirectional voice mock interviews and spoken lesson narration.

### 2.3 Persistence Layer (Database)
- **Database Engine**: PostgreSQL.
- **Object-Relational Mapping**: SQLAlchemy with declarative base models, audit timestamps, and cascade constraints.
- **File Storage**: `StorageProvider` abstraction for resume PDFs and project assets.

## 3. Strict Architectural Guarantees
- **No Monetization**: No pricing plans, paywalls, Stripe, or billing logic exist anywhere in the codebase.
- **Zero Dummy Data**: No hardcoded test personas, false CGPAs, or fabricated readiness percentages.
- **Graceful Degradation**: Real-time AI and Voice features operate seamlessly even without external cloud API credentials.
