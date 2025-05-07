// client/app/(tabs)/Plan.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

const questions = [
  { value: "Where do you want to go?", placeholder: "e.g., Barcelona", type: "text" },
  { value: "When are you planning your trip?", placeholder: "Select start date", type: "date" },
  { value: "When is your trip ending?", placeholder: "Select end date", type: "date" },
  { value: "What's your budget?", placeholder: "e.g., $1500", type: "text" },
  { value: "What kind of trip is it?", placeholder: "e.g., Adventure", type: "text" },
  { value: "What are you into?", placeholder: "e.g., Food, History", type: "textarea" },
  { value: "Do you want flights included?", placeholder: "e.g., Yes/No", type: "radio" },
  { value: "Do you need a hotel?", placeholder: "e.g., Yes/No", type: "radio" },
  { value: "Interested in tours and local experiences?", placeholder: "e.g., Yes/No", type: "radio" }
];

interface SpeechBubbleProps {
  text: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text }) => (
  <View style={styles.speechBubble}>
    <Text style={styles.bubbleText}>{text}</Text>
  </View>
);

const Plan: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentQuestionIndex(0);
      return () => {
        setAnswers(Array(questions.length).fill(''));
        setSelectedStartDate(null);
        setSelectedEndDate(null);
      };
    }, [])
  );

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

  const handleConfirm = (event: any, date: Date | undefined) => {
    if (date) {
      const isoDate = date.toISOString().split('T')[0];
      if (currentQuestionIndex === 1) {
        setSelectedStartDate(date);
        setSelectedEndDate(date);
        handleInputChange(isoDate);
      } else if (currentQuestionIndex === 2) {
        setSelectedEndDate(date);
        handleInputChange(isoDate);
      }
    }
    hideDatePicker();
  };

  const renderInputField = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const value = answers[currentQuestionIndex];

    switch (currentQuestion.type) {
      case 'text':
        return (
          <TextInput
            style={styles.input}
            onChangeText={handleInputChange}
            value={value}
            placeholder={currentQuestion.placeholder}
            placeholderTextColor="#aaa"
          />
        );
      case 'textarea':
        return (
          <TextInput
            style={styles.textarea}
            onChangeText={handleInputChange}
            value={value}
            placeholder={currentQuestion.placeholder}
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
          />
        );
      case 'date':
        return (
          <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
            <Text style={{ color: value ? Colors.text : '#aaa' }}>
              {value || currentQuestion.placeholder}
            </Text>
          </TouchableOpacity>
        );
      case 'radio':
        return (
          <View style={styles.radioContainer}>
            {['Yes', 'No'].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => handleInputChange(option)}
                style={[
                  styles.radioOption,
                  value === option && styles.radioSelected,
                ]}
              >
                <Text
                  style={[
                    styles.radioText,
                    value === option && styles.radioTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {isPreview ? (
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Your Answers:</Text>
            {questions.map((question, index) => (
              <View key={index} style={styles.answerContainer}>
                <Text style={styles.questionText}>{question.value}</Text>
                <Text style={styles.answerText}>{answers[index]}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setIsPreview(false);
                setCurrentQuestionIndex(0);
                setAnswers(Array(questions.length).fill(''));
                setSelectedStartDate(null);
                setSelectedEndDate(null);
              }}
            >
              <Text style={styles.backButtonText}>Back to questions</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Image
              source={require('../../assets/images/bot-speech.png')}
              style={styles.botImage}
            />
            <SpeechBubble text={questions[currentQuestionIndex].value} />
            <View style={styles.box}>
              {renderInputField()}
              <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                <Text style={styles.buttonText}>→</Text>
              </TouchableOpacity>
            </View>
            {datePickerVisible && (
              <DateTimePicker
                value={
                  currentQuestionIndex === 1
                    ? selectedStartDate || new Date()
                    : selectedEndDate || new Date()
                }
                mode="date"
                display="default"
                onChange={handleConfirm}
              />
            )}
          </>
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
  input: {
    height: 40,
    borderColor: Colors.text,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    color: Colors.text,
  },
  textarea: {
    height: 80,
    borderColor: Colors.text,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingTop: 10,
    borderRadius: 10,
    color: Colors.text,
    textAlignVertical: 'top',
  },
  dateInput: {
    height: 40,
    borderColor: Colors.text,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    justifyContent: 'center',
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
  box: {
    backgroundColor: Colors.secondary,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  botImage: {
    position: 'absolute',
    top: "17.9%",
    left: '10%',
    transform: [{ translateX: -50 }],
    width: 400,
    height: 200,
    zIndex: 1,
  },
  speechBubble: {
    position: 'absolute',
    top: "27%",
    left: '45%',
    borderRadius: 10,
    padding: 10,
    maxWidth: '55%',
    zIndex: 1,
  },
  bubbleText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  radioOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.text,
    backgroundColor: 'transparent',
  },
  radioSelected: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  radioText: {
    fontSize: 16,
    color: Colors.text,
  },
  radioTextSelected: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
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
  }
});

export default Plan;
