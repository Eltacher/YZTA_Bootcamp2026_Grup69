"""Triyaj uç noktaları — API (router) katmanı."""

from functools import lru_cache

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.config import get_settings
from app.schemas.triage_schema import TriageRequest, TriageResponse
from app.services.ai_service import AIService, AIServiceError

# Sürüm öneki (/api/v1) main.py'de merkezî olarak eklenir; bu modül yalnızca
# kendi alan adını (/triage) bilir.
router = APIRouter(prefix="/triage", tags=["Triyaj"])


@lru_cache
def _build_ai_service() -> AIService:
    """AIService'i ilk istekte bir kez kurar, sonraki isteklerde yeniden kullanır."""
    return AIService(get_settings())


def get_ai_service() -> AIService:
    try:
        return _build_ai_service()
    except AIServiceError as exc:  # örn. AI_API_KEY eksik -> yapılandırma hatası
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)
        ) from exc


@router.post(
    "/analyze",
    response_model=TriageResponse,
    summary="Semptom analizi ile poliklinik ve aciliyet önerisi üretir",
)
async def create_triage(
    payload: TriageRequest,
    ai_service: AIService = Depends(get_ai_service),
) -> TriageResponse:
    """Doğal dildeki semptom metnini alır, yapılandırılmış triyaj sonucu döndürür."""
    try:
        return await ai_service.analyze_symptoms(payload.symptoms)
    except AIServiceError as exc:  # LLM tarafındaki hata -> istemciye anlamlı 502
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)
        ) from exc
