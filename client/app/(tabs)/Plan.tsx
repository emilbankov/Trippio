// client/app/(tabs)/Plan.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { questions } from '../plan/constants';
import InitialView from '../plan/components/InitialView';
import PlanSelection from '../plan/components/PlanSelection';
import QuestionsView from '../plan/components/QuestionsView';
import PreviewView from '../plan/components/PreviewView';

const Plan: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [currentStep, setCurrentStep] = useState<'initial' | 'plan-selection' | 'questions'>('initial');
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  useFocusEffect(
    React.useCallback(() => {
      setCurrentQuestionIndex(0);
      setAnswers(Array(questions.length).fill(''));
      setSelectedDate(null);
      setDatePickerVisible(false);
      setCurrentStep('initial');
      setSelectedPlan('');
    }, [])
  );

  const handleStartPlanning = () => {
    setCurrentStep('plan-selection');
  };

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    setCurrentStep('questions');
  };

  const handleInputChange = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = text;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    Keyboard.dismiss();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsPreview(true);
    }
  };

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleConfirm = (date: Date) => {
    const isoDate = date.toISOString().split('T')[0];
    if (currentQuestionIndex === 1) {
      setSelectedDate(date);
      handleInputChange(isoDate);
    } else if (currentQuestionIndex === 2) {
      setSelectedDate(date);
      handleInputChange(isoDate);
    }
    hideDatePicker();
  };

  const handleBackToQuestions = () => {
    setIsPreview(false);
    setCurrentQuestionIndex(0);
    setAnswers(Array(questions.length).fill(''));
    setSelectedDate(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {currentStep === 'initial' && (
          <InitialView onStartPlanning={handleStartPlanning} />
        )}
        {currentStep === 'plan-selection' && (
          <PlanSelection onSelectPlan={handlePlanSelection} />
        )}
        {currentStep === 'questions' && (
          isPreview ? (
            <PreviewView
              selectedPlan={selectedPlan}
              answers={answers}
              onBack={handleBackToQuestions}
            />
          ) : (
            <QuestionsView
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              onInputChange={handleInputChange}
              onNextQuestion={handleNextQuestion}
              datePickerVisible={datePickerVisible}
              showDatePicker={showDatePicker}
              hideDatePicker={hideDatePicker}
              handleConfirm={handleConfirm}
              selectedDate={selectedDate}
            />
          )
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.primary,
  },
});

export default Plan;
