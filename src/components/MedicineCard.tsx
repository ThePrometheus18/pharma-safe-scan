import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Medicine } from '../types/Medicine';

interface MedicineCardProps {
  medicine: Medicine;
  onPress: () => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <LinearGradient
        colors={['#2a2a2a', '#1a1a1a']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.medicineName}>{medicine.name}</Text>
          <View style={[
            styles.badge,
            { backgroundColor: medicine.isAuthentic ? '#22c55e' : '#ef4444' }
          ]}>
            <Ionicons 
              name={medicine.isAuthentic ? 'checkmark-circle' : 'warning'} 
              size={12} 
              color="white" 
            />
            <Text style={styles.badgeText}>
              {medicine.isAuthentic ? 'Authentic' : 'Suspicious'}
            </Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="business" size={16} color="#00bcd4" />
          <Text style={styles.infoText}>{medicine.manufacturer}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="location" size={16} color="#00bcd4" />
          <Text style={styles.infoText}>{medicine.location}</Text>
        </View>
        
        <View style={styles.dateRow}>
          <View style={styles.dateItem}>
            <Ionicons name="calendar" size={14} color="#00bcd4" />
            <Text style={styles.dateLabel}>Mfg</Text>
            <Text style={styles.dateText}>
              {format(new Date(medicine.manufactureDate), 'MMM dd, yyyy')}
            </Text>
          </View>
          
          <View style={styles.dateItem}>
            <Ionicons name="calendar" size={14} color="#f59e0b" />
            <Text style={styles.dateLabel}>Exp</Text>
            <Text style={styles.dateText}>
              {format(new Date(medicine.expiryDate), 'MMM dd, yyyy')}
            </Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.batchText}>Batch: {medicine.batchNumber}</Text>
          <Text style={styles.scanTime}>
            {format(new Date(medicine.scannedAt), 'MMM dd, HH:mm')}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    marginHorizontal: 16,
  },
  gradient: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#cccccc',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  dateText: {
    fontSize: 12,
    color: '#888888',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 12,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  batchText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#888888',
  },
  scanTime: {
    fontSize: 12,
    color: '#888888',
  },
});