from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from backend.app.core.config import settings
from backend.app.core.database import Base, engine
from backend.app.routers import (
    auth, profile, journey, domains, learning, skills, projects,
    assessments, coding, soc, resumes, jobs, tpo, recruiter, ai,
    voice, notifications, admin
)

# Ensure database tables exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for file storage
if os.path.exists(settings.UPLOAD_DIR):
    app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Health endpoints
@app.get("/health")
@app.get("/api/v1/health")
def health_check():
    return {
        "status": "HEALTHY",
        "system": settings.PROJECT_NAME,
        "database": "CONNECTED",
        "version": "1.0.0"
    }

# Register all v1 routers
prefix = settings.API_V1_STR
app.include_router(auth.router, prefix=prefix)
app.include_router(profile.router, prefix=prefix)
app.include_router(journey.router, prefix=prefix)
app.include_router(domains.router, prefix=prefix)
app.include_router(learning.router, prefix=prefix)
app.include_router(skills.router, prefix=prefix)
app.include_router(projects.router, prefix=prefix)
app.include_router(assessments.router, prefix=prefix)
app.include_router(coding.router, prefix=prefix)
app.include_router(soc.router, prefix=prefix)
app.include_router(resumes.router, prefix=prefix)
app.include_router(jobs.router, prefix=prefix)
app.include_router(tpo.router, prefix=prefix)
app.include_router(recruiter.router, prefix=prefix)
app.include_router(ai.router, prefix=prefix)
app.include_router(voice.router, prefix=prefix)
app.include_router(notifications.router, prefix=prefix)
app.include_router(admin.router, prefix=prefix)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)
