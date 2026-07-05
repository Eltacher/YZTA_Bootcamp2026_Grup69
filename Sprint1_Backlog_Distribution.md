# Backlog Dağıtma Mantığı Raporu
**Sağlık / Semptom Takipçisi ve Triyaj Uygulaması**  
**Backend Google YZTA Bootcamp, Grup 69**

## 1. Genel Yaklaşım ve Önceliklendirme
Sprint 1 kapsamında ürün arkalığı (product backlog) öğeleri, mobil uygulama arayüz tasarımları (`image_562d86.png` ve türevleri) ile backend katmanlı mimarisinin entegrasyon sırasına göre önceliklendirilmiştir. Dağıtım mantığında **MoSCoW (Must, Should, Could, Won't)** yöntemi temel alınmıştır.

*   **Must (Olmazsa Olmazlar):** Canlı sesli/yazılı triyaj analizi uç noktası (`/api/v1/triage/analyze`) ve temel Pydantic şema doğrulamaları.
*   **Should (Olmalı):** Belge analizi için taslak uç nokta (`/api/v1/document/analyze`) ve merkezi `.env` mimarisi.
*   **Could (Olsa İyi Olur):** Çoklu veri varyantları için otomatik FastAPI TestClient senaryoları.
*   **Won't (Bu Sprint İçin Ertelenenler):** Dockerizasyon ve RAG katmanı entegrasyonu.

## 2. İş Paketleri Dağılım Matrisi

| İş Paketi ID | Açıklama | Atanan Rol / Ekip | Tahmini Efor (Story Point) | İlgili Arayüz Bileşeni |
| :--- | :--- | :--- | :--- | :--- |
| **WP-01** | Katmanlı FastAPI Temel Mimarisi & CORS Kurulumu | Backend Geliştirici | 5 SP | Genel Altyapı |
| **WP-02** | `image_562da5.png` "Şikayetini Anlat" Butonu Backend Entegrasyonu (Triyaj API) | Yapay Zeka / Backend | 8 SP | `image_562dc0.png` (Semptom Asistanı Ekranı) |
| **WP-03** | `image_562ddb.png` Laboratuvar Analiz Sonuçları İçin Mock API Hazırlanması | Backend Geliştirici | 3 SP | `image_562ddb.png` (Laboratuvar Özet Ekranı) |
| **WP-04** | Pydantic Veri Sözleşmeleri ve Hata Yakalama (502, 503, 422) | Backend Geliştirici | 5 SP | Mobil-Backend Entegrasyon Güvencesi |
| **WP-05** | Model Soyutlama ve Guardrail Sistem İstemi Tasarımı | İstemi Mühendisi / AI | 5 SP | Güvenli Triyaj Çıktısı |

## 3. Dağıtım İlkeleri
1. **Bağımlılık Yönetimi:** Mobil arayüzde tasarlanan renk paleti (`image_562d86.png`) ve akışlara uygun olarak veri sözleşmeleri (Request/Response gövdeleri) backend uç noktalarından önce tamamlanmıştır.
2. **Paralel Yürütme:** AI servislerinin (`ai_service.py`) geliştirilmesi ile Router katmanının (`triage_controller.py`) yazılması paralel yürütülmüştür.
