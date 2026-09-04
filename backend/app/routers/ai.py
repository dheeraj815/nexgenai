from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import get_current_user
from backend.app.models.entities import User, Profile, UserSkill
from backend.app.schemas.schemas import AiChatRequest
from backend.app.services.ai_service import ai_service

router = APIRouter(prefix="/ai", tags=["AI Mentor"])

@router.post("/mentor")
def chat_mentor(req: AiChatRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    user_name = profile.full_name if profile else "Student"
    academic_stage = profile.academic_stage if profile else "COLLEGE_YEAR_1"
    target_role = profile.target_role if profile else "Software Engineer"
    skills = [s.skill_name for s in current_user.skills]

    reply = ai_service.generate_mentor_response(user_name, academic_stage, target_role, skills, req.message)
    return {"reply": reply, "stage": academic_stage, "target_role": target_role}
