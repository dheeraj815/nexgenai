# NexGenAI Relational Database Schema

NexGenAI contains 38 relational tables with foreign keys, indexes, and cascading relations managed via Prisma:
- **Identity**: User, Profile, PortfolioProfile, RecruiterProfile, AuditLog
- **Institution**: Institution, Department, PlacementDrive, CandidateShortlist, Offer
- **Curriculum**: Domain, DomainSkill, DomainRole, Course, CourseModule, Lesson, LessonProgress, UserDomain
- **Skills & Proof**: UserSkill, SkillEvidence, Project
- **Assessments & Labs**: Assessment, AssessmentQuestion, AssessmentAttempt, CodingProblem, CodingSubmission, SystemDesignDiagram, SocIncident, SocIncidentAttempt
- **Career AI & Opportunities**: Resume, ResumeAnalysis, CareerRoadmap, RoadmapItem, Job, JobMatch, Application, Internship, Notification