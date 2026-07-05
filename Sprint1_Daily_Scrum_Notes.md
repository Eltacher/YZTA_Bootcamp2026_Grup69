# Daily Scrum Notları (Sprint 1)
**Sağlık / Semptom Takipçisi ve Triyaj Uygulaması**  
**Backend Google YZTA Bootcamp, Grup 69**

> **Not:** Sprint 1 süresince gerçekleştirilen günlük toplantıların özeti ve kritik günlerdeki durum güncellemeleridir.

### Gün 2: Mimari Kurulum
*   **Dün Ne Yapıldı:** Depo adresi (`https://github.com/Eltacher/YZTA_Bootcamp2026_Grup69`) oluşturuldu ve `.gitignore` kuralları belirlendi.
*   **Bugün Ne Yapılacak:** Katmanlı mimari (`app/api`, `app/services`, `app/schemas`) dizin yapısı oluşturulacak.
*   **Engeller (Blockers):** `.env` dosyasındaki gizli anahtarların yönetimi konusunda ortak bir standart belirlenmeli.

### Gün 4: Triyaj Modülü ve UI Eşleşmesi
*   **Dün Ne Yapıldı:** `image_562dc0.png` arayüzündeki "Karnım dünden beri çok ağrıyor..." girdisine uygun Pydantic veri şemaları hazırlandı.
*   **Bugün Ne Yapılacak:** OpenAI/Gemini sağlayıcıları için model soyutlama katmanı (`config.py`) yazılacak.
*   **Engeller (Blockers):** Modelin teşhis koymasını engellemek için guardrail isteminin katılaştırılması gerekiyor.

### Gün 6: Mock Uç Noktaları ve Hata Yönetimi
*   **Dün Ne Yapıldı:** `image_562ddb.png` arayüzündeki laboratuvar özet analizi için `/api/v1/document/analyze` yer tutucusu (placeholder) yazıldı.
*   **Bugün Ne Yapılacak:** Mobil ekibin bloklanmaması adına 502, 503 ve 422 hata kodlarının entegrasyonu tamamlanacak.
*   **Engeller (Blockers):** Yok.

### Gün 9: Test ve İlk Commit Öncesi Kontrol
*   **Dün Ne Yapıldı:** FastAPI TestClient ile uçtan uca otomatik entegrasyon testleri yazıldı.
*   **Bugün Ne Yapılacak:** `7116ead` numaralı ilk büyük commit `main` dalına (branch) gönderilecek.
*   **Engeller (Blockers):** Ekip üyelerinin yerel ortamlarında gerçek API anahtarlarıyla test yapabilmesi için `.env.example` şablonu güncellenmeli.
