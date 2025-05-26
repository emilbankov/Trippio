import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import Colors from '@/constants/Colors';
import { planOptions } from '../../../constants/constants';

const PlanSelection: React.FC<PlanSelectionProps> = ({ onSelectPlan }) => (
  <View style={styles.planSelectionContainer}>
    <Text style={styles.planSelectionTitle}>Choose your planning style</Text>
    {planOptions.map((plan, index) => {
      const animatedScale = useRef(new Animated.Value(1)).current;

      const handlePressIn = () => {
        Animated.spring(animatedScale, {
          toValue: 0.98,
          useNativeDriver: true,
        }).start();
      };

      const handlePressOut = () => {
        Animated.spring(animatedScale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      };

      return (
        <Pressable
          key={index}
          onPress={() => onSelectPlan(plan.title)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.planOptionWrapper}
        >
          {({ pressed }) => (
            <Animated.View
              style={{
                transform: [{ scale: animatedScale }],
                ...styles.planOptionAnimatedContent,
              }}
            >
              <Text style={styles.planOptionTitle}>{plan.title}</Text>
            </Animated.View>
          )}
        </Pressable>
      );
    })}
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
  planOptionWrapper: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  planOptionAnimatedContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
  },
  planOptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: "center",
  },
  planOptionDescription: {
    fontSize: 16,
    color: Colors.text,
    opacity: 0.8,
  },
});

export default PlanSelection; 