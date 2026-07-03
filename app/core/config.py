"""Uygulama ayarları — kök dizindeki .env dosyasından okunur."""

import os
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv

# .env her zaman proje kökünden yüklenir; böylece uvicorn'un hangi dizinden
# başlatıldığı önemli olmaz. (app/core/config.py -> iki üst dizin = proje kökü)
PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env")


class Settings:
    """Ortam değişkenlerinden okunan uygulama ayarları.

    Model ve sağlayıcı bilgisi bilinçli olarak kodda tutulmaz; tamamı .env'den
    okunur. Böylece model değişikliği kodda tek satır bile değiştirmeden,
    yalnızca .env düzenlemesiyle yapılır. Yeni bir ayar gerektiğinde buraya
    alan olarak eklenmesi yeterlidir.
    """

    def __init__(self) -> None:
        self.ai_api_key: str = os.getenv("AI_API_KEY", "")
        self.ai_model: str = os.getenv("AI_MODEL", "")
        # "auto": istek, modeli yayınlayan ilk uygun sağlayıcıya yönlendirilir.
        self.ai_provider: str = os.getenv("AI_PROVIDER", "auto")


@lru_cache
def get_settings() -> Settings:
    """Settings nesnesini bir kez oluşturur, sonraki çağrılarda önbellekten döndürür."""
    return Settings()
