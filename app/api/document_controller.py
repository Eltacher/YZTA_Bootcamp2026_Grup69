"""Belge analizi uç noktaları — API (router) katmanı.

Sprint 2'ye kadar yer tutucu (placeholder) olarak sabit yanıt döndürür;
servis katmanı bağlantısı gerçek implementasyonla birlikte eklenecektir.
"""

from fastapi import APIRouter

from app.schemas.document_schema import DocumentAnalysisRequest, DocumentAnalysisResponse

# Sürüm öneki (/api/v1) main.py'de merkezî olarak eklenir; bu modül yalnızca
# kendi alan adını (/document) bilir.
router = APIRouter(prefix="/document", tags=["Belge Analizi"])


@router.post(
    "/analyze",
    response_model=DocumentAnalysisResponse,
    summary="(Taslak) Rapor/reçete gibi belgeleri analiz eder — Sprint 2'de aktifleşecek",
)
async def analyze_document(
    payload: DocumentAnalysisRequest | None = None,
) -> DocumentAnalysisResponse:
    """Sprint 2'ye kadar sabit taslak yanıt döndürür; gövde şimdilik isteğe bağlıdır."""
    return DocumentAnalysisResponse(
        status="draft_placeholder",
        message="Belge analizi modülü Sprint 2'de aktif edilecektir.",
    )
