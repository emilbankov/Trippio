import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { InitialViewProps } from '../types';

const InitialView: React.FC<InitialViewProps> = ({ onStartPlanning }) => (
  <View style={styles.initialContainer}>
    <TouchableOpacity 
      style={styles.initialButton}
      onPress={onStartPlanning}
    >
      <Text style={styles.initialButtonText}>Plan your next trip</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialButton: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  initialButtonText: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default InitialView; 