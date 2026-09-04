from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.rbac import get_current_user
from backend.app.models.entities import User, Course, Module, Lesson, LessonProgress

router = APIRouter(prefix="/learning", tags=["Learning"])

@router.get("/courses")
def list_courses(stage: str = None, domain_id: str = None, db: Session = Depends(get_db)):
    query = db.query(Course).filter(Course.is_published == True)
    if stage:
        query = query.filter(Course.stage == stage)
    if domain_id:
        query = query.filter(Course.domain_id == domain_id)
    courses = query.all()
    return [{
        "id": c.id,
        "title": c.title,
        "slug": c.slug,
        "stage": c.stage,
        "description": c.description,
        "instructor": c.instructor,
        "estimated_hours": c.estimated_hours,
        "level": c.level,
        "total_modules": len(c.modules)
    } for c in courses]

@router.get("/courses/{slug}")
def get_course_detail(slug: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.slug == slug).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    modules_data = []
    for m in course.modules:
        lessons_data = []
        for l in m.lessons:
            prog = db.query(LessonProgress).filter(
                LessonProgress.user_id == current_user.id,
                LessonProgress.lesson_id == l.id
            ).first()
            lessons_data.append({
                "id": l.id,
                "title": l.title,
                "order_num": l.order_num,
                "content": l.content,
                "duration_mins": l.duration_mins,
                "is_completed": prog.is_completed if prog else False
            })
        modules_data.append({
            "id": m.id,
            "title": m.title,
            "order_num": m.order_num,
            "description": m.description,
            "lessons": lessons_data
        })
    return {
        "id": course.id,
        "title": course.title,
        "slug": course.slug,
        "stage": course.stage,
        "description": course.description,
        "instructor": course.instructor,
        "estimated_hours": course.estimated_hours,
        "modules": modules_data
    }

@router.post("/lessons/{lesson_id}/complete")
def complete_lesson(lesson_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    prog = db.query(LessonProgress).filter(
        LessonProgress.user_id == current_user.id,
        LessonProgress.lesson_id == lesson_id
    ).first()
    if not prog:
        prog = LessonProgress(user_id=current_user.id, lesson_id=lesson_id, is_completed=True)
        db.add(prog)
    else:
        prog.is_completed = True
    db.commit()
    return {"message": "Lesson marked as completed", "lesson_id": lesson_id}
