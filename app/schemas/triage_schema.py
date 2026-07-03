"""Triyaj uç noktası için istek/yanıt şemaları.

Bu modeller mobil (React Native) ekibiyle aramızdaki veri sözleşmesidir.
Alan adları ve tipleri mobil taraf ile koordine edilmeden değiştirilmemelidir.
Alan açıklamaları (description) otomatik olarak OpenAPI dokümanına (/docs)
yansır; mobil ekip sözleşmeyi oradan takip edebilir.
"""

from pydantic import BaseModel, ConfigDict, Field


class TriageRequest(BaseModel):
    """Kullanıcının doğal dilde girdiği semptom bildirimi."""

    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "symptoms": (
                        "İki gündür başım çok ağrıyor, ateşim 38.5 "
                        "ve boğazımda yanma var."
                    )
                }
            ]
        }
    )

    symptoms: str = Field(
        ...,
        min_length=3,
        max_length=2000,
        description="Kullanıcının kendi cümleleriyle yazdığı semptom açıklaması.",
    )


class TriageResponse(BaseModel):
    """Yapay zekanın ürettiği yapılandırılmış triyaj sonucu."""

    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "polyclinic": "Nöroloji",
                    "urgency_level": "Sarı",
                    "reason": (
                        "Süregelen şiddetli baş ağrısı ve ateşin birlikte "
                        "görülmesi kısa sürede hekim değerlendirmesi gerektirir."
                    ),
                    "is_emergency": False,
                }
            ]
        }
    )

    polyclinic: str = Field(
        ...,
        description="Önerilen poliklinik (ör. Nöroloji, Kulak Burun Boğaz).",
    )
    urgency_level: str = Field(
        ...,
        description="Triyaj kodu: Kırmızı, Sarı veya Yeşil.",
    )
    reason: str = Field(
        ...,
        description="Yönlendirmenin kısa gerekçesi.",
    )
    is_emergency: bool = Field(
        ...,
        description="Acil servis / 112 yönlendirmesi gerekiyorsa True.",
    )
