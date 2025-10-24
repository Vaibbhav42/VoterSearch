import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import BackToDashboard from '../components/BackToDashboard';
import { VOTER_DATASETS } from '../data/voters';

// Icon components using emojis
const PersonIcon = () => <Text style={styles.iconText}>👤</Text>;
const BuildingIcon = () => <Text style={styles.iconText}>🏢</Text>;
const VoterIdIcon = () => <Text style={styles.iconText}>💳</Text>;
const MobileIcon = () => <Text style={styles.iconText}>📞</Text>;

// Styled Input Component
const StyledInput = ({ name, value, onChange, placeholder, Icon, keyboardType = 'default' }) => (
  <View style={styles.inputContainer}>
    {Icon && <Icon />}
    <TextInput
      value={value}
      onChangeText={(text) => onChange(name, text)}
      placeholder={placeholder}
      placeholderTextColor="#999"
      style={styles.inputField}
      keyboardType={keyboardType}
      autoCapitalize="words"
      autoCorrect={false}
    />
  </View>
);

const AdvancedSearch = ({ selectedDataset = 101, navigation }) => {
  const VOTERS = VOTER_DATASETS[selectedDataset] || VOTER_DATASETS[101];
  
  const [form, setForm] = useState({
    name: '',
    surname: '',
    address: '',
    voterId: '',
    mobileNo: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleChange = (name, value) => {
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {
    // Validate if at least one field is filled
    const hasSearchCriteria = Object.values(form).some(value => value.trim() !== '');
    
    if (!hasSearchCriteria) {
      Alert.alert('Search Error', 'Please enter at least one search criteria');
      return;
    }

    // Perform advanced search
    const results = VOTERS.filter(voter => {
      const matchesName = !form.name || voter.name.toLowerCase().includes(form.name.toLowerCase());
      const matchesSurname = !form.surname || voter.name.toLowerCase().includes(form.surname.toLowerCase());
      const matchesVoterId = !form.voterId || voter.voterId.toLowerCase().includes(form.voterId.toLowerCase());
      const matchesAddress = !form.address || voter.address.toLowerCase().includes(form.address.toLowerCase());
      const matchesMobile = !form.mobileNo || (voter.mobile && voter.mobile.includes(form.mobileNo));

      return matchesName && matchesSurname && matchesVoterId && 
             matchesAddress && matchesMobile;
    });

    setSearchResults(results);
    setIsSearched(true);
  };

  const clearSearch = () => {
    setForm({
      name: '',
      surname: '',
      address: '',
      voterId: '',
      mobileNo: '',
    });
    setSearchResults([]);
    setIsSearched(false);
  };

  const renderVoterItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.voterCard}
      onPress={() => navigation.navigate('VoterDetail', { voter: item })}
    >
      <View style={styles.voterHeader}>
        <View style={styles.voterInfo}>
          <Text style={styles.voterName}>{item.name}</Text>
          <Text style={styles.voterId}>ID: {item.voterId}</Text>
          <Text style={styles.voterDetail}>
            {item.gender}, Age {item.age}
          </Text>
        </View>
      </View>
      
      <View style={styles.voterDetails}>
        <Text style={styles.detailText}>📱 {item.mobile}</Text>
        <Text style={styles.detailText}>🗳️ Booth: {item.boothNo}</Text>
        <Text style={styles.detailText} numberOfLines={2}>
          🏠 {item.address}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Simple Header with Back Button */}
      <View style={styles.header}>
        <BackToDashboard navigation={navigation} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          {/* Name */}
          <StyledInput
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            Icon={PersonIcon}
          />

          {/* Surname */}
          <StyledInput
            name="surname"
            value={form.surname}
            onChange={handleChange}
            placeholder="Surname"
            Icon={PersonIcon}
          />

          {/* Voter ID */}
          <StyledInput
            name="voterId"
            value={form.voterId}
            onChange={handleChange}
            placeholder="Voter ID"
            Icon={VoterIdIcon}
          />

          {/* Address */}
          <StyledInput
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            Icon={BuildingIcon}
          />

          {/* Mobile No */}
          <StyledInput
            name="mobileNo"
            value={form.mobileNo}
            onChange={handleChange}
            placeholder="Mobile No"
            Icon={MobileIcon}
            keyboardType="phone-pad"
          />

          {/* Search Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
              <Text style={styles.searchButtonText}>🔍 Search Voters</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <Text style={styles.clearButtonText}>🗑️ Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Results */}
        {isSearched && (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Search Results</Text>
              <Text style={styles.resultsCount}>
                {searchResults.length} voter{searchResults.length !== 1 ? 's' : ''} found
              </Text>
            </View>

            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={renderVoterItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
              />
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResults}>
                  No voters found matching your search criteria
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 20,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 8,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconText: {
    fontSize: 20,
    paddingRight: 8,
    color: '#888',
  },
  inputField: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  searchButton: {
    backgroundColor: '#00ffee',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#00ffee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 10,
  },
  voterCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  voterHeader: {
    marginBottom: 10,
  },
  voterInfo: {
    flex: 1,
  },
  voterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  voterId: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 2,
  },
  voterDetail: {
    fontSize: 14,
    color: '#666',
  },
  voterDetails: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResults: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default AdvancedSearch;