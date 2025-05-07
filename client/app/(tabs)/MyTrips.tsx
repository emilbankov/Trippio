import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Colors from '@/constants/Colors';

const trips = [
  { id: '1', destination: 'Paris', duration: '5 days', budget: '$1500' },
  { id: '2', destination: 'Tokyo', duration: '7 days', budget: '$2000' },
  { id: '3', destination: 'New York', duration: '4 days', budget: '$1200' },
];

const MyTrips: React.FC = () => {
  const renderTripItem = ({ item }: { item: { id: string; destination: string; duration: string; budget: string } }) => (
    <View style={styles.tripItem}>
      <Text style={styles.tripTitle}>{item.destination}</Text>
      <Text style={styles.tripDetail}>Duration: {item.duration}</Text>
      <Text style={styles.tripDetail}>Budget: {item.budget}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Trips</Text>
      <FlatList
        data={trips}
        renderItem={renderTripItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.primary,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.text,
  },
  tripItem: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 8,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  tripDetail: {
    fontSize: 16,
    color: Colors.text,
  },
});

export default MyTrips;
