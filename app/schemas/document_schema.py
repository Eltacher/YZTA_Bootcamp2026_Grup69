"""Belge analizi (rapor, reçete vb.) modülünün istek/yanıt şemaları.

DİKKAT — TASLAK SÖZLEŞME: Bu modül Sprint 2'de geliştirilecektir. Alanlar
mobil ekiple birlikte netleşene kadar nihai kabul edilmemelidir.
"""

from pydantic import BaseModel, ConfigDict, Field


class DocumentAnalysisRequest(BaseModel):
    """Analiz edilecek belge girdisi (taslak).

    Sprint 2'de dosya yükleme (multipart) veya OCR çıktısı gibi seçenekler
    değerlendirilecektir. Mobil taraf uç noktayı boş gövdeyle de deneyebilsin
    diye şimdilik tüm alanlar isteğe bağlıdır.
    """

    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "document_text": "Hasta raporunun düz metin içeriği...",
                    "document_type": "rapor",
                }
            ]
        }
    )

    document_text: str | None = Field(
        default=None,
        description="Belgenin düz metin içeriği (taslak alan).",
    )
    document_type: str | None = Field(
        default=None,
        description='Belge türü ipucu, ör. "rapor", "reçete" (taslak alan).',
    )


class DocumentAnalysisResponse(BaseModel):
    """Belge analizi yanıtı (taslak) — Sprint 2'ye kadar sabit yer tutucu döner."""

    status: str = Field(
        ...,
        description='Modül durumu; Sprint 2 yayınlanana kadar hep "draft_placeholder".',
    )
    message: str = Field(..., description="Durum açıklaması.")
