import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { questions } from '../../../constants/constants';

const PreviewView: React.FC<PreviewViewProps> = ({ selectedPlan, answers, onBack }) => (
  <View style={styles.previewContainer}>
    <Text style={styles.previewTitle}>Your {selectedPlan}:</Text>
    {questions.map((question, index) => (
      <View key={index} style={styles.answerContainer}>
        <Text style={styles.questionText}>{question.value}</Text>
        <Text style={styles.answerText}>{answers[index]}</Text>
      </View>
    ))}
    <TouchableOpacity
      style={styles.backButton}
      onPress={onBack}
    >
      <Text style={styles.backButtonText}>Back to questions</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  previewContainer: {
    padding: 20,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    marginVertical: 10,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.text,
  },
  answerContainer: {
    marginBottom: 10,
  },
  questionText: {
    fontWeight: 'bold',
    color: Colors.text,
  },
  answerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: Colors.text
  },
});

export default PreviewView; 