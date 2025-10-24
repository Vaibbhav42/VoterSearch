import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { VOTER_DATASETS } from '../data/voters';
import BackToDashboard from '../components/BackToDashboard';

// Icon Components using emojis
const ChartBarIcon = ({ size = 32, color = "#007bff" }) => (
  <Text style={{ fontSize: size, color }}>📊</Text>
);
const UserFriendsIcon = ({ color = "#007bff" }) => (
  <Text style={{ fontSize: 24, color }}>👥</Text>
);
const LeafIcon = ({ color = "#28a745" }) => (
  <Text style={{ fontSize: 24, color }}>🌱</Text>
);
const PaintBrushIcon = ({ color = "#ffc107" }) => (
  <Text style={{ fontSize: 24, color }}>🎨</Text>
);
const BanIcon = ({ color = "#dc3545" }) => (
  <Text style={{ fontSize: 24, color }}>🚫</Text>
);
const RegCircleIcon = ({ color = "#00bcd4" }) => (
  <Text style={{ fontSize: 24, color }}>⭕</Text>
);

// Simple Chart Display Component
const SimpleChart = ({ data }) => {
  const maxValue = Math.max(...data.filter(d => d.name !== 'Total Voters').map(d => d.Count));
  
  return (
    <View style={styles.chartDisplay}>
      {data.filter(d => d.name !== 'Total Voters').map((item) => {
        const barWidth = maxValue > 0 ? (item.Count / maxValue) * 100 : 0;
        const percentage = data[0] ? ((item.Count / data[0].Count) * 100).toFixed(1) : 0;
        
        return (
          <View key={item.name} style={styles.chartItem}>
            <View style={styles.chartInfo}>
              <View style={styles.chartLabelRow}>
                <View style={[styles.chartColor, { backgroundColor: item.fill }]} />
                <Text style={styles.chartName}>{item.name}</Text>
                <Text style={styles.chartValue}>{item.Count}</Text>
              </View>
              <Text style={styles.chartPercentage}>{percentage}%</Text>
            </View>
            <View style={styles.chartBarContainer}>
              <View 
                style={[
                  styles.chartBar, 
                  { 
                    width: `${barWidth}%`, 
                    backgroundColor: item.fill 
                  }
                ]} 
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

// Analysis Card Component
const AnalysisCard = ({ title, count, color, icon, totalCount }) => (
  <View style={[styles.card, { borderLeftColor: color }]}>
    <View style={styles.cardContent}>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardCount}>{count}</Text>
        {title !== 'Total Voters' && (
          <Text style={styles.cardPercentage}>
            ({((count / totalCount) * 100).toFixed(1)}%)
          </Text>
        )}
      </View>
      <View style={styles.cardIcon}>
        {icon}
      </View>
    </View>
  </View>
);

const Analysis = ({ selectedDataset = 101, navigation }) => {
  const VOTERS = VOTER_DATASETS[selectedDataset] || VOTER_DATASETS[101];

  // Simple mock data generation for demonstration
  const computeStatusCounts = (voters) => {
    let counts = { total: voters.length, green: 0, yellow: 0, red: 0, blue: 0 };

    voters.forEach((v, index) => {
      const mod = index % 5;
      if (mod === 0) counts.green++;
      else if (mod === 1) counts.yellow++;
      else if (mod === 2) counts.red++;
      
      if (index % 10 < 3) counts.blue++;
    });
    
    return counts;
  };

  const counts = useMemo(() => computeStatusCounts(VOTERS), [VOTERS]);
  const winningChances = useMemo(() => {
    return counts.total === 0 ? 0 : (counts.green / counts.total) * 100;
  }, [counts]);

  // Conditional styling logic
  const isWinning = winningChances >= 50;
  const HEADER_COLOR = isWinning ? '#28a745' : '#dc3545';
  const HEADER_BG = isWinning ? '#e9f7ef' : '#f8d7da';

  // Chart data
  const chartData = [
    { name: 'Total Voters', Count: counts.total, fill: '#007bff' },
    { name: 'Favorite', Count: counts.green, fill: '#28a745' },
    { name: 'Doubtful', Count: counts.yellow, fill: '#ffc107' },
    { name: 'Opposite', Count: counts.red, fill: '#dc3545' },
    { name: 'Quick Blue', Count: counts.blue, fill: '#00bcd4' },
  ];

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

        <View style={styles.content}>
          {/* HEADER WITH CONDITIONAL STYLING */}
          <View style={styles.header}>
            <View style={[styles.winningHeader, { backgroundColor: HEADER_BG }]}>
              <ChartBarIcon size={32} color={HEADER_COLOR} />
              <View style={styles.winningContent}>
                <Text style={[styles.winningLabel, { color: HEADER_COLOR }]}>
                  Winning Chances
                </Text>
                <Text style={[styles.winningPercentage, { color: HEADER_COLOR }]}>
                  {winningChances.toFixed(2)}%
                </Text>
              </View>
            </View>
          </View>

          {/* Summary Cards */}
          <View style={styles.cardsContainer}>
        <AnalysisCard 
          title="Total Voters" 
          count={counts.total} 
          color="#007bff" 
          icon={<UserFriendsIcon color="#007bff" />} 
          totalCount={counts.total} 
        />
        <AnalysisCard 
          title="Favorite" 
          count={counts.green} 
          color="#28a745" 
          icon={<LeafIcon color="#28a745" />} 
          totalCount={counts.total} 
        />
        <AnalysisCard 
          title="Doubtful" 
          count={counts.yellow} 
          color="#ffc107" 
          icon={<PaintBrushIcon color="#ffc107" />} 
          totalCount={counts.total} 
        />
        <AnalysisCard 
          title="Opposite" 
          count={counts.red} 
          color="#dc3545" 
          icon={<BanIcon color="#dc3545" />} 
          totalCount={counts.total} 
        />
        <AnalysisCard 
          title="Blue Marked" 
          count={counts.blue} 
          color="#00bcd4" 
          icon={<RegCircleIcon color="#00bcd4" />} 
          totalCount={counts.total} 
        />
      </View>

          {/* Statistics Chart */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>
              Voter Categorization Chart
            </Text>
            <SimpleChart data={chartData} />
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
  content: {
    padding: 15,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 25,
  },
  winningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 6,
  },
  winningContent: {
    marginLeft: 16,
  },
  winningLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  winningPercentage: {
    fontSize: 36,
    fontWeight: '900',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 6,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 8,
  },
  cardCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardPercentage: {
    fontSize: 12,
    color: '#999',
  },
  cardIcon: {
    opacity: 0.7,
  },
  chartSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 6,
    marginBottom: 25,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 25,
    textAlign: 'center',
  },
  chartDisplay: {
    padding: 10,
  },
  chartItem: {
    marginBottom: 20,
  },
  chartInfo: {
    marginBottom: 8,
  },
  chartLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  chartColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  chartName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3748',
  },
  chartValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginRight: 8,
  },
  chartPercentage: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'right',
  },
  chartBarContainer: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  chartBar: {
    height: '100%',
    borderRadius: 4,
    minWidth: 2,
  },
});

export default Analysis;