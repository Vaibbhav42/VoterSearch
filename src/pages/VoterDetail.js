import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
  SafeAreaView,
  Dimensions,
  Modal,
} from 'react-native';
import { VOTER_DATASETS } from '../data/voters';
import BackToDashboard from '../components/BackToDashboard';

// Simple in-memory storage as fallback
const memoryStorage = {};

const { width } = Dimensions.get('window');

export default function VoterDetail({ route, navigation, selectedDataset = 101 }) {
  const { id, voter: passedVoter } = route.params || {};
  const VOTERS = VOTER_DATASETS[selectedDataset] || VOTER_DATASETS[101];

  const [voter, setVoter] = useState(() => {
    const foundVoter = passedVoter || VOTERS.find((v) => v.id === id);
    if (!foundVoter) {
      // If no voter found, navigate back and show error
      setTimeout(() => {
        Alert.alert('Error', 'Voter not found', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }, 100);
      return null;
    }
    return foundVoter;
  });
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [newMobile, setNewMobile] = useState(''); // Start with blank mobile field
  const [mobileError, setMobileError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [statusColor, setStatusColor] = useState('#cccccc');
  const [saveMessage, setSaveMessage] = useState('');
  const [showAllOptions, setShowAllOptions] = useState(true);
  const [showColorModal, setShowColorModal] = useState(false);
  const [customOption, setCustomOption] = useState(null);
  const [customValue, setCustomValue] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);

  const boothAddress = "Sara metroville, tathwade road, dattawade road, punawale, pune";

  useEffect(() => {
    if (voter) {
      // Load saved mobile number
      const savedMobile = memoryStorage[`voterMobile_${selectedDataset}_${voter.id}`];
      if (savedMobile !== undefined) {
        setVoter(prev => ({ ...prev, mobile: savedMobile }));
        setNewMobile(savedMobile);
      } else {
        setNewMobile(voter.mobile || '');
      }
      
      // Load saved data from storage
      const savedCustomData = getVoterCustomData(voter.id);
      const savedColor = getVoterColor(voter.id);
      
      if (savedCustomData.type) {
        setCustomOption(savedCustomData.type);
        setCustomValue(savedCustomData.value);
        setShowAllOptions(false);
      }
      
      if (savedColor !== '#cccccc') {
        setStatusColor(savedColor);
      }
    }
  }, [voter, selectedDataset]);

  // Helper functions for storage operations
  const setVoterCustomData = async (id, data) => {
    try {
      memoryStorage[`voterCustomData_${selectedDataset}_${id}`] = JSON.stringify(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const setVoterColor = async (id, color) => {
    try {
      memoryStorage[`voterStatusColor_${selectedDataset}_${id}`] = color;
      return true;
    } catch (error) {
      return false;
    }
  };

  const getVoterCustomData = (id) => {
    try {
      const raw = memoryStorage[`voterCustomData_${selectedDataset}_${id}`];
      return raw ? JSON.parse(raw) : { type: null, value: '' };
    } catch (error) {
      return { type: null, value: '' };
    }
  };

  const getVoterColor = (id) => {
    try {
      return memoryStorage[`voterStatusColor_${selectedDataset}_${id}`] || '#cccccc';
    } catch (error) {
      return '#cccccc';
    }
  };

  const executeCustomSave = async (type, value) => {
    try {
      setIsSaving(true);
      const dataToSave = { type: type, value: value.trim() };
      await setVoterCustomData(voter.id, dataToSave);
      setCustomOption(dataToSave.type);
      setCustomValue(dataToSave.value);
      setIsInputVisible(false);
      setShowAllOptions(false);
      setIsSaving(false);
      
      return true;
    } catch (error) {
      setIsSaving(false);
      return false;
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSaveAndRedirect = async () => {
    try {
      // Save any data that has been selected, but don't require anything
      
      // Save custom data if selected
      if (customOption && customValue) {
        await setVoterCustomData(voter.id, { type: customOption, value: customValue });
      }
      
      // Save status color if changed from default
      if (statusColor !== '#cccccc') {
        await setVoterColor(voter.id, statusColor);
      }
      
      // Always allow navigation back - no restrictions
      
    } catch (error) {
      // Even if save fails, still allow navigation
    }
    
    // Always navigate back regardless of what was or wasn't selected
    navigation.goBack();
  };

  const isValidMobile = (mobile) => /^\d{10}$/.test(mobile);

  const handleMobileChange = (value) => {
    const numericValue = value.replace(/\D/g, '');
    setNewMobile(numericValue);
    if (isValidMobile(numericValue)) setMobileError('');
  };

  const handleEditClick = () => {
    setIsEditingMobile(true);
    setNewMobile(voter.mobile || ''); // Use saved mobile or empty string
    setMobileError('');
  };

  const handleSaveClick = async () => {
    const trimmedMobile = newMobile.trim();
    if (trimmedMobile && !isValidMobile(trimmedMobile)) {
      setMobileError("Please enter exactly 10 digits for the mobile number.");
      return;
    }
    if (trimmedMobile === voter.mobile) {
      setIsEditingMobile(false);
      return;
    }
    
    // Save mobile number to storage
    try {
      memoryStorage[`voterMobile_${selectedDataset}_${voter.id}`] = trimmedMobile;
    } catch (error) {
      // Handle error silently
    }
    
    setVoter(prev => ({ ...prev, mobile: trimmedMobile }));
    setIsEditingMobile(false);
    if (trimmedMobile) {
      Alert.alert('Success', 'Mobile number updated successfully!');
    } else {
      Alert.alert('Success', 'Mobile number cleared successfully!');
    }
  };

  const handleCancelClick = () => {
    setNewMobile(voter.mobile || ''); // Restore to saved mobile or empty
    setMobileError('');
    setIsEditingMobile(false);
  };

  const handleRadioChange = (type) => {
    setCustomOption(type);

    if (type === 'Dead') {
      setIsInputVisible(false);
      executeCustomSave(type, 'Confirmed');
    } else {
      setIsInputVisible(true);
      if (customOption !== type) {
        setCustomValue('');
      }
    }
  };

  const handleCustomSave = () => {
    const trimmedValue = customValue.trim();
    if (!customOption || trimmedValue === '') {
      setSaveMessage('❌ Please enter location data to save.');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }
    if (trimmedValue.length < 2) {
      setSaveMessage('❌ Please enter a valid location (at least 2 characters).');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }
    executeCustomSave(customOption, trimmedValue);
    setIsInputVisible(false);
    setSaveMessage(`✅ ${customOption} location saved successfully!`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleColorChange = async (color) => {
    setStatusColor(color);
    await setVoterColor(voter.id, color);
    setShowColorModal(false);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'Call':
        Linking.openURL(`tel:${voter.mobile}`);
        break;
      case 'WhatsApp':
        const voterInfo = `🗳️ *VOTER DETAILS*

1. *Voter Name:* ${voter.name}
2. *Voter ID:* ${voter.voterId}
3. *Booth No:* ${voter.boothNo}
4. *Serial Number:* ${voter.srNo}

📅 Date: ${new Date().toLocaleDateString('en-IN')}`;
        
        const encodedMessage = encodeURIComponent(voterInfo);
        const whatsappUrl = `https://wa.me/${voter.mobile}?text=${encodedMessage}`;
        Linking.openURL(whatsappUrl);
        break;
      case 'Location':
        const address = voter.address || boothAddress;
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.openURL(mapUrl);
        break;
      case 'Family Members':
        Alert.alert('Family Members', 'Family members feature coming soon!');
        break;
      default:
        break;
    }
  };

  if (!voter) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Voter not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Welcome Header */}
        {/* <View style={styles.welcomeSection}>
          <Text style={styles.welcomeEmoji}>🗳️</Text>
          <Text style={styles.welcomeTitle}>Voter Details</Text>
          <Text style={styles.welcomeSubtitle}>Complete voter information</Text>
        </View> */}

        {/* Main Content */}
        <View style={styles.contentContainer}>
          
          {/* Header with Name and Status */}
          <View style={styles.headerCard}>
            <View style={styles.headerInfo}>
              <Text style={styles.voterName}>{voter.name}</Text>
              <Text style={styles.voterId}>Voter ID: {voter.voterId}</Text>
            </View>
            <View 
              style={[
                styles.statusCircle,
                { backgroundColor: statusColor }
              ]}
            />
          </View>

          {/* Basic Info Cards */}
          <View style={styles.infoGrid}>
            <View style={[styles.infoCard, styles.genderCard]}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>{voter.gender}</Text>
            </View>
            <View style={[styles.infoCard, styles.ageCard]}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{voter.age}</Text>
            </View>
          </View>

          {/* Booth Details */}
          <View style={styles.boothCard}>
            <Text style={styles.cardTitle}>🏛️ Booth Details</Text>
            <View style={styles.boothGrid}>
              <View style={styles.boothItem}>
                <Text style={styles.boothLabel}>Booth No.</Text>
                <Text style={styles.boothValue}>{voter.boothNo}</Text>
              </View>
              <View style={styles.boothItem}>
                <Text style={styles.boothLabel}>Sr. No.</Text>
                <Text style={styles.boothValue}>{voter.srNo}</Text>
              </View>
            </View>
            <View style={styles.addressContainer}>
              <Text style={styles.addressLabel}>Booth Address</Text>
              <Text style={styles.addressText}>{boothAddress}</Text>
            </View>
          </View>

          {/* Mobile Section */}
          <View style={styles.mobileCard}>
            <Text style={styles.cardTitle}>📱 Mobile Number</Text>
            {!isEditingMobile ? (
              <View style={styles.mobileDisplay}>
                <Text style={[
                  styles.mobileNumber,
                  (!voter.mobile || voter.mobile.trim() === '') && styles.mobileNumberPlaceholder
                ]}>
                  {voter.mobile && voter.mobile.trim() !== '' ? voter.mobile : 'No mobile number added'}
                </Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEditClick}
                >
                  <Text style={styles.editButtonText}>✏️ {voter.mobile && voter.mobile.trim() !== '' ? 'Edit' : 'Add'}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.mobileEdit}>
                <TextInput
                  style={[
                    styles.mobileInput,
                    mobileError ? styles.mobileInputError : null
                  ]}
                  maxLength={10}
                  value={newMobile}
                  onChangeText={handleMobileChange}
                  keyboardType="numeric"
                  placeholder="Enter 10-digit mobile"
                />
                <View style={styles.mobileButtons}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveClick}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancelClick}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                {mobileError ? (
                  <Text style={styles.errorMessage}>{mobileError}</Text>
                ) : null}
              </View>
            )}
          </View>

          {/* Address */}
          <View style={styles.addressCard}>
            <Text style={styles.cardTitle}>🏠 Address</Text>
            <Text style={styles.addressText}>{voter.address}</Text>
          </View>

          {/* Custom Status */}
          <View style={styles.customStatusCard}>
            <View style={styles.customStatusHeader}>
              <Text style={styles.cardTitle}>🏷️ Custom Status</Text>
              {!showAllOptions && customOption && (
                <View style={styles.statusButtonsContainer}>
                  <TouchableOpacity
                    style={styles.editStatusButton}
                    onPress={() => {
                      setShowAllOptions(true);
                      if (customOption === 'Migrant' || customOption === 'Out Of Town') {
                        setIsInputVisible(true);
                      }
                    }}
                  >
                    <Text style={styles.editStatusText}>✏️ Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.clearStatusButton}
                    onPress={async () => {
                      await setVoterCustomData(voter.id, { type: null, value: '' });
                      setCustomOption(null);
                      setCustomValue('');
                      setIsInputVisible(false);
                      setShowAllOptions(true);
                      setSaveMessage('✅ Custom status cleared successfully!');
                      setTimeout(() => setSaveMessage(''), 3000);
                    }}
                  >
                    <Text style={styles.clearStatusText}>🗑️ Clear</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {showAllOptions ? (
              <View style={styles.statusOptions}>
                <TouchableOpacity
                  style={[
                    styles.statusOption,
                    styles.migrantOption,
                    customOption === 'Migrant' && styles.selectedOption
                  ]}
                  onPress={() => handleRadioChange('Migrant')}
                >
                  <Text style={styles.statusEmoji}>📍</Text>
                  <Text style={[
                    styles.statusText,
                    customOption === 'Migrant' && styles.selectedText
                  ]}>Migrant</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.statusOption,
                    styles.outOfTownOption,
                    customOption === 'Out Of Town' && styles.selectedOption
                  ]}
                  onPress={() => handleRadioChange('Out Of Town')}
                >
                  <Text style={styles.statusEmoji}>🌍</Text>
                  <Text style={[
                    styles.statusText,
                    customOption === 'Out Of Town' && styles.selectedText
                  ]}>Out Of Town</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.statusOption,
                    styles.deadOption,
                    customOption === 'Dead' && styles.selectedOption
                  ]}
                  onPress={() => handleRadioChange('Dead')}
                >
                  <Text style={styles.statusEmoji}>💀</Text>
                  <Text style={[
                    styles.statusText,
                    customOption === 'Dead' && styles.selectedText
                  ]}>Dead</Text>
                </TouchableOpacity>
              </View>
            ) : customOption && (
              <View style={styles.selectedStatus}>
                <Text style={styles.selectedStatusEmoji}>
                  {customOption === 'Migrant' && '📍'}
                  {customOption === 'Out Of Town' && '🌍'}
                  {customOption === 'Dead' && '💀'}
                </Text>
                <Text style={styles.selectedStatusText}>Selected: {customOption}</Text>
              </View>
            )}

            {saveMessage ? (
              <View style={[
                styles.saveMessageContainer,
                saveMessage.includes('✅') ? styles.successMessage : styles.errorMessageContainer
              ]}>
                <Text style={styles.saveMessageText}>{saveMessage}</Text>
              </View>
            ) : null}

            {isInputVisible && (customOption === 'Migrant' || customOption === 'Out Of Town') && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {customOption === 'Migrant' ? '📍 Enter Migrant Location:' : '🌍 Enter Out of Town Location:'}
                </Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.locationInput}
                    placeholder={customOption === 'Migrant' ? 'e.g., Mumbai, Delhi, Kolkata...' : 'e.g., Bangalore, Chennai, Hyderabad...'}
                    value={customValue}
                    onChangeText={setCustomValue}
                    onSubmitEditing={() => {
                      if (customValue.trim() && !isSaving) {
                        handleCustomSave();
                      }
                    }}
                  />
                  <TouchableOpacity
                    style={[
                      styles.saveLocationButton,
                      (!customValue.trim() || isSaving) && styles.disabledButton
                    ]}
                    onPress={handleCustomSave}
                    disabled={isSaving || !customValue.trim()}
                  >
                    <Text style={styles.saveLocationText}>
                      {isSaving ? '⏳ Saving...' : '💾 Save'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {customOption && customValue && (
              <View style={[
                styles.currentStatusContainer,
                customOption === 'Dead' ? styles.deadStatusContainer : styles.locationStatusContainer
              ]}>
                <View style={styles.currentStatusContent}>
                  <Text style={styles.currentStatusEmoji}>
                    {customOption === 'Migrant' && '📍'}
                    {customOption === 'Out Of Town' && '🌍'}
                    {customOption === 'Dead' && '💀'}
                  </Text>
                  <View style={styles.currentStatusInfo}>
                    <View style={styles.currentStatusHeader}>
                      <Text style={styles.currentStatusLabel}>Current Status:</Text>
                      <View style={[
                        styles.statusBadge,
                        customOption === 'Dead' ? styles.deadBadge : styles.locationBadge
                      ]}>
                        <Text style={styles.statusBadgeText}>{customOption}</Text>
                      </View>
                    </View>
                    
                    {(customOption === 'Migrant' || customOption === 'Out Of Town') && (
                      <View style={styles.locationInfo}>
                        <Text style={styles.locationLabel}>📍 Location:</Text>
                        <Text style={styles.locationValue}>{customValue}</Text>
                      </View>
                    )}
                    
                    {customOption === 'Dead' && (
                      <View style={styles.locationInfo}>
                        <Text style={styles.locationValue}>Status: {customValue}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsCard}>
            <Text style={styles.cardTitle}>🎯 Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleAction('Call')}
              >
                <Text style={styles.actionIcon}>📞</Text>
                <Text style={styles.actionText}>Call Voter</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleAction('WhatsApp')}
              >
                <Text style={styles.whatsappIcon}>�</Text>
                <Text style={styles.actionText}>WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleAction('Location')}
              >
                <Text style={styles.actionIcon}>📍</Text>
                <Text style={styles.actionText}>Location</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleAction('Family Members')}
              >
                <Text style={styles.actionIcon}>👥</Text>
                <Text style={styles.actionText}>Family</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Set Status */}
          <View style={styles.setStatusCard}>
            <Text style={styles.cardTitle}>🎨 Set Status</Text>
            <TouchableOpacity
              style={styles.colorSelector}
              onPress={() => setShowColorModal(true)}
            >
              <View style={[styles.selectedColorCircle, { backgroundColor: statusColor }]} />
              <Text style={styles.colorSelectorText}>
                {statusColor === '#28a745' ? 'Favorite' : 
                 statusColor === '#ffc107' ? 'Doubtful' : 
                 statusColor === '#dc3545' ? 'Opposite' : 'Select Status'}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveAndRedirectButton, styles.enabledSaveButton]}
            onPress={handleSaveAndRedirect}
          >
            <Text style={[styles.saveAndRedirectText, styles.enabledSaveText]}>
              Save & Continue
            </Text>
          </TouchableOpacity>

          <BackToDashboard navigation={navigation} />
        </View>
      </ScrollView>

      {/* Color Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showColorModal}
        onRequestClose={() => setShowColorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.colorModalContainer}>
            <View style={styles.colorModalHeader}>
              <Text style={styles.colorModalTitle}>Set Status Color</Text>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setShowColorModal(false)}
              >
                <Text style={styles.closeModalText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.colorOptions}>
              <TouchableOpacity
                style={styles.colorOption}
                onPress={() => handleColorChange('#28a745')}
              >
                <View style={[styles.colorCircle, { backgroundColor: '#28a745' }]} />
                <Text style={styles.colorLabel}>Favorite</Text>
                {statusColor === '#28a745' && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.colorOption}
                onPress={() => handleColorChange('#ffc107')}
              >
                <View style={[styles.colorCircle, { backgroundColor: '#ffc107' }]} />
                <Text style={styles.colorLabel}>Doubtful</Text>
                {statusColor === '#ffc107' && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.colorOption}
                onPress={() => handleColorChange('#dc3545')}
              >
                <View style={[styles.colorCircle, { backgroundColor: '#dc3545' }]} />
                <Text style={styles.colorLabel}>Opposite</Text>
                {statusColor === '#dc3545' && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  scrollView: {
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
    marginTop: 50,
  },
  
  // Welcome Section
  welcomeSection: {
    backgroundColor: '#007AFF',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  welcomeEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },

  // Content Container
  contentContainer: {
    padding: 15,
  },

  // Header Card
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerInfo: {
    flex: 1,
  },
  voterName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  voterId: {
    fontSize: 14,
    color: '#666',
  },
  statusCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  // Info Grid
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    width: '38%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  genderCard: {
    backgroundColor: '#f093fb',
    minWidth: '30%',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  ageCard: {
    backgroundColor: '#4facfe',
    minWidth: '30%',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
    opacity: 0.9,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Card Title
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },

  // Booth Card
  boothCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  boothGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  boothItem: {
    alignItems: 'center',
  },
  boothLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  boothValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addressContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  addressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  addressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Mobile Card
  mobileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  mobileDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mobileNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  mobileNumberPlaceholder: {
    color: '#999',
    fontStyle: 'italic',
    fontWeight: 'normal',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  mobileEdit: {
    alignItems: 'center',
  },
  mobileInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: 200,
    textAlign: 'center',
    marginBottom: 15,
  },
  mobileInputError: {
    borderColor: '#dc3545',
  },
  mobileButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorMessage: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },

  // Address Card
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  // Custom Status Card
  customStatusCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  customStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  editStatusButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editStatusText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  statusButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  clearStatusButton: {
    backgroundColor: '#ffe6e6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  clearStatusText: {
    color: '#d63384',
    fontSize: 12,
    fontWeight: '500',
  },
  statusOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
    minWidth: '30%',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  migrantOption: {
    backgroundColor: '#f093fb',
  },
  outOfTownOption: {
    backgroundColor: '#4facfe',
  },
  deadOption: {
    backgroundColor: '#fa709a',
  },
  selectedOption: {
    backgroundColor: '#e8f2ff',
    borderColor: '#007AFF',
  },
  statusEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  statusText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  selectedText: {
    color: '#007AFF',
  },
  selectedStatus: {
    backgroundColor: '#e8f2ff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedStatusEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
  selectedStatusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },

  // Save Message
  saveMessageContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  successMessage: {
    backgroundColor: '#d4edda',
  },
  errorMessageContainer: {
    backgroundColor: '#f8d7da',
  },
  saveMessageText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Input Container
  inputContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  locationInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  saveLocationButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#adb5bd',
  },
  saveLocationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Current Status Container
  currentStatusContainer: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  deadStatusContainer: {
    backgroundColor: '#f8d7da',
  },
  locationStatusContainer: {
    backgroundColor: '#d1ecf1',
  },
  currentStatusContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  currentStatusEmoji: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  currentStatusInfo: {
    flex: 1,
  },
  currentStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentStatusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  deadBadge: {
    backgroundColor: '#dc3545',
  },
  locationBadge: {
    backgroundColor: '#17a2b8',
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  locationInfo: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    borderRadius: 8,
  },
  locationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  locationValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#495057',
    marginTop: 4,
  },

  // Actions Card
  actionsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    minWidth: '22%',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  whatsappIcon: {
    fontSize: 24,
    marginBottom: 8,
    color: '#25D366', // WhatsApp green color
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },

  // Set Status Card
  setStatusCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  colorSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  selectedColorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  colorSelectorText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#666',
  },

  // Save Button
  saveAndRedirectButton: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  enabledSaveButton: {
    backgroundColor: '#007AFF',
  },
  disabledSaveButton: {
    backgroundColor: '#e9ecef',
  },
  saveAndRedirectText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  enabledSaveText: {
    color: '#fff',
  },
  disabledSaveText: {
    color: '#6c757d',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorModalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width * 0.9,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  colorModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  colorModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeModalButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModalText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  colorOptions: {
    padding: 20,
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  colorLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  checkmark: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});