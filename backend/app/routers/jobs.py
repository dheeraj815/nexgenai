import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import get_current_user
from backend.app.models.entities import User, Job, JobApplication, Internship
from backend.app.schemas.schemas import JobApplicationCreateRequest

router = APIRouter(prefix="/jobs", tags=["Jobs & Opportunities"])

@router.get("")
def list_jobs(domain: str = None, db: Session = Depends(get_db)):
    query = db.query(Job).filter(Job.is_active == True)
    if domain:
        query = query.filter(Job.domain == domain)
    jobs = query.all()
    return [{
        "id": j.id,
        "title": j.title,
        "company": j.organization.name if j.organization else "Verified Partner",
        "domain": j.domain,
        "location": j.location,
        "work_mode": j.work_mode,
        "min_salary": j.min_salary,
        "max_salary": j.max_salary,
        "requirements": json.loads(j.requirements) if j.requirements else []
    } for j in jobs]

@router.post("/{job_id}/apply")
def apply_to_job(job_id: str, req: JobApplicationCreateRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    existing = db.query(JobApplication).filter(
        JobApplication.user_id == current_user.id,
        JobApplication.job_id == job.id
    ).first()
    if existing:
        return {"message": "Already applied", "application_id": existing.id, "status": existing.status}

    app = JobApplication(
        user_id=current_user.id,
        job_id=job.id,
        status="APPLIED",
        notes=req.notes
    )
    db.add(app)
    db.commit()
    return {"message": "Application submitted successfully", "application_id": app.id, "status": "APPLIED"}

@router.get("/applications")
def list_applications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    apps = db.query(JobApplication).filter(JobApplication.user_id == current_user.id).all()
    return [{
        "id": a.id,
        "job_title": a.job.title if a.job else "Role",
        "company": a.job.organization.name if (a.job and a.job.organization) else "Partner",
        "status": a.status,
        "applied_at": a.created_at
    } for a in apps]

@router.get("/internships")
def list_internships(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    internships = db.query(Internship).filter(Internship.user_id == current_user.id).all()
    return internships
