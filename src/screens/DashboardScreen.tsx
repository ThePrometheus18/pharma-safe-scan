import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  FlatList 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatsCard } from '../components/StatsCard';
import { MedicineCard } from '../components/MedicineCard';
import { WalletConnectButton } from '../components/WalletConnectButton';
import { Medicine, Stats } from '../types/Medicine';

interface DashboardScreenProps {
  navigation: any;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [scannedMedicines, setScannedMedicines] = useState<Medicine[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalScanned: 0,
    authentic: 0,
    suspicious: 0,
    verificationRate: 0
  });

  const handleWalletConnect = (address: string) => {
    setIsWalletConnected(true);
    setWalletAddress(address);
  };

  const handleScanPress = () => {
    if (!isWalletConnected) {
      return;
    }
    navigation.navigate('QRScanner', {
      onScanResult: handleQRScan
    });
  };

  const handleQRScan = (qrData: string) => {
    // Simulate medicine verification
    const medicine: Medicine = {
      id: Date.now().toString(),
      name: 'Paracetamol 500mg',
      manufacturer: 'PharmaCorp Ltd.',
      batchNumber: `BATCH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      manufactureDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Mumbai, India',
      isAuthentic: Math.random() > 0.2,
      verificationHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      scannedAt: new Date().toISOString()
    };

    setScannedMedicines(prev => [medicine, ...prev]);
    
    // Update stats
    const newTotal = stats.totalScanned + 1;
    const newAuthentic = medicine.isAuthentic ? stats.authentic + 1 : stats.authentic;
    const newSuspicious = medicine.isAuthentic ? stats.suspicious : stats.suspicious + 1;
    const newRate = newTotal > 0 ? (newAuthentic / newTotal) * 100 : 0;
    
    setStats({
      totalScanned: newTotal,
      authentic: newAuthentic,
      suspicious: newSuspicious,
      verificationRate: parseFloat(newRate.toFixed(1))
    });
  };

  const handleMedicinePress = (medicine: Medicine) => {
    navigation.navigate('MedicineDetail', { medicine });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0f0f0f', '#1a1a1a']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Ionicons name="shield-checkmark" size={32} color="#00bcd4" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.title}>Pharma-Chain</Text>
              <Text style={styles.subtitle}>Secure Pharmaceutical Verification</Text>
            </View>
            {isWalletConnected && (
              <View style={styles.statusIndicator}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Connected</Text>
              </View>
            )}
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Wallet Connection */}
          {!isWalletConnected && (
            <WalletConnectButton
              onConnect={handleWalletConnect}
              isConnected={isWalletConnected}
              walletAddress={walletAddress}
            />
          )}

          {/* Stats Cards */}
          {isWalletConnected && (
            <>
              <View style={styles.statsContainer}>
                <View style={styles.statsRow}>
                  <StatsCard
                    title="Total Scanned"
                    value={stats.totalScanned}
                    icon="cube"
                    color="#00bcd4"
                  />
                  <StatsCard
                    title="Authentic"
                    value={stats.authentic}
                    icon="checkmark-circle"
                    color="#22c55e"
                  />
                </View>
                <View style={styles.statsRow}>
                  <StatsCard
                    title="Flagged"
                    value={stats.suspicious}
                    icon="warning"
                    color="#f59e0b"
                  />
                  <StatsCard
                    title="Verification Rate"
                    value={`${stats.verificationRate}%`}
                    icon="shield"
                    color="#00bcd4"
                  />
                </View>
              </View>

              {/* Connected Wallet Info */}
              <WalletConnectButton
                onConnect={handleWalletConnect}
                isConnected={isWalletConnected}
                walletAddress={walletAddress}
              />

              {/* Scan Button */}
              <View style={styles.scanButtonContainer}>
                <TouchableOpacity onPress={handleScanPress} style={styles.scanButton}>
                  <LinearGradient
                    colors={['#00bcd4', '#0097a7']}
                    style={styles.scanButtonGradient}
                  >
                    <Ionicons name="qr-code" size={24} color="white" />
                    <Text style={styles.scanButtonText}>Scan Medicine QR Code</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Recent Scans */}
              {scannedMedicines.length > 0 && (
                <View style={styles.recentScansContainer}>
                  <Text style={styles.sectionTitle}>Recent Scans</Text>
                  <FlatList
                    data={scannedMedicines.slice(0, 6)}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <MedicineCard
                        medicine={item}
                        onPress={() => handleMedicinePress(item)}
                      />
                    )}
                    scrollEnabled={false}
                  />
                </View>
              )}
            </>
          )}
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
  header: {
    backgroundColor: 'rgba(42, 42, 42, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 188, 212, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  statusText: {
    fontSize: 12,
    color: '#888888',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  scanButtonContainer: {
    padding: 16,
  },
  scanButton: {
    borderRadius: 12,
  },
  scanButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 12,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  recentScansContainer: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default DashboardScreen;