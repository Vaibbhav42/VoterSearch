import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { VOTER_DATASETS } from '../data/voters';
import BackToDashboard from '../components/BackToDashboard';

const { width: screenWidth } = Dimensions.get('window');

const ListPage = ({ selectedDataset = 101, navigation }) => {
  const VOTERS = VOTER_DATASETS[selectedDataset] || VOTER_DATASETS[101];

  // --- Helper Functions (Mock implementation for demo) ---
  const getVoterStatusColor = (id) => {
    // Mock implementation - simple logic without storage
    const index = parseInt(id.split('_')[1]) || 0;
    if (index % 5 === 0) return '#28a745'; // Green
    if (index % 5 === 1) return '#ffc107'; // Yellow
    if (index % 5 === 2) return '#dc3545'; // Red
    return null;
  };

  const getQuickBlue = (id) => {
    const index = parseInt(id.split('_')[1]) || 0;
    return index % 10 < 3;
  };

  const getCustomData = (id) => {
    const index = parseInt(id.split('_')[1]) || 0;
    if (index % 15 === 0) return { type: 'Migrant', value: 'Temporary' };
    if (index % 17 === 0) return { type: 'Out Of Town', value: 'Working' };
    return { type: null, value: '' };
  };

  const getFoundStatus = (id) => {
    const index = parseInt(id.split('_')[1]) || 0;
    return index % 3 === 0;
  };

  // --- Counting Logic ---
  const computeAllCounts = (voters) => {
    let counts = {
      'find': 0,
      'not-find': 0,
      'green': 0,
      'yellow': 0,
      'red': 0,
      'blue': 0,
      'migrant': 0,
      'out-of-town': 0,
    };

    voters.forEach(voter => {
      // Found/Not Found
      if (getFoundStatus(voter.id)) {
        counts['find']++;
      } else {
        counts['not-find']++;
      }

      // Color status
      const statusColor = getVoterStatusColor(voter.id);
      if (statusColor === '#28a745') counts['green']++;
      else if (statusColor === '#ffc107') counts['yellow']++;
      else if (statusColor === '#dc3545') counts['red']++;

      // Quick Blue
      if (getQuickBlue(voter.id)) {
        counts['blue']++;
      }

      // Custom data
      const customData = getCustomData(voter.id);
      if (customData.type === 'Migrant') counts['migrant']++;
      if (customData.type === 'Out Of Town') counts['out-of-town']++;
    });

    return counts;
  };

  const allCounts = useMemo(() => computeAllCounts(VOTERS), [VOTERS]);

  const cards = [
    { 
      title: 'Find', 
      key: 'find', 
      icon: '🔍', 
      color: "#0d6efd", 
      count: allCounts.find,
      description: "Found voters list"
    },
    { 
      title: 'Not Find', 
      key: 'not-find', 
      icon: '🚫', 
      color: "#6c757d", 
      count: allCounts['not-find'],
      description: "Voters not found"
    },
    { 
      title: 'Favorite', 
      key: 'green', 
      icon: '💚', 
      color: "#28a745", 
      count: allCounts.green,
      description: "Favorable voters"
    },
    { 
      title: 'Doubtful', 
      key: 'yellow', 
      icon: '⚠️', 
      color: "#ffc107", 
      count: allCounts.yellow,
      description: "Undecided voters"
    },
    { 
      title: 'Opposite', 
      key: 'red', 
      icon: '⛔', 
      color: "#dc3545", 
      count: allCounts.red,
      description: "Opposition voters"
    },
    { 
      title: 'Blue', 
      key: 'blue', 
      icon: '✔️', 
      color: "#007bff", 
      count: allCounts.blue,
      description: "Quick blue voters"
    },
    { 
      title: 'Migrant', 
      key: 'migrant', 
      icon: '🚚', 
      color: "#6f42c1", 
      count: allCounts.migrant,
      description: "Migrant voters"
    },
    { 
      title: 'Out Of Town', 
      key: 'out-of-town', 
      icon: '🏘️', 
      color: "#343a40", 
      count: allCounts['out-of-town'],
      description: "Out of town voters"
    },
  ];

  const handleCardPress = (cardKey) => {
    navigation.navigate('ListBox', { box: cardKey });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#667eea" barStyle="light-content" />
      
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Back Button */}
        <View style={styles.headerSection}>
          <BackToDashboard navigation={navigation} />
        </View>

        {/* Feature Cards */}
        <View style={styles.cardsSection}>
          <View style={styles.cardGrid}>
            {cards.map((card) => (
              <TouchableOpacity
                key={card.key}
                style={[styles.modernCard]}
                onPress={() => handleCardPress(card.key)}
                activeOpacity={0.85}
              >
                <View style={[styles.cardHeader, { backgroundColor: card.color + '20' }]}>
                  <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
                    <Text style={styles.cardIcon}>{card.icon}</Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.modernCardTitle}>{card.title}</Text>
                  <Text style={styles.modernCardDescription}>{card.description}</Text>
                  <Text style={styles.cardCount}>({card.count})</Text>
                </View>

                {/* Decorative gradient overlay */}
                <View style={[styles.cardGradientOverlay, {
                  backgroundColor: card.color + '15'
                }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statHeader, { backgroundColor: '#4c51bf' + '20' }]}>
                <View style={[styles.statIconContainer, { backgroundColor: '#4c51bf' }]}>
                  <Text style={styles.statIcon}>👥</Text>
                </View>
              </View>
              <View style={styles.statBody}>
                <Text style={styles.statNumber}>{VOTERS.length.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Total Voters</Text>
              </View>
              <View style={[styles.statGradientOverlay, {
                backgroundColor: '#4c51bf' + '15'
              }]} />
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statHeader, { backgroundColor: '#c53030' + '20' }]}>
                <View style={[styles.statIconContainer, { backgroundColor: '#c53030' }]}>
                  <Text style={styles.statIcon}>📊</Text>
                </View>
              </View>
              <View style={styles.statBody}>
                <Text style={styles.statNumber}>{Math.round((allCounts.find / VOTERS.length) * 100)}%</Text>
                <Text style={styles.statLabel}>Found Rate</Text>
              </View>
              <View style={[styles.statGradientOverlay, {
                backgroundColor: '#c53030' + '15'
              }]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    alignItems: 'flex-end',
  },
  cardsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modernCard: {
    width: (screenWidth - 60) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  cardHeader: {
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  cardBody: {
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  modernCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
    textAlign: 'center',
  },
  modernCardDescription: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5568',
  },
  cardGradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (screenWidth - 60) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  statHeader: {
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  statBody: {
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  statGradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default ListPage;