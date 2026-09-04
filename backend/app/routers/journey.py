from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import get_current_user
from backend.app.models.entities import User, Profile

router = APIRouter(prefix="/journey", tags=["Academic Journey"])

STAGES = [
    {"id": "CLASS_11", "title": "Class 11", "subtitle": "Career Discovery", "focus": "Aptitude, Domain Exploration, Foundation Skills"},
    {"id": "CLASS_12", "title": "Class 12", "subtitle": "Career Direction", "focus": "Domain Selection, Git/GitHub Basics, Portfolio Foundation"},
    {"id": "COLLEGE_YEAR_1", "title": "Year 1", "subtitle": "Foundation", "focus": "Programming, Web/APIs, Databases, Problem Solving"},
    {"id": "COLLEGE_YEAR_2", "title": "Year 2", "subtitle": "Specialization", "focus": "Domain Deep-Dive, Projects, Proof of Work"},
    {"id": "COLLEGE_YEAR_3", "title": "Year 3", "subtitle": "Industry Preparation", "focus": "Internships, System Design, AI Interviews, ATS Resume"},
    {"id": "COLLEGE_YEAR_4", "title": "Year 4", "subtitle": "Placement Command Center", "focus": "Placement Drives, Job Matching, Final Offers"},
    {"id": "INTERNSHIP", "title": "Internship", "subtitle": "Real-World Experience", "focus": "Production Projects, Mentorship, Performance Review"},
    {"id": "FIRST_JOB", "title": "First Job & Beyond", "subtitle": "Career Growth", "focus": "Upskilling, Promotions, Architectural Leadership"}
]

@router.get("")
def get_academic_journey(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    current_stage = profile.academic_stage if profile else "COLLEGE_YEAR_1"

    current_idx = 0
    for idx, s in enumerate(STAGES):
        if s["id"] == current_stage:
            current_idx = idx
            break

    stages_result = []
    for idx, s in enumerate(STAGES):
        status = "COMPLETED" if idx < current_idx else ("CURRENT" if idx == current_idx else "UPCOMING")
        stages_result.append({**s, "status": status})

    return {
        "current_stage": current_stage,
        "stages": stages_result,
        "completion_percentage": round(((current_idx + 1) / len(STAGES)) * 100, 1)
    }
