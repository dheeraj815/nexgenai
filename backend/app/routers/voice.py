from fastapi import APIRouter
from backend.app.services.voice_service import voice_service

router = APIRouter(prefix="/voice", tags=["Voice Engine"])

@router.get("/config")
def get_voice_configuration():
    return voice_service.get_voice_config()
