import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.mainText}>© 2025 Victory Platform</Text>
        <Text style={styles.subText}>Your trusted voter management solution</Text>
        <View style={styles.decorativeLine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#667eea',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    alignItems: 'center',
  },
  mainText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 3,
  },
  subText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 6,
  },
  decorativeLine: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 2,
  },
});

export default Footer;