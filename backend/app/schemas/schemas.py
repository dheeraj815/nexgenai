from typing import List, Optional, Any, Dict
from pydantic import BaseModel, EmailStr, Field

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

class UserSignupRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    role: str = "STUDENT"
    full_name: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    academic_stage: Optional[str] = None
    academicStage: Optional[str] = None

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class ProfileUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    academic_stage: Optional[str] = None
    institution: Optional[str] = None
    department: Optional[str] = None
    graduation_year: Optional[int] = None
    cgpa: Optional[float] = None
    target_role: Optional[str] = None
    bio: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None

class OnboardingRequest(BaseModel):
    academic_stage: str
    institution: str
    department: str
    graduation_year: int
    cgpa: float
    target_role: str
    interests: List[str] = []
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None

class SkillClaimRequest(BaseModel):
    skill_name: str
    category: str = "Technical"
    proficiency: int = 50

class EvidenceSubmitRequest(BaseModel):
    user_skill_id: str
    evidence_type: str
    title: str
    url: Optional[str] = None
    description: Optional[str] = None

class ProjectCreateRequest(BaseModel):
    title: str
    description: str
    domain: str
    skills: List[str] = []
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    stage: str = "COLLEGE_YEAR_2"

class CodingExecutionRequest(BaseModel):
    problem_id: str
    language: str
    code: str

class SocTriageRequest(BaseModel):
    incident_id: str
    triage_notes: str
    severity_assessment: str
    containment_action: str
    remediation_plan: str

class AtsScanRequest(BaseModel):
    job_description: str
    resume_id: Optional[str] = None

class SystemDesignAnalyzeRequest(BaseModel):
    architecture_components: List[str]
    scale_requirements: str
    sla_availability: str

class AiChatRequest(BaseModel):
    message: str
    context_type: str = "MENTOR"
    history: List[Dict[str, str]] = []

class VoiceSynthesisRequest(BaseModel):
    text: str
    voice: str = "default"
    speed: float = 1.0

class JobApplicationCreateRequest(BaseModel):
    job_id: str
    notes: Optional[str] = None
