import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { analyzeSymptoms, TriageResponse } from '@/services/api';

export default function AssistantScreen() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TriageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const handleAnalyze = async (textToAnalyze?: string) => {
    const query = textToAnalyze || symptoms;
    if (!query || query.trim().length < 3) {
      Alert.alert('Eksik Bilgi', 'Lütfen en az 3 karakterlik semptom açıklaması girin.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeSymptoms(query.trim());
      setResult(data);
    } catch (err: any) {
      console.error('Triyaj Hatası:', err);
      setError(err.message || 'Yapay zeka analizinde bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleMicPress = () => {
    if (!isListening) {
      setIsListening(true);
      // Ses simülasyonu: 2 saniye sonra hazır metin doldurur
      const sampleText = 'İki gündür başım çok ağrıyor, ateşim 38.5 ve boğazımda yanma var.';
      setSymptoms(sampleText);
      setTimeout(() => {
        setIsListening(false);
      }, 1500);
    } else {
      setIsListening(false);
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'kırmızı':
      case 'kirmizi':
        return '#EF4444';
      case 'sarı':
      case 'sari':
        return '#F59E0B';
      case 'yeşil':
      case 'yesil':
        return '#22C55E';
      default:
        return '#3B82F6';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={18} color="#0E2F44" />
            </View>
            <Text style={styles.userNameText}>Sağlık Asistanı</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color="#0E2F44" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title Area */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Semptom Triyajı</Text>
          <Text style={styles.subTitle}>Şikayetlerinizi yazın veya sesli olarak iletin.</Text>
        </View>

        {/* Voice Recording Circle */}
        <View style={styles.micSection}>
          <View style={styles.pulseOuterRing}>
            <View style={styles.pulseMiddleRing}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.micButton, isListening ? styles.micActive : styles.micInactive]}
                onPress={handleMicPress}>
                <Ionicons name={isListening ? 'mic' : 'mic-outline'} size={40} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.listeningText}>
            {isListening ? 'Dinleniyor (Örnek Metin Ekleniyor...)' : 'Sesli Anlatmak İçin Dokunun'}
          </Text>
        </View>

        {/* User Input Card */}
        <View style={styles.transcriptCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Ionicons name="chatbox-ellipses-outline" size={20} color="#0284C7" />
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#0E2F44' }}>Semptom Açıklaması</Text>
          </View>

          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={3}
            placeholder="Örn: Başım ağrıyor, mide bulantım var..."
            placeholderTextColor="#94A3B8"
            value={symptoms}
            onChangeText={setSymptoms}
          />

          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={() => handleAnalyze()}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="sparkles" size={18} color="#FFFFFF" />
                <Text style={styles.submitBtnText}>Yapay Zeka ile Analiz Et</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Error Alert Card */}
        {error && (
          <View style={styles.errorCard}>
            <Ionicons name="alert-circle-outline" size={20} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* AI Analysis Result Card */}
        {result && (
          <View style={styles.analysisCard}>
            <View style={styles.analysisHeader}>
              <Ionicons name="sparkles" size={16} color="#22C55E" />
              <Text style={styles.analysisBadgeText}>AI TRİYAJ SONUCU</Text>
            </View>

            {/* Emergency Banner */}
            {result.is_emergency && (
              <View style={styles.emergencyCard}>
                <Ionicons name="warning" size={22} color="#FFFFFF" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.emergencyTitle}>ACİL DURUM UYARISI</Text>
                  <Text style={styles.emergencyText}>
                    Girdiğiniz semptomlar acil müdahale gerektirebilir! Lütfen en yakın Acil Servise başvurun veya 112'yi arayın.
                  </Text>
                </View>
              </View>
            )}

            {/* Urgency Badge */}
            <View style={styles.urgencyRow}>
              <Text style={styles.urgencyLabel}>Aciliyet Seviyesi:</Text>
              <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(result.urgency_level) }]}>
                <Text style={styles.urgencyBadgeText}>{result.urgency_level?.toUpperCase()}</Text>
              </View>
            </View>

            {/* Recommended Clinic Box */}
            <View style={styles.clinicBox}>
              <MaterialCommunityIcons name="hospital-building" size={26} color="#0E2F44" />
              <View style={{ flex: 1 }}>
                <Text style={styles.clinicLabel}>ÖNERİLEN POLİKLİNİK</Text>
                <Text style={styles.clinicValue}>{result.polyclinic}</Text>
              </View>
            </View>

            {/* Reason Box */}
            <View style={styles.reasonCard}>
              <Text style={styles.reasonTitle}>Yönlendirme Gerekçesi:</Text>
              <Text style={styles.reasonText}>{result.reason}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.btnPrimary} onPress={() => Alert.alert('Randevu', `${result.polyclinic} bölümü için randevu sistemi yönlendiriliyor.`)}>
                <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
                <Text style={styles.btnPrimaryText}>Randevu Bul</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={() => { setResult(null); setSymptoms(''); }}>
                <Text style={styles.btnSecondaryText}>Temizle</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Medical Disclaimer */}
        <View style={styles.disclaimerBox}>
          <Ionicons name="information-circle-outline" size={16} color="#94A3B8" />
          <Text style={styles.disclaimerText}>
            Uyarı: Bu bir teşhis değildir. Kesin tanı ve tedavi için hekiminize danışınız.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0E2F44',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0E2F44',
  },
  subTitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  micSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  pulseOuterRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseMiddleRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(34, 197, 94, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  micActive: {
    backgroundColor: '#EF4444',
  },
  micInactive: {
    backgroundColor: '#22C55E',
  },
  listeningText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0284C7',
    marginTop: 10,
  },
  transcriptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  submitBtn: {
    backgroundColor: '#0E2F44',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  errorCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    color: '#991B1B',
    flex: 1,
  },
  analysisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  analysisBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#22C55E',
    letterSpacing: 0.5,
  },
  emergencyCard: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  emergencyText: {
    fontSize: 12,
    color: '#FEE2E2',
    lineHeight: 17,
  },
  urgencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  urgencyLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0E2F44',
  },
  urgencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  urgencyBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  clinicBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  clinicLabel: {
    fontSize: 11,
    color: '#3B82F6',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  clinicValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0E2F44',
    marginTop: 2,
  },
  reasonCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  reasonTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 19,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btnPrimary: {
    flex: 1.5,
    backgroundColor: '#0E2F44',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 10,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
