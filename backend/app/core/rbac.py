from enum import Enum
from typing import List, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.security import decode_access_token

security_scheme = HTTPBearer(auto_error=False)

class Role(str, Enum):
    STUDENT = "STUDENT"
    COLLEGE_ADMIN = "COLLEGE_ADMIN"
    TPO = "TPO"
    FACULTY = "FACULTY"
    RECRUITER = "RECRUITER"
    SUPER_ADMIN = "SUPER_ADMIN"

def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
    db: Session = Depends(get_db)
):
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials were not provided",
            headers={"WWW-Authenticate": "Bearer"}
        )
    token = credentials.credentials
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials or token expired",
            headers={"WWW-Authenticate": "Bearer"}
        )
    user_id = payload.get("sub")
    from backend.app.models.entities import User
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or account disabled"
        )
    return user

def require_roles(allowed_roles: List[Role]):
    def role_checker(current_user = Depends(get_current_user)):
        if current_user.role not in [r.value for r in allowed_roles]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Requires role: {[r.value for r in allowed_roles]}"
            )
        return current_user
    return role_checker
