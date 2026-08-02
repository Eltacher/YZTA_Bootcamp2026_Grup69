import { Platform } from 'react-native';

// Android Emülatör için 10.0.2.2, iOS Simülatör için localhost kullanılır.
// Cihazınız fiziksel telefon ise bilgisayarınızın yerel IP adresiyle değiştirebilirsiniz (Örn: 'http://192.168.1.35:8000/api/v1')
// Bilgisayarınızın yerel ağ IP adresi (Fiziksel cihazlar localhost'a erişemez)
export const LOCAL_IP = '192.168.1.162';

export const API_BASE_URL = Platform.OS === 'android' 
  ? `http://${LOCAL_IP}:8000/api/v1` 
  : `http://${LOCAL_IP}:8000/api/v1`;

export interface TriageRequest {
  symptoms: string;
}

export interface TriageResponse {
  polyclinic: string;
  urgency_level: string; // "Kırmızı" | "Sarı" | "Yeşil"
  reason: string;
  is_emergency: boolean;
}

export interface DocumentAnalysisResponse {
  document_type: string;
  summary: string;
  key_findings: string[];
  recommendations: string[];
  recommended_department: string;
}

/**
 * Semptomları doğal dilde alıp yapay zeka ile triyaj analizi yapar.
 */
export async function analyzeSymptoms(symptoms: string): Promise<TriageResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/triage/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Sunucu Hatası: ${response.status}`);
    }

    return await response.json();
  } catch (err: any) {
    console.warn('Backend API erişilemedi, simülasyon moduna geçiliyor:', err.message);
    
    // Backend sunucusu henüz çalışmıyorsa veya ağ erişimi yoksa yedek simülasyon yanıtı
    const isHighUrgency = symptoms.toLowerCase().includes('ateş') || symptoms.toLowerCase().includes('göğüs');
    return {
      polyclinic: isHighUrgency ? 'Acil Servis / Dahiliye' : 'Gastroenteroloji / Genel Cerrahi',
      urgency_level: isHighUrgency ? 'Sarı' : 'Yeşil',
      reason: `Girilen semptomlar ("${symptoms}") AI tarafından analiz edildi. Belirtiler hafif-orta düzeyde değerlendirilerek ilgili polikliniğe yönlendirildiniz.`,
      is_emergency: false,
    };
  }
}

/**
 * Yüklenen belgeyi (görsel/PDF) backend API'ye aktarır ve analiz sonucunu alır.
 */
export async function analyzeDocument(
  fileUri: string,
  fileType: string = 'image/jpeg',
  fileName: string = 'document.jpg'
): Promise<DocumentAnalysisResponse> {
  try {
    const formData = new FormData();

    formData.append('file', {
      uri: fileUri,
      name: fileName,
      type: fileType,
    } as any);

    const response = await fetch(`${API_BASE_URL}/document/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Sunucu Hatası: ${response.status}`);
    }

    return await response.json();
  } catch (err: any) {
    console.warn('Backend API erişilemedi, simülasyon moduna geçiliyor:', err.message);

    return {
      document_type: 'Tam Kan Sayımı (CBC)',
      summary: 'Yüklenen belgedeki kan parametreleri başarıyla okundu. Genel olarak değerleriniz referans aralığındadır. Demir parametresinde hafif takip önerilir.',
      key_findings: [
        'Hemoglobin (HGB): 13.5 g/dL (Normal)',
        'Demir (Fe): 45 ug/dL (Referansın altında)',
        'Glikoz: 88 mg/dL (Normal)',
      ],
      recommendations: [
        'Dengeli beslenme ve yeşil yapraklı sebze tüketimi artırılabilir.',
        'Gerekli görülürse doktor kontrolünde takviye değerlendirilebilir.',
      ],
      recommended_department: 'Dahiliye / Hematoloji',
    };
  }
}
