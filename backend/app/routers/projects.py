import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import get_current_user
from backend.app.models.entities import User, Project
from backend.app.schemas.schemas import ProjectCreateRequest

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("")
def list_projects(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    projects = db.query(Project).filter(Project.user_id == current_user.id).all()
    return [{
        "id": p.id,
        "title": p.title,
        "description": p.description,
        "domain": p.domain,
        "skills": json.loads(p.skills) if p.skills else [],
        "github_url": p.github_url,
        "demo_url": p.demo_url,
        "status": p.status,
        "stage": p.stage,
        "created_at": p.created_at
    } for p in projects]

@router.post("")
def create_project(req: ProjectCreateRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    project = Project(
        user_id=current_user.id,
        title=req.title,
        description=req.description,
        domain=req.domain,
        skills=json.dumps(req.skills),
        github_url=req.github_url,
        demo_url=req.demo_url,
        stage=req.stage,
        status="IN_PROGRESS"
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project
