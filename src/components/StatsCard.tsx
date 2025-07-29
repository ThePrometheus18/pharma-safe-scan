import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  return (
    <LinearGradient
      colors={['#2a2a2a', '#1a1a1a']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Ionicons name={icon} size={32} color={color} />
        <View style={styles.textContainer}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    margin: 4,
    minHeight: 80,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textContainer: {
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  title: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
});