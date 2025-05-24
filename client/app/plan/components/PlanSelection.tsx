import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { PlanSelectionProps } from '../types';
import { planOptions } from '../constants';

const PlanSelection: React.FC<PlanSelectionProps> = ({ onSelectPlan }) => (
  <View style={styles.planSelectionContainer}>
    <Text style={styles.planSelectionTitle}>Choose your planning style</Text>
    {planOptions.map((plan, index) => (
      <TouchableOpacity
        key={index}
        style={styles.planOption}
        onPress={() => onSelectPlan(plan.title)}
      >
        <Text style={styles.planOptionTitle}>{plan.title}</Text>
        <Text style={styles.planOptionDescription}>{plan.description}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  planSelectionContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  planSelectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  planOption: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  planOptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  planOptionDescription: {
    fontSize: 16,
    color: Colors.text,
    opacity: 0.8,
  },
});

export default PlanSelection; 