import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ScannerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Simulated Camera Viewfinder Container */}
      <View style={styles.cameraView}>
        {/* Top Controls */}
        <View style={styles.cameraHeader}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
            <Ionicons name="close" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.cameraTitle}>Akıllı İlaç Tarayıcı</Text>
          <TouchableOpacity style={styles.flashBtn}>
            <Ionicons name="flash-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Scanner Framing Box */}
        <View style={styles.scannerFrameContainer}>
          <View style={styles.scannerFrame}>
            {/* Corner Indicators */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            {/* Simulated Medicine Package Item inside viewfinder */}
            <View style={styles.medicineBoxSim}>
              <MaterialCommunityIcons name="pill" size={32} color="#0E2F44" />
              <Text style={styles.medBoxTitle}>ASPIRIN PLUS</Text>
              <Text style={styles.medBoxSub}>Tablet 500mg • 20 Tablet</Text>
            </View>
          </View>
          <Text style={styles.instructionText}>
            İlacı çerçevenin içine yerleştirin{'\n'}Kutuyu tarama alanına hizalayın
          </Text>
        </View>

        {/* Shutter Controls */}
        <View style={styles.shutterRow}>
          <TouchableOpacity style={styles.galleryBtn}>
            <Ionicons name="images-outline" size={22} color="#FFFFFF" />
            <Text style={styles.controlLabel}>Galeri</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shutterBtn}>
            <View style={styles.shutterInner} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.flashControlBtn}>
            <Ionicons name="flash" size={22} color="#FFFFFF" />
            <Text style={styles.controlLabel}>Flaş</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Sheet Card - AI Scan Result */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />

        <View style={styles.resultHeaderRow}>
          <View style={styles.medBadgeIcon}>
            <MaterialCommunityIcons name="pill" size={22} color="#0E2F44" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.aiDetectedBadge}>
              <Ionicons name="sparkles" size={12} color="#22C55E" />
              <Text style={styles.aiBadgeText}>AI TESPİT ETTİ</Text>
            </View>
            <Text style={styles.medicineTitle}>Aspirin Plus</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <Text style={styles.medDescription}>
          Aspirin Plus, genellikle hafif ila orta şiddetli ağrıların giderilmesi ve ateşi düşürmek için kullanılır.{' '}
          <Text style={styles.boldText}>Günde maksimum 3 doz</Text> önerilir. Tok karnına alınması tavsiye edilir.
        </Text>

        <TouchableOpacity style={styles.scheduleBtn}>
          <Ionicons name="alarm-outline" size={18} color="#FFFFFF" />
          <Text style={styles.scheduleBtnText}>Dozaj Takvimini Ayarla</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  cameraView: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  cameraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  flashBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerFrameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerFrame: {
    width: 260,
    height: 180,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#22C55E',
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },
  medicineBoxSim: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  medBoxTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0E2F44',
    marginTop: 4,
  },
  medBoxSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  instructionText: {
    color: '#E2E8F0',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
  shutterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  galleryBtn: {
    alignItems: 'center',
    gap: 4,
  },
  flashControlBtn: {
    alignItems: 'center',
    gap: 4,
  },
  controlLabel: {
    fontSize: 11,
    color: '#CBD5E1',
  },
  shutterBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  shutterInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#22C55E',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 24,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 16,
  },
  resultHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  medBadgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiDetectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#22C55E',
    letterSpacing: 0.5,
  },
  medicineTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0E2F44',
  },
  medDescription: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
    marginBottom: 16,
  },
  boldText: {
    fontWeight: '700',
    color: '#0E2F44',
  },
  scheduleBtn: {
    backgroundColor: '#0E2F44',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  scheduleBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
