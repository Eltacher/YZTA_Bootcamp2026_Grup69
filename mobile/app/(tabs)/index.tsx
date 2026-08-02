import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [medTaken, setMedTaken] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Bar */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={20} color="#0E2F44" />
            </View>
            <View>
              <Text style={styles.greetingText}>Günaydın,</Text>
              <Text style={styles.userNameText}>Ayşe Yılmaz 👋</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={22} color="#0E2F44" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="share-outline" size={22} color="#0E2F44" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ana Odak Brand Banner */}
        <View style={styles.brandBanner}>
          <View style={styles.logoRow}>
            <View style={styles.brandIconCircle}>
              <Ionicons name="heart" size={20} color="#22C55E" />
            </View>
            <Text style={styles.brandTitle}>Ana Odak</Text>
            <View style={styles.brandBadge}>
              <Text style={styles.brandBadgeText}>Kişisel AI Sağlık Asistanı</Text>
            </View>
          </View>
        </View>

        {/* Action Cards */}
        <View style={styles.actionGrid}>
          
          {/* Card 1: Tahlil / Röntgen Yükle */}
          <TouchableOpacity
            style={styles.actionCardLight}
            activeOpacity={0.8}
            onPress={() => router.push('/results')}>
            <View style={[styles.cardIconCircle, { backgroundColor: '#E0F2FE' }]}>
              <Ionicons name="document-text-outline" size={24} color="#0284C7" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitleLight}>Tahlil / Röntgen Yükle</Text>
              <Text style={styles.cardSubLight}>Sonuçlarınızı AI ile analiz edin</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          {/* Card 2: Şikayetini Anlat (Primary Hero Card) */}
          <TouchableOpacity
            style={styles.actionCardPrimary}
            activeOpacity={0.8}
            onPress={() => router.push('/assistant')}>
            <View style={styles.primaryIconCircle}>
              <Ionicons name="sparkles" size={24} color="#22C55E" />
            </View>
            <View style={styles.cardTextContainer}>
              <View style={styles.badgeRow}>
                <Text style={styles.aiTagText}>✦ AI ASİSTAN</Text>
              </View>
              <Text style={styles.cardTitlePrimary}>Şikayetini Anlat</Text>
              <Text style={styles.cardSubPrimary}>Sizi dinliyorum, neyiniz var?</Text>
            </View>
            <Ionicons name="mic" size={22} color="#4ADE80" />
          </TouchableOpacity>

          {/* Card 3: İlacını Tanıt */}
          <TouchableOpacity
            style={styles.actionCardLight}
            activeOpacity={0.8}
            onPress={() => router.push('/scanner')}>
            <View style={[styles.cardIconCircle, { backgroundColor: '#F0FDF4' }]}>
              <MaterialCommunityIcons name="pill" size={24} color="#22C55E" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitleLight}>İlacını Tanıt</Text>
              <Text style={styles.cardSubLight}>Barkod okutarak listeye ekle</Text>
            </View>
            <Ionicons name="scan-outline" size={20} color="#64748B" />
          </TouchableOpacity>

        </View>

        {/* Sıradaki İlaç Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="time-outline" size={20} color="#0E2F44" />
            <Text style={styles.sectionTitle}>Sıradaki İlaç</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.medCard}>
          <View style={styles.medInfoLeft}>
            <View style={styles.pillIconBg}>
              <MaterialCommunityIcons name="pill" size={22} color="#0E2F44" />
            </View>
            <View>
              <Text style={styles.medName}>Parol 500mg</Text>
              <Text style={styles.medDetail}>16:00 • Yemekten Sonra</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.takenButton, medTaken ? styles.takenActive : styles.takenPending]}
            onPress={() => setMedTaken(!medTaken)}>
            <Ionicons
              name={medTaken ? 'checkmark-circle' : 'ellipse-outline'}
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.takenButtonText}>{medTaken ? 'ALINDI' : 'AL'}</Text>
          </TouchableOpacity>
        </View>

        {/* AI Sağlık Özeti Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="analytics-outline" size={20} color="#22C55E" />
            <Text style={styles.sectionTitle}>AI Sağlık Özeti</Text>
          </View>
        </View>

        <View style={styles.aiSummaryCard}>
          <View style={styles.aiSummaryHeader}>
            <Ionicons name="sparkles" size={18} color="#22C55E" />
            <Text style={styles.aiSummaryTipTitle}>Önemli Sağlık İpucu</Text>
          </View>
          <Text style={styles.aiSummaryText}>
            Son yüklediğiniz kan tahlili sonuçlarına göre <Text style={styles.boldText}>B12 vitamini</Text> seviyenizde hafif bir düşüş var. Doktorunuzla görüşene kadar yeşil yapraklı sebzeler tüketmeyi düşünebilirsiniz.
          </Text>
          <View style={styles.aiFooter}>
            <Ionicons name="checkmark-done" size={14} color="#16A34A" />
            <Text style={styles.aiFooterText}>AI tarafından 2 gün önce analiz edildi.</Text>
          </View>
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
    marginTop: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  greetingText: {
    fontSize: 13,
    color: '#64748B',
  },
  userNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0E2F44',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  brandBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0E2F44',
  },
  brandBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  brandBadgeText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  actionGrid: {
    gap: 12,
    marginBottom: 20,
  },
  actionCardLight: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionCardPrimary: {
    backgroundColor: '#0E2F44',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    elevation: 3,
    shadowColor: '#0E2F44',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextContainer: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  aiTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4ADE80',
    letterSpacing: 0.5,
  },
  cardTitleLight: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0E2F44',
  },
  cardSubLight: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  cardTitlePrimary: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardSubPrimary: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0E2F44',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#22C55E',
  },
  medCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  medInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pillIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  medName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0E2F44',
  },
  medDetail: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  takenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  takenActive: {
    backgroundColor: '#22C55E',
  },
  takenPending: {
    backgroundColor: '#94A3B8',
  },
  takenButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  aiSummaryCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  aiSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  aiSummaryTipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
  },
  aiSummaryText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#047857',
  },
  boldText: {
    fontWeight: '800',
    color: '#065F46',
  },
  aiFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#A7F3D0',
  },
  aiFooterText: {
    fontSize: 11,
    color: '#047857',
    fontWeight: '500',
  },
});
