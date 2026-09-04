from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import require_roles, Role, get_current_user
from backend.app.models.entities import User, Profile, PlacementDrive, DriveApplication, JobApplication

router = APIRouter(prefix="/tpo", tags=["TPO & College OS"])

@router.get("/stats")
def get_tpo_stats(current_user: User = Depends(require_roles([Role.TPO, Role.COLLEGE_ADMIN, Role.SUPER_ADMIN])), db: Session = Depends(get_db)):
    total_students = db.query(User).filter(User.role == "STUDENT").count()
    total_drives = db.query(PlacementDrive).count()
    total_placed = db.query(JobApplication).filter(JobApplication.status == "OFFER").count()
    return {
        "total_students": total_students,
        "active_drives": total_drives,
        "placed_students": total_placed,
        "placement_rate_percent": round((total_placed / total_students * 100) if total_students > 0 else 0, 1)
    }

@router.get("/drives")
def list_placement_drives(db: Session = Depends(get_db)):
    drives = db.query(PlacementDrive).all()
    return drives

@router.get("/students")
def list_eligible_students(min_cgpa: float = 6.0, current_user: User = Depends(require_roles([Role.TPO, Role.COLLEGE_ADMIN, Role.SUPER_ADMIN])), db: Session = Depends(get_db)):
    profiles = db.query(Profile).filter(Profile.cgpa >= min_cgpa).all()
    return [{
        "user_id": p.user_id,
        "full_name": p.full_name,
        "department": p.department,
        "cgpa": p.cgpa,
        "academic_stage": p.academic_stage,
        "target_role": p.target_role,
        "readiness_score": p.readiness_score
    } for p in profiles]
