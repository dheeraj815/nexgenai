from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import get_current_user, require_roles, Role
from backend.app.models.entities import User, UserSkill, SkillEvidence
from backend.app.schemas.schemas import SkillClaimRequest, EvidenceSubmitRequest

router = APIRouter(prefix="/skills", tags=["Skills & Proof"])

@router.get("")
def list_skills(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    skills = db.query(UserSkill).filter(UserSkill.user_id == current_user.id).all()
    return [{
        "id": s.id,
        "skill_name": s.skill_name,
        "category": s.category,
        "status": s.status,
        "proficiency": s.proficiency,
        "verified_at": s.verified_at,
        "evidence": [{
            "id": e.id,
            "evidence_type": e.evidence_type,
            "title": e.title,
            "url": e.url,
            "status": e.status
        } for e in s.evidence]
    } for s in skills]

@router.post("/claim")
def claim_skill(req: SkillClaimRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(UserSkill).filter(
        UserSkill.user_id == current_user.id,
        UserSkill.skill_name == req.skill_name
    ).first()
    if existing:
        return existing
    new_skill = UserSkill(
        user_id=current_user.id,
        skill_name=req.skill_name,
        category=req.category,
        proficiency=req.proficiency,
        status="CLAIMED"
    )
    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)
    return new_skill

@router.post("/evidence")
def submit_evidence(req: EvidenceSubmitRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    skill = db.query(UserSkill).filter(
        UserSkill.id == req.user_skill_id,
        UserSkill.user_id == current_user.id
    ).first()
    if not skill:
        raise HTTPException(status_code=404, detail="User skill not found")
    
    evidence = SkillEvidence(
        user_id=current_user.id,
        user_skill_id=skill.id,
        evidence_type=req.evidence_type,
        title=req.title,
        url=req.url,
        description=req.description,
        status="EVIDENCE_SUBMITTED"
    )
    skill.status = "EVIDENCE_SUBMITTED"
    db.add(evidence)
    db.commit()
    return {"message": "Evidence submitted successfully", "evidence_id": evidence.id}

@router.post("/{skill_id}/verify")
def verify_skill(
    skill_id: str, 
    current_user: User = Depends(require_roles([Role.FACULTY, Role.TPO, Role.SUPER_ADMIN, Role.RECRUITER])),
    db: Session = Depends(get_db)
):
    skill = db.query(UserSkill).filter(UserSkill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    skill.status = "VERIFIED"
    skill.verified_at = datetime.now(timezone.utc)
    db.commit()
    return {"message": "Skill successfully verified", "skill_id": skill.id, "verified_by": current_user.email}
