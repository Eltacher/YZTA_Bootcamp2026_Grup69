"""Router'ların ortak kullandığı FastAPI bağımlılıkları.

AIService hem triyaj hem belge analizi uç noktalarınca kullanıldığı için burada
tek noktadan kurulur; böylece parametre keşfi önbelleği (bkz. AIService) tüm
modüller arasında paylaşılır ve her modül kendi örneğini kurmak zorunda kalmaz.
"""

from functools import lru_cache

from fastapi import HTTPException, status

from app.core.config import get_settings
from app.services.ai_service import AIService, AIServiceError


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
