from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.models.entities import Domain, DomainSkill

router = APIRouter(prefix="/domains", tags=["Domains"])

@router.get("")
def list_domains(db: Session = Depends(get_db)):
    domains = db.query(Domain).filter(Domain.is_active == True).all()
    return [{
        "id": d.id,
        "name": d.name,
        "slug": d.slug,
        "category": d.category,
        "description": d.description,
        "icon": d.icon,
        "skills_count": len(d.skills)
    } for d in domains]

@router.get("/{slug}")
def get_domain(slug: str, db: Session = Depends(get_db)):
    domain = db.query(Domain).filter(Domain.slug == slug).first()
    if not domain:
        raise HTTPException(status_code=404, detail="Domain not found")
    return {
        "id": domain.id,
        "name": domain.name,
        "slug": domain.slug,
        "category": domain.category,
        "description": domain.description,
        "icon": domain.icon,
        "skills": [{
            "id": s.id,
            "name": s.name,
            "description": s.description,
            "category": s.category,
            "level": s.level
        } for s in domain.skills]
    }
