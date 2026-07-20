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

# Sprint 1

## Sprint Notları

Sprint 1'de backend temel mimarisi, FastAPI altyapısı, triyaj servisi, Pydantic şemaları, temel testler ve mobil uygulama ile haberleşecek API yapısı oluşturulmuştur.

## Sprint İçinde Tamamlanması Tahmin Edilen Puan

**26 Story Point**

## Puan Tamamlama Mantığı

Görevler teknik zorluk, bağımlılık ve geliştirme süresi dikkate alınarak puanlanmıştır.

| Görev | Story Point |
|---|---:|
| Katmanlı mimari | 5 |
| Triyaj servisi | 8 |
| Belge analizi | 3 |
| Veri sözleşmeleri | 5 |
| Guardrail sistemi | 5 |

## Sprint Backlog

MoSCoW yöntemi kullanılarak önceliklendirme yapılmıştır.

- Must: Triyaj API, veri sözleşmeleri
- Should: Belge analizi taslağı
- Could: Test otomasyonu
- Won't: Docker, RAG

## Daily Scrum

Sprint boyunca günlük toplantılar gerçekleştirilmiş, görev dağılımı ve blocker'lar düzenli olarak takip edilmiştir.

## Sprint Board Update

Sprint sonunda planlanan görevlerin tamamı tamamlanmıştır.

## Ürün Durumu

Sprint 1 sonunda backend çekirdeği çalışır durumdadır.

### Ekran Görüntüleri

<p align="center">
<img src="images/ss_anagostergepaneli_s1.png" width="180"/>
<img src="images/ss_seslisemptom_s1.png" width="180"/>
<img src="images/ss_labanaliz_s1.png" width="180"/>
</p>

<p align="center">
<img src="images/ss_ilactarayici_s1.png" width="180"/>
<img src="images/ss_font_s1.png" width="180"/>
</p>

## Sprint Review

- Katmanlı mimari sunuldu.
- Triyaj modülü gösterildi.
- API sözleşmeleri paylaşıldı.
- Sprint 2 hedefleri belirlendi.

## Sprint Retrospective

### İyi Gidenler

- Katmanlı mimari
- Test odaklı geliştirme
- Mobil ekiple uyum

### İyileştirilecekler

- Dokümantasyon
- İletişim
- Ortak test ortamı

### Sprint 2 Hedefleri

- OCR
- RAG
- Laboratuvar analizi
- Docker hazırlıkları

- # Sprint 2

## Sprint Notları

Sprint 2'de FastAPI tabanlı backend altyapısı Docker ile tam uyumlu hale getirilmiş, Wiro AI entegrasyonu tamamlanarak gerçek yapay zeka tabanlı triyaj yanıtları üretilmeye başlanmıştır. Asenkron görev kuyruğu mimarisi ve model esnekliği sağlanmıştır.

## Sprint İçinde Tamamlanması Tahmin Edilen Puan

**30 Story Point**

## Puan Tamamlama Mantığı

Görevler mimari entegrasyon, üçüncü taraf API adaptör geliştirme, konteynerizasyon ve model optimizasyon süreçleri dikkate alınarak puanlanmıştır.

| Görev | Story Point |
| --- | --- |
| Docker konteynerizasyonu ve hot reload | 5 |
| Wiro AI entegrasyonu ve adaptör katmanı | 8 |
| Gerçek triyaj ve analiz servisleri | 8 |
| Asenkron görev kuyruğu ve model yönetimi | 5 |
| API dokümantasyonu ve test süreçleri | 4 |

## Sprint Backlog

MoSCoW yöntemi kullanılarak önceliklendirme yapılmıştır.

* Must: Docker altyapısı, Wiro AI entegrasyonu, gerçek triyaj API'si
* Should: Asenkron görev yönetimi, model esnekliği (`.env` üzerinden model değişimi)
* Could: Mobil yükleme animasyonları için optimizasyon çalışmaları
* Won't: Gelişmiş RAG boru hattı (Sonraki sprintlere ertelendi)

## Daily Scrum

Sprint boyunca günlük toplantılar gerçekleştirilmiş; Wiro AI'ın görev tabanlı özel adaptör süreci, asenkron yanıt süreleri ve model maliyet/kalite dengeleri düzenli olarak takip edilmiştir.

## Sprint Board Update

Sprint sonunda planlanan görevlerin tamamı başarıyla tamamlanmıştır.

## Ürün Durumu

Sprint 2 sonunda backend sistemi Docker ile ayağa kalkabilir, Wiro AI üzerinden gerçek yapay zeka destekli triyaj (poliklinik önerisi, kırmızı/sarı/yeşil kodlama, gerekçe ve acil bayrağı) yanıtları dönebilir duruma gelmiştir.

## Sprint Review

* Docker ve hot reload altyapısı tanıtıldı.
* Wiro AI görev tabanlı adaptör mimarisi ve canlı triyaj sonuçları gösterildi.
* `.env` üzerinden kolay model değişimi (`AI_MODEL`) paylaşıldı.
* Sprint 3 hedefleri ve model maliyet/kalite test planı belirlendi.

## Sprint Retrospective

### İyi Gidenler

* Docker ile hızlı ve sorunsuz geliştirme ortamı (hot reload)
* Wiro AI uyumsuzluğunun özel adaptör katmanıyla başarıyla çözülmesi
* Modüler yapı sayesinde farklı LLM modellerinin kolayca test edilebilmesi

### İyileştirilecekler

* Asenkron görev kuyruğu sürelerinin (5-20 saniye) mobil tarafta UX açısından optimize edilmesi
* Wiro AI modelleri arasından maliyet/performans dengesi en iyi olan modelin canlı testlerle netleştirilmesi
