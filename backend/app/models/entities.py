import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column, String, Text, Boolean, Integer, Float, DateTime, ForeignKey, Enum as SQLEnum
)
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

def get_utc_now():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="STUDENT", index=True, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=get_utc_now)
    updated_at = Column(DateTime, default=get_utc_now, onupdate=get_utc_now)

    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    academic_records = relationship("AcademicRecord", back_populates="user", cascade="all, delete-orphan")
    skills = relationship("UserSkill", back_populates="user", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="user", cascade="all, delete-orphan")
    lesson_progress = relationship("LessonProgress", back_populates="user", cascade="all, delete-orphan")
    assessment_attempts = relationship("AssessmentAttempt", back_populates="user", cascade="all, delete-orphan")
    coding_submissions = relationship("CodingSubmission", back_populates="user", cascade="all, delete-orphan")
    soc_attempts = relationship("SocAttempt", back_populates="user", cascade="all, delete-orphan")
    resumes = relationship("Resume", back_populates="user", cascade="all, delete-orphan")
    job_applications = relationship("JobApplication", back_populates="user", cascade="all, delete-orphan")
    internships = relationship("Internship", back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")

class Profile(Base):
    __tablename__ = "profiles"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    avatar_url = Column(String(500), nullable=True)
    academic_stage = Column(String(50), default="COLLEGE_YEAR_1", index=True)
    institution = Column(String(255), nullable=True)
    department = Column(String(255), nullable=True)
    graduation_year = Column(Integer, nullable=True)
    cgpa = Column(Float, nullable=True)
    target_role = Column(String(255), nullable=True)
    bio = Column(Text, nullable=True)
    github_url = Column(String(500), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    portfolio_url = Column(String(500), nullable=True)
    phone = Column(String(50), nullable=True)
    location = Column(String(255), nullable=True)
    is_onboarded = Column(Boolean, default=False)
    readiness_score = Column(Float, default=0.0)
    created_at = Column(DateTime, default=get_utc_now)
    updated_at = Column(DateTime, default=get_utc_now, onupdate=get_utc_now)

    user = relationship("User", back_populates="profile")

class AcademicRecord(Base):
    __tablename__ = "academic_records"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    stage = Column(String(50), nullable=False)
    grade_or_cgpa = Column(Float, nullable=False)
    institution_name = Column(String(255), nullable=False)
    completion_year = Column(Integer, nullable=False)
    verification_status = Column(String(50), default="UNVERIFIED")

    user = relationship("User", back_populates="academic_records")

class Domain(Base):
    __tablename__ = "domains"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), unique=True, nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    icon = Column(String(100), default="Layers")
    is_active = Column(Boolean, default=True)

    skills = relationship("DomainSkill", back_populates="domain", cascade="all, delete-orphan")
    courses = relationship("Course", back_populates="domain", cascade="all, delete-orphan")

class DomainSkill(Base):
    __tablename__ = "domain_skills"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    domain_id = Column(String(36), ForeignKey("domains.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), default="Core")
    level = Column(String(50), default="Beginner")

    domain = relationship("Domain", back_populates="skills")

class Course(Base):
    __tablename__ = "courses"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    domain_id = Column(String(36), ForeignKey("domains.id", ondelete="SET NULL"), nullable=True)
    stage = Column(String(50), index=True, nullable=False)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    instructor = Column(String(255), default="NexGenAI Faculty")
    estimated_hours = Column(Integer, default=10)
    level = Column(String(50), default="Beginner")
    total_modules = Column(Integer, default=3)
    is_published = Column(Boolean, default=True)

    domain = relationship("Domain", back_populates="courses")
    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan", order_by="Module.order_num")

class Module(Base):
    __tablename__ = "modules"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    course_id = Column(String(36), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    order_num = Column(Integer, default=1)
    description = Column(Text, nullable=True)

    course = relationship("Course", back_populates="modules")
    lessons = relationship("Lesson", back_populates="module", cascade="all, delete-orphan", order_by="Lesson.order_num")

class Lesson(Base):
    __tablename__ = "lessons"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    module_id = Column(String(36), ForeignKey("modules.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    order_num = Column(Integer, default=1)
    content = Column(Text, nullable=False)
    duration_mins = Column(Integer, default=15)
    video_url = Column(String(500), nullable=True)
    is_preview = Column(Boolean, default=False)

    module = relationship("Module", back_populates="lessons")
    progress = relationship("LessonProgress", back_populates="lesson", cascade="all, delete-orphan")

class LessonProgress(Base):
    __tablename__ = "lesson_progress"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    lesson_id = Column(String(36), ForeignKey("lessons.id", ondelete="CASCADE"), nullable=False)
    is_completed = Column(Boolean, default=False)
    time_spent_secs = Column(Integer, default=0)
    updated_at = Column(DateTime, default=get_utc_now, onupdate=get_utc_now)

    user = relationship("User", back_populates="lesson_progress")
    lesson = relationship("Lesson", back_populates="progress")

class UserSkill(Base):
    __tablename__ = "user_skills"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    skill_name = Column(String(255), nullable=False)
    category = Column(String(100), default="Technical")
    status = Column(String(50), default="CLAIMED", index=True) # CLAIMED, ASSESSED, EVIDENCE_SUBMITTED, VERIFIED
    proficiency = Column(Integer, default=20)
    verified_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="skills")
    evidence = relationship("SkillEvidence", back_populates="user_skill", cascade="all, delete-orphan")

class SkillEvidence(Base):
    __tablename__ = "skill_evidence"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user_skill_id = Column(String(36), ForeignKey("user_skills.id", ondelete="CASCADE"), nullable=False)
    evidence_type = Column(String(50), nullable=False) # GITHUB, PROJECT, CERTIFICATE, ASSESSMENT
    title = Column(String(255), nullable=False)
    url = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    status = Column(String(50), default="EVIDENCE_SUBMITTED")
    verified_by = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=get_utc_now)

    user_skill = relationship("UserSkill", back_populates="evidence")

class Project(Base):
    __tablename__ = "projects"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    domain = Column(String(100), nullable=False)
    skills = Column(Text, default="[]") # JSON string
    github_url = Column(String(500), nullable=True)
    demo_url = Column(String(500), nullable=True)
    status = Column(String(50), default="IN_PROGRESS")
    stage = Column(String(50), default="COLLEGE_YEAR_2")
    created_at = Column(DateTime, default=get_utc_now)

    user = relationship("User", back_populates="projects")

class Assessment(Base):
    __tablename__ = "assessments"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    domain = Column(String(100), nullable=False)
    stage = Column(String(50), default="COLLEGE_YEAR_2")
    difficulty = Column(String(50), default="Intermediate")
    time_limit_mins = Column(Integer, default=30)
    passing_score = Column(Float, default=70.0)
    total_questions = Column(Integer, default=5)

    questions = relationship("AssessmentQuestion", back_populates="assessment", cascade="all, delete-orphan")
    attempts = relationship("AssessmentAttempt", back_populates="assessment", cascade="all, delete-orphan")

class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    assessment_id = Column(String(36), ForeignKey("assessments.id", ondelete="CASCADE"), nullable=False)
    question_text = Column(Text, nullable=False)
    question_type = Column(String(50), default="MCQ")
    options = Column(Text, default="[]") # JSON string
    correct_answer = Column(String(255), nullable=False)
    explanation = Column(Text, nullable=True)
    points = Column(Integer, default=10)

    assessment = relationship("Assessment", back_populates="questions")

class AssessmentAttempt(Base):
    __tablename__ = "assessment_attempts"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    assessment_id = Column(String(36), ForeignKey("assessments.id", ondelete="CASCADE"), nullable=False)
    score = Column(Float, default=0.0)
    passed = Column(Boolean, default=False)
    answers = Column(Text, default="{}") # JSON
    feedback = Column(Text, nullable=True)
    completed_at = Column(DateTime, default=get_utc_now)

    user = relationship("User", back_populates="assessment_attempts")
    assessment = relationship("Assessment", back_populates="attempts")

class CodingProblem(Base):
    __tablename__ = "coding_problems"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    difficulty = Column(String(50), default="Medium")
    domain = Column(String(100), default="Data Structures")
    description = Column(Text, nullable=False)
    starter_code = Column(Text, default="{}") # JSON mapping lang -> code
    test_cases = Column(Text, default="[]") # JSON array of {input, expected_output}

class CodingSubmission(Base):
    __tablename__ = "coding_submissions"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    problem_id = Column(String(36), ForeignKey("coding_problems.id", ondelete="CASCADE"), nullable=False)
    language = Column(String(50), default="python")
    code = Column(Text, nullable=False)
    status = Column(String(50), default="ACCEPTED")
    passed_tests = Column(Integer, default=0)
    total_tests = Column(Integer, default=0)
    runtime_ms = Column(Integer, default=0)
    submitted_at = Column(DateTime, default=get_utc_now)

    user = relationship("User", back_populates="coding_submissions")

class SocIncident(Base):
    __tablename__ = "soc_incidents"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    severity = Column(String(50), default="HIGH")
    category = Column(String(100), default="Network Intrusion")
    description = Column(Text, nullable=False)
    logs = Column(Text, default="[]") # JSON array of synthetic log entries
    indicators = Column(Text, default="[]") # JSON array of IOCs
    remediation_steps = Column(Text, default="[]")

class SocAttempt(Base):
    __tablename__ = "soc_attempts"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    incident_id = Column(String(36), ForeignKey("soc_incidents.id", ondelete="CASCADE"), nullable=False)
    triage_notes = Column(Text, nullable=True)
    severity_assessment = Column(String(50), nullable=True)
    containment_action = Column(Text, nullable=True)
    remediation_plan = Column(Text, nullable=True)
    score = Column(Float, default=0.0)
    feedback = Column(Text, nullable=True)
    completed_at = Column(DateTime, default=get_utc_now)

    user = relationship("User", back_populates="soc_attempts")

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    file_url = Column(String(500), nullable=True)
    parsed_text = Column(Text, nullable=True)
    skills = Column(Text, default="[]") # JSON
    ats_score = Column(Float, default=0.0)
    feedback = Column(Text, default="{}") # JSON
    created_at = Column(DateTime, default=get_utc_now)
    updated_at = Column(DateTime, default=get_utc_now, onupdate=get_utc_now)

    user = relationship("User", back_populates="resumes")

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), unique=True, nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    domain = Column(String(100), nullable=False)
    website = Column(String(500), nullable=True)
    logo_url = Column(String(500), nullable=True)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=get_utc_now)

    jobs = relationship("Job", back_populates="organization", cascade="all, delete-orphan")

class Job(Base):
    __tablename__ = "jobs"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    domain = Column(String(100), nullable=False)
    role_type = Column(String(50), default="Full-Time")
    location = Column(String(255), default="Remote")
    work_mode = Column(String(50), default="Remote")
    experience_level = Column(String(50), default="Entry-Level")
    min_salary = Column(Integer, default=600000)
    max_salary = Column(Integer, default=1200000)
    requirements = Column(Text, default="[]") # JSON
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=get_utc_now)

    organization = relationship("Organization", back_populates="jobs")
    applications = relationship("JobApplication", back_populates="job", cascade="all, delete-orphan")

class JobApplication(Base):
    __tablename__ = "job_applications"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    job_id = Column(String(36), ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(50), default="APPLIED", index=True) # SAVED, APPLIED, SCREENING, ASSESSMENT, INTERVIEW, OFFER, REJECTED, WITHDRAWN
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=get_utc_now)
    updated_at = Column(DateTime, default=get_utc_now, onupdate=get_utc_now)

    user = relationship("User", back_populates="job_applications")
    job = relationship("Job", back_populates="applications")

class Internship(Base):
    __tablename__ = "internships"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    company_name = Column(String(255), nullable=False)
    role_title = Column(String(255), nullable=False)
    duration_months = Column(Integer, default=3)
    stipend = Column(String(100), nullable=True)
    status = Column(String(50), default="ACTIVE")
    review = Column(Text, nullable=True)
    created_at = Column(DateTime, default=get_utc_now)

    user = relationship("User", back_populates="internships")

class PlacementDrive(Base):
    __tablename__ = "placement_drives"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    company_name = Column(String(255), nullable=False)
    date = Column(String(50), nullable=False)
    min_cgpa = Column(Float, default=7.0)
    allowed_branches = Column(Text, default='["CSE", "IT", "ECE"]') # JSON
    max_backlogs = Column(Integer, default=0)
    status = Column(String(50), default="UPCOMING")
    created_at = Column(DateTime, default=get_utc_now)

    applications = relationship("DriveApplication", back_populates="drive", cascade="all, delete-orphan")

class DriveApplication(Base):
    __tablename__ = "drive_applications"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    drive_id = Column(String(36), ForeignKey("placement_drives.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(50), default="REGISTERED")
    is_eligible = Column(Boolean, default=True)
    ineligibility_reason = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=get_utc_now)

    drive = relationship("PlacementDrive", back_populates="applications")

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(50), default="INFO")
    is_read = Column(Boolean, default=False)
    link = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=get_utc_now)

    user = relationship("User", back_populates="notifications")

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), nullable=True)
    action = Column(String(100), nullable=False)
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(String(100), nullable=True)
    ip_address = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=get_utc_now)
