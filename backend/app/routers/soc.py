import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import get_current_user
from backend.app.models.entities import User, SocIncident, SocAttempt
from backend.app.schemas.schemas import SocTriageRequest
from backend.app.services.soc_service import soc_service

router = APIRouter(prefix="/soc", tags=["SOC Incident Simulator"])

@router.get("/incidents")
def list_incidents(db: Session = Depends(get_db)):
    incidents = db.query(SocIncident).all()
    return [{
        "id": i.id,
        "title": i.title,
        "severity": i.severity,
        "category": i.category,
        "description": i.description
    } for i in incidents]

@router.get("/incidents/{incident_id}")
def get_incident(incident_id: str, db: Session = Depends(get_db)):
    incident = db.query(SocIncident).filter(SocIncident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return {
        "id": incident.id,
        "title": incident.title,
        "severity": incident.severity,
        "category": incident.category,
        "description": incident.description,
        "logs": json.loads(incident.logs) if incident.logs else [],
        "indicators": json.loads(incident.indicators) if incident.indicators else []
    }

@router.post("/incidents/{incident_id}/triage")
def submit_soc_triage(incident_id: str, req: SocTriageRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    incident = db.query(SocIncident).filter(SocIncident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    eval_res = soc_service.evaluate_triage(
        incident.title,
        req.severity_assessment,
        req.triage_notes,
        req.containment_action
    )

    attempt = SocAttempt(
        user_id=current_user.id,
        incident_id=incident.id,
        triage_notes=req.triage_notes,
        severity_assessment=req.severity_assessment,
        containment_action=req.containment_action,
        remediation_plan=req.remediation_plan,
        score=eval_res["score"],
        feedback=eval_res["feedback"]
    )
    db.add(attempt)
    db.commit()

    return eval_res
