// client/app/(tabs)/Plan.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '@/constants/Colors';

// Update questions to be an array of objects with value and placeholder
const questions = [
  { value: "Where do you want to go?", placeholder: "e.g., Barcelona" },
  { value: "When are you planning your trip?", placeholder: "e.g., Next summer" },
  { value: "How long will you stay?", placeholder: "e.g., 5 days" },
  { value: "What's your budget?", placeholder: "e.g., $1500" },
  { value: "What kind of trip is it?", placeholder: "e.g., Adventure" },
  { value: "What are you into?", placeholder: "e.g., Food, History" },
  { value: "Do you want flights included?", placeholder: "e.g., Yes/No" },
  { value: "Do you need a hotel?", placeholder: "e.g., Yes/No" },
  { value: "Interested in tours and local experiences?", placeholder: "e.g., Yes/No" }
];

const Plan: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));

  useFocusEffect(
    React.useCallback(() => {
      setCurrentQuestionIndex(0);
    }, [])
  );

  const handleInputChange = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = text;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    // Dismiss the keyboard
    Keyboard.dismiss();

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle submission of all answers
      console.log('User answers:', answers);
      // Send the answers to your AI service here
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.question}>{questions[currentQuestionIndex].value}</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={answers[currentQuestionIndex]}
          placeholder={questions[currentQuestionIndex].placeholder}
          placeholderTextColor={Colors.text}
        />
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.primary,
  },
  question: {
    fontSize: 20,
    marginBottom: 12,
    color: Colors.text,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: Colors.secondary,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    color: Colors.text,
  },
  nextButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: Colors.primary,
  },
});

export default Plan;