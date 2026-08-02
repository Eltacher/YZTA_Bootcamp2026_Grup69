"""Triyaj uç noktaları — API (router) katmanı."""

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.dependencies import get_ai_service
from app.schemas.triage_schema import TriageRequest, TriageResponse
from app.services.ai_service import AIService, AIServiceError

# Sürüm öneki (/api/v1) main.py'de merkezî olarak eklenir; bu modül yalnızca
# kendi alan adını (/triage) bilir.
router = APIRouter(prefix="/triage", tags=["Triyaj"])


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
