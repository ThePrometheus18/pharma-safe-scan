import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Medicine } from '../types/Medicine';

interface MedicineDetailScreenProps {
  route: any;
}

const MedicineDetailScreen: React.FC<MedicineDetailScreenProps> = ({ route }) => {
  const { medicine }: { medicine: Medicine } = route.params;

  const DetailRow = ({ icon, label, value, color = '#00bcd4' }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
    color?: string;
  }) => (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={20} color={color} />
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0f0f0f', '#1a1a1a']}
        style={styles.gradient}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header Card */}
          <LinearGradient
            colors={['#2a2a2a', '#1a1a1a']}
            style={styles.headerCard}
          >
            <View style={styles.headerContent}>
              <Text style={styles.medicineName}>{medicine.name}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: medicine.isAuthentic ? '#22c55e' : '#ef4444' }
              ]}>
                <Ionicons 
                  name={medicine.isAuthentic ? 'checkmark-circle' : 'warning'} 
                  size={16} 
                  color="white" 
                />
                <Text style={styles.statusText}>
                  {medicine.isAuthentic ? 'Authentic' : 'Suspicious'}
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Details Card */}
          <LinearGradient
            colors={['#2a2a2a', '#1a1a1a']}
            style={styles.detailsCard}
          >
            <Text style={styles.sectionTitle}>Medicine Information</Text>
            
            <DetailRow
              icon="business"
              label="Manufacturer"
              value={medicine.manufacturer}
            />
            
            <DetailRow
              icon="location"
              label="Manufacturing Location"
              value={medicine.location}
            />
            
            <DetailRow
              icon="calendar"
              label="Manufacturing Date"
              value={format(new Date(medicine.manufactureDate), 'MMMM dd, yyyy')}
            />
            
            <DetailRow
              icon="calendar"
              label="Expiry Date"
              value={format(new Date(medicine.expiryDate), 'MMMM dd, yyyy')}
              color="#f59e0b"
            />
            
            <DetailRow
              icon="cube"
              label="Batch Number"
              value={medicine.batchNumber}
            />
          </LinearGradient>

          {/* Verification Card */}
          <LinearGradient
            colors={['#2a2a2a', '#1a1a1a']}
            style={styles.detailsCard}
          >
            <Text style={styles.sectionTitle}>Blockchain Verification</Text>
            
            <DetailRow
              icon="shield-checkmark"
              label="Verification Status"
              value={medicine.isAuthentic ? 'Verified Authentic' : 'Flagged as Suspicious'}
              color={medicine.isAuthentic ? '#22c55e' : '#ef4444'}
            />
            
            <View style={styles.hashContainer}>
              <View style={styles.hashHeader}>
                <Ionicons name="link" size={20} color="#00bcd4" />
                <Text style={styles.hashLabel}>Verification Hash</Text>
              </View>
              <Text style={styles.hashValue}>{medicine.verificationHash}</Text>
            </View>
            
            <DetailRow
              icon="time"
              label="Scanned At"
              value={format(new Date(medicine.scannedAt), 'MMMM dd, yyyy HH:mm:ss')}
            />
          </LinearGradient>

          {/* Security Notice */}
          <LinearGradient
            colors={medicine.isAuthentic ? ['#22c55e20', '#22c55e10'] : ['#ef444420', '#ef444410']}
            style={styles.noticeCard}
          >
            <View style={styles.noticeContent}>
              <Ionicons 
                name={medicine.isAuthentic ? 'shield-checkmark' : 'warning'} 
                size={24} 
                color={medicine.isAuthentic ? '#22c55e' : '#ef4444'} 
              />
              <View style={styles.noticeText}>
                <Text style={styles.noticeTitle}>
                  {medicine.isAuthentic ? 'Verified Medicine' : 'Security Alert'}
                </Text>
                <Text style={styles.noticeDescription}>
                  {medicine.isAuthentic 
                    ? 'This medicine has been verified as authentic through blockchain verification.'
                    : 'This medicine has been flagged as potentially suspicious. Please verify with your healthcare provider.'
                  }
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  headerContent: {
    alignItems: 'center',
  },
  medicineName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  detailsCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#cccccc',
  },
  hashContainer: {
    marginBottom: 16,
  },
  hashHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  hashLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  hashValue: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#888888',
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 8,
    lineHeight: 16,
  },
  noticeCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  noticeContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  noticeText: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  noticeDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
});

export default MedicineDetailScreen;