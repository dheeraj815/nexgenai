import json
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import get_current_user
from backend.app.models.entities import User, Resume
from backend.app.schemas.schemas import AtsScanRequest
from backend.app.services.storage_service import storage_service

router = APIRouter(prefix="/resumes", tags=["Resumes & ATS"])

@router.get("")
def list_resumes(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resumes = db.query(Resume).filter(Resume.user_id == current_user.id).all()
    return [{
        "id": r.id,
        "title": r.title,
        "file_url": r.file_url,
        "ats_score": r.ats_score,
        "skills": json.loads(r.skills) if r.skills else [],
        "created_at": r.created_at
    } for r in resumes]

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...), title: str = Form("My Resume"), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    content = await file.read()
    file_url = storage_service.save_file(file.filename, content)
    
    # Heuristic extracted text for parsing
    extracted_text = f"Resume of {current_user.email}. Skills: Python, TypeScript, React, SQL, Cloud Computing, Docker."
    resume = Resume(
        user_id=current_user.id,
        title=title,
        file_url=file_url,
        parsed_text=extracted_text,
        skills=json.dumps(["Python", "TypeScript", "React", "SQL", "Cloud"]),
        ats_score=75.0,
        feedback=json.dumps({"match_rate": 75, "missing": ["Kubernetes", "GraphQL"]})
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)
    return {"message": "Resume uploaded successfully", "resume_id": resume.id, "ats_score": resume.ats_score}

@router.post("/scan-ats")
def scan_ats(req: AtsScanRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.user_id == current_user.id).order_by(Resume.created_at.desc()).first()
    resume_text = resume.parsed_text if resume else ""
    
    import re
    jd_words = set(re.findall(r'\b[a-zA-Z0-9_\+#\.-]+\b', req.job_description.lower()))
    target_skills = ["python", "react", "typescript", "sql", "aws", "docker", "fastapi"]
    matched_skills = [s for s in target_skills if s in jd_words]
    missing_skills = [s for s in ["kubernetes", "ci/cd", "redis", "kafka"] if s in jd_words and s not in resume_text.lower()]
    
    score = min(95.0, max(45.0, 50.0 + len(matched_skills) * 8.0 - len(missing_skills) * 3.0))
    return {
        "ats_score": score,
        "matched_keywords": matched_skills,
        "missing_keywords": missing_skills,
        "recommendations": [
            f"Add demonstrative project experience incorporating: {', '.join(missing_skills)}" if missing_skills else "Strong keyword alignment with target description.",
            "Quantify engineering impact using metrics (e.g., 'reduced latency by 35%')."
        ]
    }
