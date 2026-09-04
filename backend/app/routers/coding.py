import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import get_current_user
from backend.app.models.entities import User, CodingProblem, CodingSubmission
from backend.app.schemas.schemas import CodingExecutionRequest
from backend.app.services.coding_service import coding_service

router = APIRouter(prefix="/coding", tags=["Coding Lab"])

@router.get("/problems")
def list_problems(db: Session = Depends(get_db)):
    problems = db.query(CodingProblem).all()
    return [{
        "id": p.id,
        "title": p.title,
        "slug": p.slug,
        "difficulty": p.difficulty,
        "domain": p.domain,
        "description": p.description[:120] + "..."
    } for p in problems]

@router.get("/problems/{slug}")
def get_problem(slug: str, db: Session = Depends(get_db)):
    problem = db.query(CodingProblem).filter(CodingProblem.slug == slug).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Coding problem not found")
    return {
        "id": problem.id,
        "title": problem.title,
        "slug": problem.slug,
        "difficulty": problem.difficulty,
        "domain": problem.domain,
        "description": problem.description,
        "starter_code": json.loads(problem.starter_code) if problem.starter_code else {}
    }

@router.post("/execute")
def execute_code(req: CodingExecutionRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    problem = db.query(CodingProblem).filter(CodingProblem.id == req.problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    
    result = coding_service.execute_python_code(req.code, problem.test_cases)
    
    submission = CodingSubmission(
        user_id=current_user.id,
        problem_id=problem.id,
        language=req.language,
        code=req.code,
        status=result["status"],
        passed_tests=result["passed_tests"],
        total_tests=result["total_tests"],
        runtime_ms=result["runtime_ms"]
    )
    db.add(submission)
    db.commit()

    return result
