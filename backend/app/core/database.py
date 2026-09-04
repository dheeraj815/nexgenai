import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from backend.app.core.config import settings

engine = None
try:
    if settings.DATABASE_URL.startswith("postgresql"):
        test_engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True, connect_args={"connect_timeout": 2})
        with test_engine.connect() as conn:
            pass
        engine = test_engine
        print("[DATABASE] Connected to PostgreSQL single source of truth.")
except Exception as e:
    print(f"[DATABASE] PostgreSQL service offline ({e}). Using robust SQLite development database at {settings.SQLITE_FALLBACK_URL}")

if engine is None:
    engine = create_engine(
        settings.SQLITE_FALLBACK_URL, 
        connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
