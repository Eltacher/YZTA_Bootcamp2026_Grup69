import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { analyzeDocument, DocumentAnalysisResponse } from '@/services/api';

export default function ResultsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [docResult, setDocResult] = useState<DocumentAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Örnek belge yükleme ve analiz fonksiyonu
  const handleUploadAndAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      // Örnek base64 / sample mock file URI veya sunucuya gönderilecek test görseli
      // Gerçek cihazda expo-document-picker veya expo-image-picker ile seçilen URI verilir
      const sampleFileUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      
      const result = await analyzeDocument(sampleFileUri, 'image/png', 'tahlil_raporu.png');
      setDocResult(result);
    } catch (err: any) {
      console.error('Belge Analiz Hatası:', err);
      setError(err.message || 'Belge analizi sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#0E2F44" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Laboratuvar & Tahlil Analizi</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="document-text-outline" size={20} color="#0E2F44" />
          </TouchableOpacity>
        </View>

        {/* Belge Yükleme Butonu Card */}
        <Text style={styles.sectionLabel}>Belge Yükle ve Analiz Et</Text>
        <TouchableOpacity
          style={styles.uploadCard}
          activeOpacity={0.8}
          onPress={handleUploadAndAnalyze}
          disabled={loading}>
          <View style={styles.docIconBg}>
            <Ionicons name="cloud-upload-outline" size={26} color="#0284C7" />
          </View>
          <View style={styles.docInfo}>
            <Text style={styles.docTitle}>Tahlil veya Reçete Yükle</Text>
            <Text style={styles.docSub}>PDF, JPEG, PNG veya HEIC (Maks 15MB)</Text>
          </View>
          {loading ? (
            <ActivityIndicator color="#0284C7" />
          ) : (
            <Ionicons name="add-circle" size={24} color="#0284C7" />
          )}
        </TouchableOpacity>

        {/* Error Alert */}
        {error && (
          <View style={styles.errorCard}>
            <Ionicons name="alert-circle-outline" size={20} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Canlı Yapay Zeka Belge Analiz Sonucu */}
        {docResult && (
          <>
            {/* AI Summary Header Card */}
            <View style={styles.aiSummaryCard}>
              <View style={styles.aiHeaderRow}>
                <Ionicons name="sparkles" size={18} color="#22C55E" />
                <Text style={styles.aiTitle}>Yapay Zeka Analiz Özeti</Text>
                <View style={styles.docTypeBadge}>
                  <Text style={styles.docTypeBadgeText}>{docResult.document_type}</Text>
                </View>
              </View>
              <Text style={styles.aiDescription}>{docResult.summary}</Text>

              {docResult.recommended_department && (
                <View style={styles.deptBox}>
                  <MaterialCommunityIcons name="hospital-building" size={18} color="#0E2F44" />
                  <Text style={styles.deptText}>
                    Önerilen Birincil Bölüm: <Text style={{ fontWeight: '800' }}>{docResult.recommended_department}</Text>
                  </Text>
                </View>
              )}

              <TouchableOpacity style={styles.askAnaBtn} onPress={() => router.push('/assistant')}>
                <Ionicons name="sparkles-outline" size={16} color="#FFFFFF" />
                <Text style={styles.askAnaBtnText}>Asistana Sor</Text>
              </TouchableOpacity>
            </View>

            {/* Key Findings Section */}
            {docResult.key_findings && docResult.key_findings.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>Önemli Bulgular</Text>
                <View style={styles.findingsCard}>
                  {docResult.key_findings.map((finding, idx) => (
                    <View key={idx} style={styles.findingItem}>
                      <Ionicons name="checkmark-circle" size={18} color="#0284C7" />
                      <Text style={styles.findingText}>{finding}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* Recommendations Section */}
            {docResult.recommendations && docResult.recommendations.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>Yönlendirmeler & Tavsiyeler</Text>
                <View style={styles.recommendationsCard}>
                  {docResult.recommendations.map((rec, idx) => (
                    <View key={idx} style={styles.recItem}>
                      <Ionicons name="bulb-outline" size={18} color="#F59E0B" />
                      <Text style={styles.recText}>{rec}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </>
        )}

        {/* Varsayılan / Örnek Laboratuvar Değerleri (Static View Fallback) */}
        {!docResult && (
          <>
            <Text style={styles.sectionLabel}>Örnek Laboratuvar Değerleri</Text>

            {/* Metric 1: Hemoglobin */}
            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={styles.metricTitleRow}>
                  <View style={[styles.dotIndicator, { backgroundColor: '#22C55E' }]} />
                  <Text style={styles.metricName}>Hemoglobin (HGB)</Text>
                </View>
                <Text style={styles.metricValue}>13.5 <Text style={styles.unitText}>g/dL</Text></Text>
              </View>

              <View style={styles.rangeBarTrack}>
                <View style={[styles.rangeSegment, styles.lowRange]} />
                <View style={[styles.rangeSegment, styles.normalRange]}>
                  <View style={[styles.rangeMarker, { left: '55%', backgroundColor: '#22C55E' }]} />
                </View>
                <View style={[styles.rangeSegment, styles.highRange]} />
              </View>

              <View style={styles.rangeLabelsRow}>
                <Text style={styles.rangeLabel}>Düşük</Text>
                <Text style={[styles.rangeLabel, styles.activeLabelGreen]}>Normal</Text>
                <Text style={styles.rangeLabel}>Yüksek</Text>
              </View>
            </View>

            {/* Metric 2: Demir */}
            <View style={styles.metricCardWarning}>
              <View style={styles.metricHeader}>
                <View style={styles.metricTitleRow}>
                  <View style={[styles.dotIndicator, { backgroundColor: '#EF4444' }]} />
                  <Text style={styles.metricName}>Demir (Fe)</Text>
                </View>
                <Text style={[styles.metricValue, { color: '#EF4444' }]}>45 <Text style={styles.unitText}>ug/dL</Text></Text>
              </View>

              <View style={styles.rangeBarTrack}>
                <View style={[styles.rangeSegment, styles.lowRange]}>
                  <View style={[styles.rangeMarker, { left: '35%', backgroundColor: '#EF4444' }]} />
                </View>
                <View style={[styles.rangeSegment, styles.normalRange]} />
                <View style={[styles.rangeSegment, styles.highRange]} />
              </View>

              <View style={styles.rangeLabelsRow}>
                <Text style={[styles.rangeLabel, styles.activeLabelRed]}>Düşük (Uyarı)</Text>
                <Text style={styles.rangeLabel}>Normal</Text>
                <Text style={styles.rangeLabel}>Yüksek</Text>
              </View>
            </View>
          </>
        )}

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
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0E2F44',
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
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0E2F44',
    marginBottom: 10,
    marginTop: 10,
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
    marginBottom: 16,
  },
  docIconBg: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docInfo: {
    flex: 1,
  },
  docTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0E2F44',
  },
  docSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
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
  aiSummaryCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 16,
  },
  aiHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  aiTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#065F46',
    flex: 1,
  },
  docTypeBadge: {
    backgroundColor: '#047857',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  docTypeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  aiDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: '#047857',
    marginBottom: 12,
  },
  deptBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  deptText: {
    fontSize: 12,
    color: '#0E2F44',
  },
  askAnaBtn: {
    backgroundColor: '#0E2F44',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  askAnaBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  findingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    gap: 10,
  },
  findingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  findingText: {
    fontSize: 13,
    color: '#1E293B',
    flex: 1,
    lineHeight: 18,
  },
  recommendationsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    marginBottom: 16,
    gap: 10,
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  recText: {
    fontSize: 13,
    color: '#92400E',
    flex: 1,
    lineHeight: 18,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  metricCardWarning: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    marginBottom: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  metricName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0E2F44',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0E2F44',
  },
  unitText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748B',
  },
  rangeBarTrack: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'visible',
    marginVertical: 6,
    gap: 4,
  },
  rangeSegment: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    position: 'relative',
  },
  lowRange: {
    backgroundColor: '#FEE2E2',
  },
  normalRange: {
    backgroundColor: '#DCFCE7',
  },
  highRange: {
    backgroundColor: '#FEF3C7',
  },
  rangeMarker: {
    width: 12,
    height: 16,
    borderRadius: 6,
    position: 'absolute',
    top: -4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  rangeLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  rangeLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  activeLabelGreen: {
    color: '#16A34A',
    fontWeight: '700',
  },
  activeLabelRed: {
    color: '#DC2626',
    fontWeight: '700',
  },
});
