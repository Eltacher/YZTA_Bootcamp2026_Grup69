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

> README içerisine board ekran görüntülerini ekleyin:

```md
![](images/board1.png)
![](images/board2.png)
![](images/board3.png)
```

## Ürün Durumu

Sprint 1 sonunda backend çekirdeği çalışır durumdadır.

### Ekran Görüntüleri

Aşağıdaki yolları kendi dosya adlarınıza göre düzenleyin:

```md
<p align="center">
<img src="images/ss_anagostergepaneli_s1.png" width="180"/>
<img src="images/ss_seslisemptom_s1.png" width="180"/>
<img src="images/ss_labanaliz_s1.png" width="180"/>
</p>

<p align="center">
<img src="images/ss_ilactarayici_s1.png" width="180"/>
<img src="images/ss_font_s1.png" width="180"/>
</p>
```

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
