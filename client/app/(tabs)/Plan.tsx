// client/app/(tabs)/Plan.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Svg, { Ellipse } from 'react-native-svg';

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
  <View style={styles.speechBubbleContainer}>
    <Svg width={220} height={100}>
      <Ellipse
        cx="110"
        cy="50"
        rx="110"
        ry="50"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
    </Svg>
    <View style={styles.bubbleTextContainer}>
      <Text style={styles.bubbleText}>{text}</Text>
    </View>
  </View>
);

const Plan: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentQuestionIndex(0);
      setAnswers(Array(questions.length).fill(''));
      setSelectedDate(null);
      setDatePickerVisible(false);
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

  const renderInputField = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const value = answers[currentQuestionIndex];

    return (
      <View style={styles.inputContainer}>
        {currentQuestion.type === 'text' && (
          <TextInput
            style={styles.input}
            onChangeText={handleInputChange}
            value={value}
            placeholder={currentQuestion.placeholder}
            placeholderTextColor="#aaa"
          />
        )}
        {currentQuestion.type === 'textarea' && (
          <TextInput
            style={styles.textarea}
            onChangeText={handleInputChange}
            value={value}
            placeholder={currentQuestion.placeholder}
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
          />
        )}
        {currentQuestion.type === 'date' && (
          <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
            <Text style={{ color: value ? Colors.text : '#aaa' }}>
              {value || currentQuestion.placeholder}
            </Text>
          </TouchableOpacity>
        )}
        {currentQuestion.type === 'radio' && (
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
        )}
      </View>
    );
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
                setSelectedDate(null);
              }}
            >
              <Text style={styles.backButtonText}>Back to questions</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.topRow}>
              <Image
                source={require('../../assets/images/bot.png')}
                style={styles.botImage}
                resizeMode="contain"
              />
              <View style={styles.ellipseContainer}>
                <Svg width={220} height={100} viewBox="0 0 220 100">
                  <Ellipse
                    cx={110}
                    cy={50}
                    rx={110}
                    ry={50}
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                  />
                </Svg>
                <View style={styles.ellipseTextContainer}>
                  <Text style={styles.ellipseText}>{questions[currentQuestionIndex].value}</Text>
                </View>
              </View>
            </View>
            <View style={styles.box}>
              {renderInputField()}
              <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                <Text style={styles.buttonText}>→</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={selectedDate || new Date()}
        />
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
  },
  botImage: {
    width: 190,
    height: 190,
    marginBottom: -25,
    zIndex: 1,
  },
  ellipseContainer: {
    marginLeft: -32,
    width: 220,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ellipseTextContainer: {
    position: 'absolute',
    width: 220,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipseText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    width: '80%',
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: "22%",
    left: '45%',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleTextContainer: {
    position: 'absolute',
    width: 200,
    padding: 10,
  },
  bubbleText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
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
  },
  inputContainer: {
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Plan;
