# NexGenAI REST API Reference

All routes are prefixed with `/api`.

## Authentication & Identity
- `POST /api/auth/register`: Register real user, create profile and portfolio
- `POST /api/auth/login`: Authenticate credentials, issue JWT token
- `GET /api/auth/me`: Get current authenticated user profile and skills
- `PUT /api/auth/profile`: Update profile, stage, institution, and branch

## Career Passport & Journey
- `GET /api/passport`: Fetch universal Career Passport with multi-factor readiness score
- `GET /api/journey/stages`: Get Class 11 -> Career progression milestones
- `GET /api/journey/my-stage`: Get current stage progress and recommendations
- `POST /api/journey/update-stage`: Advance academic stage

## Multi-Domain & Learning
- `GET /api/learning/domains`: List 30 domains with skills and compensation ranges
- `GET /api/learning/courses`: List stage-filtered courses
- `GET /api/learning/lessons/:id`: Get lesson text and examples
- `POST /api/learning/lessons/:id/complete`: Mark lesson complete

## Practice & Labs
- `GET /api/coding/problems`: List coding problems
- `POST /api/coding/problems/:slug/run`: Execute sandbox tests and submit solution
- `POST /api/systemdesign/analyze`: Evaluate architecture diagrams (SPOF, latency, bottlenecks)
- `POST /api/soc/incidents/:id/investigate`: Triage synthetic security logs and IoCs

## Career AI & Resume
- `POST /api/ai/mentor/chat`: Stage-aware conversational career advisor
- `POST /api/ai/roadmap/generate`: Generate 30/60/90-day learning roadmap
- `POST /api/resume/create`: Create or upload resume text
- `POST /api/resume/analyze`: Evaluate ATS keyword alignment against job descriptions

## College TPO & Recruiter
- `GET /api/tpo/drives`: List placement drives with student eligibility calculation
- `GET /api/tpo/students`: Directory of batch students with readiness scores
- `GET /api/recruiter/talent-search`: Search candidates by verified skills
- `POST /api/recruiter/offers`: Issue verified placement offers