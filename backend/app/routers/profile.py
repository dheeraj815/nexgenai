from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import get_current_user
from backend.app.models.entities import User, Profile
from backend.app.schemas.schemas import ProfileUpdateRequest, OnboardingRequest

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get("")
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("")
def update_profile(req: ProfileUpdateRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    update_data = req.dict(exclude_unset=True)
    for field, val in update_data.items():
        setattr(profile, field, val)
    db.commit()
    db.refresh(profile)
    return profile

@router.post("/onboarding")
def complete_onboarding(req: OnboardingRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        profile = Profile(user_id=current_user.id, full_name="Student")
        db.add(profile)
    
    profile.academic_stage = req.academic_stage
    profile.institution = req.institution
    profile.department = req.department
    profile.graduation_year = req.graduation_year
    profile.cgpa = req.cgpa
    profile.target_role = req.target_role
    profile.github_url = req.github_url
    profile.linkedin_url = req.linkedin_url
    profile.is_onboarded = True
    db.commit()
    db.refresh(profile)
    return {"message": "Onboarding completed successfully", "profile": profile}
