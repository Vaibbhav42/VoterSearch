import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { VOTER_DATASETS } from '../data/voters';
import BackToDashboard from '../components/BackToDashboard';

const { width } = Dimensions.get('window');

const SearchVoters = ({ selectedDataset, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allVoters, setAllVoters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Load voters data when component mounts or dataset changes
    setIsLoading(true);
    setTimeout(() => {
      const voters = VOTER_DATASETS[selectedDataset] || VOTER_DATASETS[101] || [];
      setAllVoters(voters);
      setSearchResults(voters); // Show all voters by default
      setSearchQuery('');
      setIsLoading(false);
    }, 500);
  }, [selectedDataset]);

  // Auto-search function that triggers on text change
  const handleSearchTextChange = (text) => {
    setSearchQuery(text);
    setIsSearching(true);
    
    // Debounce search for better performance
    setTimeout(() => {
      if (!text.trim()) {
        // If search is empty, show all voters
        setSearchResults(allVoters);
        setIsSearching(false);
        return;
      }

      // Perform automatic search
      const query = text.toLowerCase().trim();
      const filtered = allVoters.filter(voter => 
        voter.name.toLowerCase().includes(query) ||
        voter.voterId.toLowerCase().includes(query) ||
        voter.id.toLowerCase().includes(query) ||
        (voter.mobile && voter.mobile.includes(query)) ||
        voter.address.toLowerCase().includes(query) ||
        voter.boothNo.toLowerCase().includes(query) ||
        voter.gender.toLowerCase().includes(query)
      );

      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(allVoters); // Show all voters when clearing search
  };

  const viewVoterDetails = (voter) => {
    navigation.navigate('VoterDetail', { id: voter.id, voter: voter });
  };

  const renderVoterItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={[styles.voterCard, { 
          transform: [{ scale: 1 }],
          opacity: 1,
        }]} 
        onPress={() => viewVoterDetails(item)}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.voterImage}
                onError={() => console.log('Image load error for:', item.name)}
              />
            </View>
            <View style={styles.voterMainInfo}>
              <Text style={styles.voterName} ellipsizeMode="tail">
                {item.name}
              </Text>
              <View style={styles.mobileContainer}>
                <Text style={styles.mobileIcon}>📱</Text>
                <Text style={styles.mobileText}>{item.mobile}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      {/* Gradient Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerGradient} />
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={styles.titleSection}>          
              <View style={styles.voterCountBadge}>
                <Text style={styles.voterCountText}>{allVoters.length} voters</Text>
              </View>
            </View>
            <View style={styles.backButtonContainer}>
              <BackToDashboard navigation={navigation} />
            </View>
          </View>
        </View>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <View style={styles.searchIconContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, ID, mobile, address, booth..."
            placeholderTextColor="#AAB7C4"
            value={searchQuery}
            onChangeText={handleSearchTextChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={clearSearch}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {isSearching && (
          <View style={styles.searchingIndicator}>
            <ActivityIndicator size="small" color="#4A90E2" />
            <Text style={styles.searchingText}>Searching...</Text>
          </View>
        )}
      </View>

      {/* Results Section */}
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <View style={styles.resultsHeaderLeft}>
            <View style={styles.titleAndCountRow}>
              <Text style={styles.resultsTitle}>
                {searchQuery ? '🎯 Search Results' : '👥 All Voters'}
              </Text>
              <View style={styles.resultsCountContainer}>
                <Text style={styles.resultsCount}>
                  {searchResults.length} found
                </Text>
              </View>
            </View>
          </View>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.loadingText}>Loading voters...</Text>
          </View>
        ) : searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            renderItem={renderVoterItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsEmoji}>🔍</Text>
            <Text style={styles.noResultsTitle}>
              {searchQuery ? 'No Results Found' : 'No Voters Available'}
            </Text>
            <Text style={styles.noResultsText}>
              {searchQuery 
                ? `No voters match "${searchQuery}". Try a different search term.`
                : 'No voter data available for this dataset.'
              }
            </Text>
            {searchQuery && (
              <TouchableOpacity style={styles.clearSearchButton} onPress={clearSearch}>
                <Text style={styles.clearSearchButtonText}>Clear Search</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
  },
  
  // Header Styles
  headerContainer: {
    position: 'relative',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#4A90E2',
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    paddingRight: 15,
  },
  voterCountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  voterCountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  backButtonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  // Search Styles
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E8F0FE',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  searchIconContainer: {
    marginRight: 12,
  },
  searchIcon: {
    fontSize: 20,
    color: '#4A90E2',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingVertical: 10,
  },
  searchingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },

  // Results Styles
  resultsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F7',
  },
  resultsHeaderLeft: {
    flex: 1,
  },
  titleAndCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 0,
  },
  resultsCountContainer: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  resultsCount: {
    fontSize: 13,
    color: '#4A90E2',
    fontWeight: '600',
  },

  // List Styles
  listContainer: {
    paddingVertical: 10,
  },
  itemSeparator: {
    height: 12,
  },
  voterCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F3F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  // Card Header
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  // Image Styles
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  voterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8FBFF',
  },

  // Voter Info
  voterMainInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  voterName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    lineHeight: 18,
    flexShrink: 1,
  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FBFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  mobileIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  mobileText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },

  // Details Section
  voterDetailsSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F3F7',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  detailIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 16,
  },
  detailContent: {
    flex: 1,
    justifyContent: 'center',
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7F8C8D',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '500',
    lineHeight: 20,
  },

  // Loading & Empty States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
    marginTop: 15,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  noResultsEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },
  clearSearchButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  clearSearchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchVoters;