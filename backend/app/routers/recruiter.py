from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import require_roles, Role, get_current_user
from backend.app.models.entities import User, Profile, UserSkill

router = APIRouter(prefix="/recruiter", tags=["Recruiter Portal"])

@router.get("/candidates")
def search_candidates(
    target_role: str = None, 
    current_user: User = Depends(require_roles([Role.RECRUITER, Role.SUPER_ADMIN])),
    db: Session = Depends(get_db)
):
    query = db.query(Profile).filter(Profile.is_onboarded == True)
    if target_role:
        query = query.filter(Profile.target_role.ilike(f"%{target_role}%"))
    candidates = query.all()
    return [{
        "id": c.user_id,
        "full_name": c.full_name,
        "target_role": c.target_role,
        "academic_stage": c.academic_stage,
        "institution": c.institution,
        "cgpa": c.cgpa,
        "readiness_score": c.readiness_score,
        "verified_skills_count": len([s for s in c.user.skills if s.status == "VERIFIED"])
    } for c in candidates]
