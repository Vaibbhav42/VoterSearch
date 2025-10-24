import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
  FlatList,
  Dimensions,
  Platform
} from 'react-native';
import { DATASET_NAMES } from '../data/voters';

const Header = ({ onLogout, selectedDataset, onDatasetChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const voterLists = [
    { id: 101, name: 'Voter List 1', description: 'Primary voter database' },
    { id: 102, name: 'Voter List 2', description: 'Secondary voter database' },
    { id: 103, name: 'Voter List 3', description: 'Regional voter database' },
    { id: 104, name: 'Voter List 4', description: 'Municipal voter database' },
    { id: 105, name: 'Voter List 5', description: 'District voter database' },
    { id: 106, name: 'Voter List 6', description: 'State voter database' },
    { id: 107, name: 'Voter List 7', description: 'Federal voter database' },
    { id: 108, name: 'Voter List 8', description: 'Special voter database' },
    { id: 109, name: 'Voter List 9', description: 'Emergency voter database' },
    { id: 110, name: 'Voter List 10', description: 'Backup voter database' },
    { id: 111, name: 'Voter List 11', description: 'Archive voter database' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: onLogout },
      ]
    );
  };

  const handleDatasetChange = () => {
    setModalVisible(true);
  };

  const selectDataset = (id) => {
    onDatasetChange(id);
    setModalVisible(false);
  };

  const renderVoterListItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
        selectedDataset === item.id && styles.selectedItem
      ]}
      onPress={() => selectDataset(item.id)}
    >
      <View style={styles.modalItemContent}>
        <Text style={[
          styles.modalItemTitle,
          selectedDataset === item.id && styles.selectedText
        ]}>
          {item.name}
        </Text>
        <Text style={[
          styles.modalItemDescription,
          selectedDataset === item.id && styles.selectedDescText
        ]}>
          {item.description}
        </Text>
      </View>
      {selectedDataset === item.id && (
        <Text style={styles.checkIcon}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.headerInner}>
        <View style={styles.brandSection}>
          <Text style={styles.brandIcon}>🗳️</Text>
          <Text style={styles.titleMain}>विजयी भव!</Text>
          <View style={styles.titleUnderline} />
        </View>
        
        <TouchableOpacity 
          style={styles.datasetSelector} 
          onPress={handleDatasetChange}
        >
          <View style={styles.datasetIconContainer}>
            <Text style={styles.datasetIcon}>📋</Text>
          </View>
          <View style={styles.datasetTextContainer}>
            <Text style={styles.datasetText}>
              {DATASET_NAMES[selectedDataset] ? 
                DATASET_NAMES[selectedDataset].replace('Voter List ', 'List ') : 
                `List ${selectedDataset}`}
            </Text>
          </View>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Voter List</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={voterLists}
              renderItem={renderVoterListItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.modalList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 45,
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    marginRight: 10,
  },
  brandIcon: {
    fontSize: 26,
    marginRight: 12,
  },
  titleMain: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1.5,
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'serif',
    fontStyle: 'italic',
    transform: [{ skewX: '-3deg' }],
    textDecorationLine: 'none',
  },
  titleUnderline: {
    position: 'absolute',
    bottom: -8,
    left: 38,
    right: 0,
    height: 3,
    backgroundColor: '#FFD700',
    borderRadius: 2,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
    transform: [{ skewX: '-2deg' }],
    opacity: 0.9,
    width: 120,
  },
  datasetSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minWidth: 140,
    maxWidth: 160,
  },
  datasetIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  datasetIcon: {
    fontSize: 12,
  },
  datasetTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  datasetLabel: {
    color: '#718096',
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  datasetText: {
    color: '#2d3748',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.1,
    lineHeight: 14,
    textAlign: 'left',
  },
  dropdownIcon: {
    color: '#718096',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: Dimensions.get('window').width * 0.9,
    maxHeight: Dimensions.get('window').height * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#667eea',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modalList: {
    padding: 10,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
    borderColor: '#007AFF',
  },
  modalItemContent: {
    flex: 1,
  },
  modalItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  modalItemDescription: {
    fontSize: 14,
    color: '#666',
  },
  selectedText: {
    color: '#007AFF',
  },
  selectedDescText: {
    color: '#0056b3',
  },
  checkIcon: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default Header;