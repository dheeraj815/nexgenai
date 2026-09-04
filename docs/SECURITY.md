# NexGenAI Security & Privacy Specification

## Core Security Controls
- **Password Security**: Bcrypt with 10 salt rounds. Plaintext passwords never logged or stored.
- **Session Security**: JWT bearer authentication with verification on protected routes.
- **Role-Based Access Control (RBAC)**: Strict role guards (STUDENT, COLLEGE_ADMIN, TPO, FACULTY, RECRUITER, SUPER_ADMIN). Unauthorized student access to TPO or recruiter endpoints returns HTTP 403.
- **Code Execution Sandbox**: Safe, client-side isolated evaluation without arbitrary backend shell execution.
- **Data Privacy**: No fake user accounts. Public portfolios are toggleable (public/private). Microphone access requests permission explicitly with zero secret recording.