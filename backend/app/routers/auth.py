from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.security import get_password_hash, verify_password, create_access_token
from backend.app.core.rbac import get_current_user
from backend.app.models.entities import User, Profile
from backend.app.schemas.schemas import UserSignupRequest, UserLoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/signup", response_model=TokenResponse)
@router.post("/signup/", response_model=TokenResponse)
@router.post("/register", response_model=TokenResponse)
@router.post("/register/", response_model=TokenResponse)
def signup(req: UserSignupRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    # Resolve full name and academic stage flexibly
    full_name = req.full_name
    if not full_name and (req.firstName or req.lastName):
        full_name = f"{req.firstName or ''} {req.lastName or ''}".strip()
    if not full_name:
        full_name = "Student"

    stage = req.academic_stage or req.academicStage or "COLLEGE_YEAR_1"

    hashed = get_password_hash(req.password)
    new_user = User(email=req.email, hashed_password=hashed, role=req.role)
    db.add(new_user)
    db.flush()

    new_profile = Profile(
        user_id=new_user.id,
        full_name=full_name,
        academic_stage=stage,
        is_onboarded=False
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(new_user.id, new_user.role)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "role": new_user.role,
            "full_name": new_profile.full_name,
            "academic_stage": new_profile.academic_stage,
            "is_onboarded": new_profile.is_onboarded
        }
    }

@router.post("/login", response_model=TokenResponse)
@router.post("/login/", response_model=TokenResponse)
def login(req: UserLoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account disabled")

    token = create_access_token(user.id, user.role)
    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "full_name": profile.full_name if profile else "Student",
            "academic_stage": profile.academic_stage if profile else "COLLEGE_YEAR_1",
            "is_onboarded": profile.is_onboarded if profile else False
        }
    }

@router.get("/me")
@router.get("/me/")
def get_me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
        "created_at": current_user.created_at,
        "profile": {
            "full_name": profile.full_name if profile else "",
            "academic_stage": profile.academic_stage if profile else "COLLEGE_YEAR_1",
            "institution": profile.institution if profile else None,
            "department": profile.department if profile else None,
            "graduation_year": profile.graduation_year if profile else None,
            "cgpa": profile.cgpa if profile else None,
            "target_role": profile.target_role if profile else None,
            "bio": profile.bio if profile else None,
            "github_url": profile.github_url if profile else None,
            "linkedin_url": profile.linkedin_url if profile else None,
            "portfolio_url": profile.portfolio_url if profile else None,
            "is_onboarded": profile.is_onboarded if profile else False,
            "readiness_score": profile.readiness_score if profile else 0.0
        } if profile else None
    }

@router.put("/profile")
@router.put("/profile/")
def update_profile_alias(data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        profile = Profile(user_id=current_user.id, full_name="Student")
        db.add(profile)
    
    if "targetRole" in data:
        profile.target_role = data["targetRole"]
    if "institutionName" in data:
        profile.institution = data["institutionName"]
    if "branch" in data:
        profile.department = data["branch"]
    if "graduationYear" in data and data["graduationYear"]:
        profile.graduation_year = int(data["graduationYear"])
    if "cgpa" in data and data["cgpa"]:
        profile.cgpa = float(data["cgpa"])
    if "onboardingCompleted" in data:
        profile.is_onboarded = bool(data["onboardingCompleted"])
    
    db.commit()
    db.refresh(profile)
    return {
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "role": current_user.role,
            "profile": {
                "full_name": profile.full_name,
                "academic_stage": profile.academic_stage,
                "target_role": profile.target_role,
                "institution": profile.institution,
                "department": profile.department,
                "graduation_year": profile.graduation_year,
                "cgpa": profile.cgpa,
                "is_onboarded": profile.is_onboarded,
                "readiness_score": profile.readiness_score
            }
        }
    }

@router.post("/logout")
@router.post("/logout/")
def logout():
    return {"message": "Logged out successfully"}
