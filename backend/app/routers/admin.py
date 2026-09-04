from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import require_roles, Role, get_current_user
from backend.app.models.entities import User, AuditLog

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/stats")
def get_system_stats(current_user: User = Depends(require_roles([Role.SUPER_ADMIN])), db: Session = Depends(get_db)):
    return {
        "users_count": db.query(User).count(),
        "audit_logs_count": db.query(AuditLog).count()
    }
