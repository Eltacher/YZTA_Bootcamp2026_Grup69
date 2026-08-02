"""Belge analizi uç noktaları — API (router) katmanı.

Sprint 2'de aktifleştirildi: uç nokta artık multipart dosya yüklemesi alır ve
yüklenen belgeyi Wiro AI üzerinden analiz edip yapılandırılmış JSON döndürür.
"""

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.api.dependencies import get_ai_service
from app.schemas.document_schema import DocumentAnalysisResponse
from app.services.ai_service import (
    MAX_DOCUMENT_BYTES,
    AIService,
    AIServiceError,
    DocumentContentError,
    ModelCapabilityError,
    UnsupportedDocumentError,
    resolve_media_type,
)

# Sürüm öneki (/api/v1) main.py'de merkezî olarak eklenir; bu modül yalnızca
# kendi alan adını (/document) bilir.
router = APIRouter(prefix="/document", tags=["Belge Analizi"])

# Starlette bu sabiti sürümler arasında yeniden adlandırdığı için
# (HTTP_422_UNPROCESSABLE_ENTITY -> HTTP_422_UNPROCESSABLE_CONTENT)
# sayısal değer doğrudan kullanılır; nadiren çalışan hata dalında
# sürüme bağlı AttributeError riski böylece ortadan kalkar.
HTTP_422_UNPROCESSABLE = 422


@router.post(
    "/analyze",
    response_model=DocumentAnalysisResponse,
    summary="Yüklenen reçete, tahlil sonucu veya raporu analiz eder",
    responses={
        400: {"description": "Dosya biçimi/boyutu geçersiz ya da dosya okunamadı."},
        422: {"description": "Dosya geçerli ancak içeriğinden analiz edilebilir veri çıkarılamadı."},
        502: {"description": "Yapay zeka sağlayıcısı yanıt vermedi ya da geçersiz çıktı üretti."},
        503: {"description": "Servis yapılandırması eksik ya da model bu girdi türünü desteklemiyor."},
    },
)
async def analyze_document(
    file: UploadFile = File(
        ...,
        description=(
            "Analiz edilecek tıbbi belge. Kabul edilen türler: JPEG, PNG, HEIC, HEIF, PDF. "
            f"Üst sınır {MAX_DOCUMENT_BYTES // 1_048_576} MB."
        ),
    ),
    ai_service: AIService = Depends(get_ai_service),
) -> DocumentAnalysisResponse:
    """Yüklenen belgeyi belleğe alıp yapay zeka ile analiz eder ve özetini döndürür."""
    media_type = resolve_media_type(file.content_type, file.filename)
    if media_type is None:
        bildirilen = file.content_type or "belirtilmedi"
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Desteklenmeyen dosya türü ({bildirilen}). "
                "Yalnızca JPEG, PNG, HEIC, HEIF veya PDF yükleyebilirsiniz."
            ),
        )

    # Boyut, içerik belleğe alınmadan önce kontrol edilir; servis katmanındaki
    # aynı kontrol, size bilgisi vermeyen istemciler için ikinci savunma hattıdır.
    if file.size is not None and file.size > MAX_DOCUMENT_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Dosya boyutu sınırı aşıldı: {file.size / 1_048_576:.1f} MB "
                f"(üst sınır {MAX_DOCUMENT_BYTES // 1_048_576} MB)."
            ),
        )

    try:
        content = await file.read()
    except Exception as exc:  # bozuk/yarım multipart gövdesi
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Yüklenen dosya okunamadı: {exc}",
        ) from exc
    finally:
        await file.close()

    # Alt sınıflar temel AIServiceError'dan önce yakalanmalıdır.
    try:
        return await ai_service.analyze_medical_document(content, media_type)
    except UnsupportedDocumentError as exc:  # biçim/boyut sorunu -> istemci hatası
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)
        ) from exc
    except DocumentContentError as exc:  # dosya geçerli, içerik işlenemedi
        raise HTTPException(
            status_code=HTTP_422_UNPROCESSABLE, detail=str(exc)
        ) from exc
    except ModelCapabilityError as exc:  # yapılandırılan model bu girdiyi desteklemiyor
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)
        ) from exc
    except AIServiceError as exc:  # LLM tarafındaki hata -> istemciye anlamlı 502
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)
        ) from exc
