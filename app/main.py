"""Sağlık Triyaj API — uygulama giriş noktası.

Çalıştırma: uvicorn app.main:app --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.document_controller import router as document_router
from app.api.triage_controller import router as triage_router

# API sürümleme tek noktadan yönetilir; modül router'ları yalnızca kendi
# alan adlarını (/triage, /document) tanımlar.
API_V1_PREFIX = "/api/v1"

app = FastAPI(
    title="Sağlık Triyaj API",
    description=(
        "Semptomları doğal dilde alıp yapay zeka destekli poliklinik ve "
        "triyaj önerisi üreten servis. (Tıbbi tanı aracı değildir.)"
    ),
    version="0.1.0",
)

# React Native / Expo istemcisi geliştirme sırasında farklı adres ve portlardan
# istek atacağı için tüm kaynaklara izin veriyoruz.
# NOT: Yayına çıkarken allow_origins gerçek alan adlarıyla sınırlandırılmalı.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(triage_router, prefix=API_V1_PREFIX)
app.include_router(document_router, prefix=API_V1_PREFIX)
