# YZTA Bootcamp 2026 - Grup 69

## Takım İsmi
**Grup 69**

## Ürün ile İlgili Bilgiler

### Takım Üyeleri

| İsim | Rol |
|---|---|
| Emine İclal Oğuz | Product Owner / Developer |
| Eda Nur Teklik | Scrum Master / Developer |
| Ahsen Nur ALDAŞ | Developer |
| Batuhan Tombaş | Developer |
| Emre Kaan ÖZKAN | Developer |

### Ürün İsmi
**Sağlık / Semptom Takipçisi ve Triyaj Uygulaması**

### Ürün Açıklaması
Sağlık / Semptom Takipçisi ve Triyaj Uygulaması, kullanıcıların semptomlarını yazılı veya sesli olarak iletebildiği, yapay zeka destekli ön değerlendirme yapan ve uygun polikliniğe yönlendiren bir mobil sağlık asistanıdır. Uygulama tanı koymaz ve ilaç önermez.

### Ürün Özellikleri
- Yapay zeka destekli semptom analizi
- Sesli ve yazılı semptom girişi
- Poliklinik önerisi
- Aciliyet seviyesi belirleme
- Laboratuvar analizi (Sprint 2)
- Akıllı ilaç tarayıcı (Sprint 2)

### Hedef Kitle

- Yaşadığı semptomlara göre hangi polikliniğe başvuracağını bilmeyen kullanıcılar
- Sağlık şikayetlerini ön değerlendirmeden geçirmek isteyen kişiler
- Laboratuvar sonuçlarını daha anlaşılır görmek isteyen kullanıcılar
- Mobil sağlık asistanı deneyimi arayan kullanıcılar

---

## Sprint 1

### Sprint Notları

Sprint 1'de backend temel mimarisi, FastAPI altyapısı, triyaj servisi, Pydantic şemaları, temel testler ve mobil uygulama ile haberleşecek API yapısı oluşturulmuştur.

### Sprint İçinde Tamamlanması Tahmin Edilen Puan

**26 Story Point**

### Puan Tamamlama Mantığı

Görevler teknik zorluk, bağımlılık ve geliştirme süresi dikkate alınarak puanlanmıştır.

| Görev | Story Point |
|---|---:|
| Katmanlı mimari | 5 |
| Triyaj servisi | 8 |
| Belge analizi | 3 |
| Veri sözleşmeleri | 5 |
| Guardrail sistemi | 5 |

### Sprint Backlog

MoSCoW yöntemi kullanılarak önceliklendirme yapılmıştır.

- Must: Triyaj API, veri sözleşmeleri
- Should: Belge analizi taslağı
- Could: Test otomasyonu
- Won't: Docker, RAG

### Daily Scrum

Sprint boyunca günlük toplantılar gerçekleştirilmiş, görev dağılımı ve blocker'lar düzenli olarak takip edilmiştir.

### Sprint Board Update

Sprint sonunda planlanan görevlerin tamamı tamamlanmıştır.

### Ürün Durumu

Sprint 1 sonunda backend çekirdeği çalışır durumdadır.

#### Ekran Görüntüleri

<p align="center">
<img src="images/ss_anagostergepaneli_s1.png" width="180"/>
<img src="images/ss_seslisemptom_s1.png" width="180"/>
<img src="images/ss_labanaliz_s1.png" width="180"/>
</p>

<p align="center">
<img src="images/ss_ilactarayici_s1.png" width="180"/>
<img src="images/ss_font_s1.png" width="180"/>
</p>

### Sprint Review

- Katmanlı mimari sunuldu.
- Triyaj modülü gösterildi.
- API sözleşmeleri paylaşıldı.
- Sprint 2 hedefleri belirlendi.

### Sprint Retrospective

#### İyi Gidenler

- Katmanlı mimari
- Test odaklı geliştirme
- Mobil ekiple uyum

#### İyileştirilecekler

- Dokümantasyon
- İletişim
- Ortak test ortamı

#### Sprint 2 Hedefleri

- OCR
- RAG
- Laboratuvar analizi
- Docker hazırlıkları

---

## Sprint 2

### Sprint Notları

Sprint 2'de FastAPI backend'i için Docker imajı ve Docker Compose tabanlı geliştirme ortamı eklenmiştir. Compose yapılandırmasında kaynak kod bağlama ve Uvicorn hot reload desteği bulunmaktadır. Triyaj servisi, Wiro AI'ın görev tabanlı API akışına uyarlanmış; görev başlatma, sonuç için durum sorgulama (polling), model parametrelerini keşfetme ve dönen JSON yanıtını `TriageResponse` şemasıyla doğrulama kodlanmıştır. Kullanılacak model ve sağlayıcı adresi ortam değişkenleri üzerinden yapılandırılabilmektedir.

Belge/laboratuvar analizi halen taslak bir yer tutucu yanıt döndürmektedir. İlaç tarayıcı, gelişmiş RAG hattı ve bağımsız bir asenkron görev kuyruğu implementasyonu repository içinde bulunmamaktadır.

### Sprint İçinde Tamamlanması Tahmin Edilen Puan

**30 Story Point**

### Puan Tamamlama Mantığı

Görevler mimari entegrasyon, üçüncü taraf API adaptörü, konteynerizasyon ve model yapılandırması dikkate alınarak puanlanmıştır. Aşağıdaki durumlar repository kodu ve commit geçmişine göre belirtilmiştir; tahmini puanlar tamamlanan puan beyanı değildir.

| Planlanan görev | Story Point | Doğrulanan durum |
|---|---:|---|
| Docker konteynerizasyonu ve hot reload | 5 | Kod ve yapılandırma mevcut |
| Wiro AI entegrasyonu ve adaptör katmanı | 8 | Kod mevcut |
| Wiro tabanlı triyaj akışı ve yanıt doğrulama | 8 | Kod mevcut; canlı servis sonucu repository üzerinden doğrulanmadı |
| Sağlayıcı görevlerini polling ile takip etme ve model yönetimi | 5 | Kod mevcut |
| API dokümantasyonu ve test süreçleri | 4 | FastAPI/OpenAPI açıklamaları mevcut; test dosyası bulunmuyor |

### Daily Scrum

Sprint 2 README notlarında günlük toplantılar yapıldığı belirtilmiştir. Repository içinde Daily Scrum kayıtları veya toplantı notları bulunmadığından ayrıntılar kod üzerinden doğrulanamamaktadır.

### Sprint Backlog

MoSCoW yöntemiyle belgelenen öncelikler:

- **Must:** Docker altyapısı, Wiro AI adaptörü ve triyaj API entegrasyonu
- **Should:** Sağlayıcı görevlerini polling ile takip etme ve ortam değişkenleri üzerinden model seçimi
- **Could:** Mobil yükleme deneyimi için optimizasyon çalışmaları
- **Won't:** Gelişmiş RAG hattı bu sprint kapsamında uygulanmadı

🔗 Sprint 2 Backlog: Bağlantı ekipten alınarak buraya eklenecek.

### Ürün Durumu

Backend için Docker ve Docker Compose dosyaları mevcuttur. `/api/v1/triage/analyze` uç noktası, gerekli sağlayıcı yapılandırması sağlandığında Wiro AI görevini başlatacak, sonucu polling ile takip edecek ve yapılandırılmış triyaj yanıtını doğrulayacak şekilde uygulanmıştır. Harici servisle canlı çalışma ve model maliyet/kalite sonuçları repository içindeki dosyalardan doğrulanamamaktadır.

Belge analizi uç noktası halen `draft_placeholder` durumunda sabit yanıt döndürmektedir; laboratuvar analizi, OCR ve ilaç tarayıcı tamamlanmış değildir.

### Ekran Görüntüleri

### Sprint Review

- Dockerfile ve hot reload destekli Docker Compose geliştirme yapılandırması eklendi.
- Wiro AI için görev başlatma ve sonuç polling adaptörü eklendi.
- Model parametrelerinin sağlayıcıdan keşfedilmesi ve desteklenmeyen sistem alanları için prompt yedeği eklendi.
- Model seçimi ve sağlayıcı adresi ortam değişkenleriyle yapılandırılabilir hale getirildi.
- Triyaj çıktısının JSON olarak ayrıştırılması ve Pydantic şemasıyla doğrulanması sürdürüldü.

### Sprint Retrospective

#### İyi Gidenler

- Docker tabanlı yerel geliştirme yapısı repository'ye eklendi.
- Sağlayıcıya özgü görev akışı ayrı bir servis katmanında toplandı.
- Model parametrelerinin çalışma zamanında keşfedilmesiyle farklı model yapılarına uyum sağlandı.
- Sağlayıcı ve çıktı hataları API katmanında açıklayıcı HTTP hata yanıtlarına dönüştürüldü.

#### İyileştirilecekler

- Wiro AI entegrasyonu için otomatik testler eklenmeli.
- Polling süreleri ve hata senaryoları ölçülerek mobil kullanıcı deneyimi iyileştirilmeli.
- Model maliyet/kalite dengesi canlı test sonuçlarıyla belgelenmeli.
- Taslak belge analizi açıklamaları mevcut ürün durumuyla uyumlu hale getirilmeli.

### Sprint 3 Hedefleri

- Wiro AI adaptörü ve triyaj akışı için otomatik testler eklemek
- Model maliyet, kalite ve yanıt süresi ölçümlerini belgelemek
- Mobil tarafta uzun süren sağlayıcı görevleri için yükleme ve hata deneyimini iyileştirmek
- Belge/laboratuvar analizi ve OCR kapsamını netleştirip gerçek implementasyonu planlamak
- Sprint backlog bağlantısını ve Sprint 2 ürün ekran görüntülerini dokümantasyona eklemek
