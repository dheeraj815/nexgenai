import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import get_current_user
from backend.app.models.entities import User, Assessment, AssessmentAttempt

router = APIRouter(prefix="/assessments", tags=["Assessments"])

@router.get("")
def list_assessments(domain: str = None, db: Session = Depends(get_db)):
    query = db.query(Assessment)
    if domain:
        query = query.filter(Assessment.domain == domain)
    assessments = query.all()
    return [{
        "id": a.id,
        "title": a.title,
        "domain": a.domain,
        "stage": a.stage,
        "difficulty": a.difficulty,
        "time_limit_mins": a.time_limit_mins,
        "passing_score": a.passing_score,
        "total_questions": len(a.questions)
    } for a in assessments]

@router.get("/{assessment_id}")
def get_assessment(assessment_id: str, db: Session = Depends(get_db)):
    a = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return {
        "id": a.id,
        "title": a.title,
        "domain": a.domain,
        "difficulty": a.difficulty,
        "time_limit_mins": a.time_limit_mins,
        "passing_score": a.passing_score,
        "questions": [{
            "id": q.id,
            "question_text": q.question_text,
            "options": json.loads(q.options) if q.options else [],
            "points": q.points
        } for q in a.questions]
    }

@router.post("/{assessment_id}/attempt")
def submit_attempt(assessment_id: str, answers: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    a = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    correct_count = 0
    total = len(a.questions)
    for q in a.questions:
        if answers.get(q.id) == q.correct_answer:
            correct_count += 1
    
    score = round((correct_count / total * 100) if total > 0 else 0, 1)
    passed = score >= a.passing_score

    attempt = AssessmentAttempt(
        user_id=current_user.id,
        assessment_id=a.id,
        score=score,
        passed=passed,
        answers=json.dumps(answers),
        feedback=f"Scored {score}%. {'Passed requirements!' if passed else 'Needs review of core concepts.'}"
    )
    db.add(attempt)
    db.commit()
    return {
        "score": score,
        "passed": passed,
        "correct_count": correct_count,
        "total_questions": total,
        "feedback": attempt.feedback
    }
