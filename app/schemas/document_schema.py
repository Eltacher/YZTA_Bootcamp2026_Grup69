"""Belge analizi (reçete, tahlil sonucu, rapor vb.) modülünün yanıt şeması.

Bu model mobil (React Native) ekibiyle aramızdaki veri sözleşmesidir.
Alan adları ve tipleri mobil taraf ile koordine edilmeden değiştirilmemelidir.
Alan açıklamaları (description) otomatik olarak OpenAPI dokümanına (/docs)
yansır; mobil ekip sözleşmeyi oradan takip edebilir.

İstek tarafı artık multipart dosya yüklemesiyle alındığı için ayrı bir istek
şeması yoktur; sözleşmenin girdi tarafı router'daki UploadFile alanıdır.
"""

from pydantic import BaseModel, ConfigDict, Field


class DocumentAnalysisResponse(BaseModel):
    """Yapay zekanın ürettiği yapılandırılmış belge analizi sonucu."""

    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "document_type": "Tahlil Sonucu",
                    "summary": (
                        "Tam kan sayımı sonuçlarını içeren bir laboratuvar raporudur. "
                        "Değerlerin çoğu referans aralığındadır; hemoglobin ve ferritin "
                        "referans aralığının altında görünmektedir."
                    ),
                    "key_findings": [
                        "Hemoglobin: 10.2 g/dL (referans 12.0-16.0 — düşük)",
                        "Ferritin: 8 ng/mL (referans 15-150 — düşük)",
                        "Lökosit ve trombosit değerleri referans aralığında",
                    ],
                    "recommendations": [
                        "Sonuçları iç hastalıkları (dahiliye) hekiminize gösterin.",
                        "Kontrol randevunuza giderken önceki tahlillerinizi de götürün.",
                    ],
                }
            ]
        }
    )

    document_type: str = Field(
        ...,
        description=(
            "Belgenin türü: Reçete, Tahlil Sonucu, Rapor, Görüntüleme Raporu, "
            "Epikriz, Diğer veya Belirsiz."
        ),
    )
    summary: str = Field(
        ...,
        description="Belgenin sade Türkçeyle yazılmış 2-4 cümlelik tıbbi özeti.",
    )
    key_findings: list[str] = Field(
        default_factory=list,
        description=(
            "Belgedeki önemli bulgular (ör. referans aralığı dışındaki değerler, "
            "reçetedeki ilaçlar). Bulgu yoksa boş dizi döner."
        ),
    )
    recommendations: list[str] = Field(
        default_factory=list,
        description=(
            "Yönlendirme önerileri (ör. ilgili poliklinik). Tanı ve tedavi/ilaç "
            "önerisi içermez. Öneri yoksa boş dizi döner."
        ),
    )
