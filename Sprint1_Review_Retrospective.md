# Sprint Review & Retrospective (Sprint 1)
**Sağlık / Semptom Takipçisi ve Triyaj Uygulaması**  
**Backend Google YZTA Bootcamp, Grup 69**

## PART A: Sprint Review (Sprint Değerlendirmesi)
Sprint 1 paydaş ve ekip içi değerlendirme toplantısı başarıyla tamamlanmıştır.

### 1. Neler Sunuldu?
*   `https://github.com/Eltacher/YZTA_Bootcamp2026_Grup69` adresindeki katmanlı mimari kod tabanı incelendi.
*   `image_562dc0.png` arayüzündeki senaryoyu canlandıran canlı triyaj analizi uç noktasının çıktısı gösterildi.
*   Uygulamanın esnekliğini kanıtlayan **Model Soyutlaması** yaklaşımı (kod değiştirmeden sadece `.env` üzerinden model değiştirme) paydaşlara aktarıldı.

### 2. Alınan Geri Bildirimler
*   Mobil ekibin arayüz tasarımlarında (`image_562da5.png`, `image_562de2.png`) yer alan "Akıllı İlaç Tarayıcı" ve "Laboratuvar Sonuçları" için backend tarafındaki mock yapılandırması olumlu karşılandı.
*   Hata sözleşmelerinin (502/503/422) netliği mobil-backend entegrasyonunu hızlandıracağı için takdir topladı.

---

## PART B: Sprint Retrospective (Sprint Değerlendirmesi / Özeleştiri)

### 1. Ne İyi Gitti?
*   **Katmanlı Mimari Tercihi:** Modüllerin (`triage` ve `document`) controller ve service seviyesinde ayrılması kodun okunabilirliğini çok artırdı.
*   **Test Odaklılık:** TestClient ile hata yollarının erkenden simüle edilmesi canlıya geçiş risklerini sıfıra indirdi.
*   **Arayüz Uyumluluğu:** Tasarım ekibinin Inter tipografisi ve renk paleti (`image_562d86.png`) kararları doğrultusunda oluşturduğu ekran şemaları, veri tabanı modellerine çok hızlı yansıtıldı.

### 2. Ne Daha İyi Olabilirdi?
*   **İletişim Sıklığı ve Zaman Yönetimi:** Sprint sürecinin üniversite final ve bütünleme sınav dönemine denk gelmesi nedeniyle, ekip üyelerinin akademik yoğunluğu artmış ve bu durum senkronize iletişim sıklığımızı geçici olarak düşürmüştür.
*   
### 3. Sprint 2 İçin Aksiyon Planı
*   **Aksiyon 1:** `image_562de2.png` arayüzündeki Aspirin Plus tarama örneğinde olduğu gibi, ilaç kutusu görsel verisini backend'de işleyecek yapıyı kurmak.
*   **Aksiyon 2:** `image_562ddb.png` ekranındaki kan tahlili özetini üretecek gerçek RAG / Vektör veri tabanı entegrasyonuna başlamak.
*   **Aksiyon 3:** Yerel test süreçlerini hızlandırmak adına ekip içi ortak bir test ortamı (mock API anahtarı havuzu) oluşturmak.
