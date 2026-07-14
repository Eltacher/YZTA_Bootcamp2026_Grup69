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
        # İmzalı (HMAC) kimlik doğrulama moduna geçilirse gerekecek; şu an
        # sunucu tarafı için x-api-key başlığı yeterli.
        self.ai_api_secret: str = os.getenv("AI_API_SECRET", "")
        self.ai_model: str = os.getenv("AI_MODEL", "")
        # OpenAI uyumlu API'nin taban adresi; sağlayıcı değişikliği yalnızca
        # bu değerin .env'de güncellenmesiyle yapılır.
        self.ai_base_url: str = os.getenv("AI_BASE_URL", "https://api.wiro.ai/v1")


@lru_cache
def get_settings() -> Settings:
    """Settings nesnesini bir kez oluşturur, sonraki çağrılarda önbellekten döndürür."""
    return Settings()
