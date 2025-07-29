import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface WalletConnectButtonProps {
  onConnect: (address: string) => void;
  isConnected: boolean;
  walletAddress?: string;
}

export const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ 
  onConnect, 
  isConnected, 
  walletAddress 
}) => {
  const connectWallet = () => {
    // Simulate wallet connection for mobile demo
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
    onConnect(mockAddress);
    Alert.alert('Success', 'Wallet connected successfully!');
  };

  if (isConnected && walletAddress) {
    return (
      <LinearGradient
        colors={['#2a2a2a', '#1a1a1a']}
        style={styles.connectedContainer}
      >
        <View style={styles.connectedContent}>
          <Ionicons name="shield-checkmark" size={24} color="#00bcd4" />
          <View style={styles.connectedText}>
            <Text style={styles.connectedTitle}>Wallet Connected</Text>
            <Text style={styles.addressText}>
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </Text>
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#2a2a2a', '#1a1a1a']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="wallet" size={32} color="#00bcd4" />
        </View>
        <Text style={styles.title}>Connect Your Wallet</Text>
        <Text style={styles.description}>
          Connect your Web3 wallet to verify medicine authenticity on the blockchain
        </Text>
        <TouchableOpacity onPress={connectWallet} style={styles.button}>
          <LinearGradient
            colors={['#00bcd4', '#0097a7']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Connect Wallet</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 188, 212, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    width: '100%',
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  connectedContainer: {
    borderRadius: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  connectedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  connectedText: {
    flex: 1,
  },
  connectedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  addressText: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'monospace',
  },
});