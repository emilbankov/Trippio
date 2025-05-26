import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Colors from '@/constants/Colors';
import { questions } from '../../../constants/constants';

const QuestionsView: React.FC<QuestionsViewProps> = ({
  currentQuestionIndex,
  answers,
  onInputChange,
  onNextQuestion,
  datePickerVisible,
  showDatePicker,
  hideDatePicker,
  handleConfirm,
  selectedDate
}) => {
  const renderInputField = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const value = answers[currentQuestionIndex];

    return (
      <View style={styles.inputContainer}>
        {currentQuestion.type === 'text' && (
          <TextInput
            style={styles.input}
            onChangeText={onInputChange}
            value={value}
            placeholder={currentQuestion.placeholder}
            placeholderTextColor="#aaa"
          />
        )}
        {currentQuestion.type === 'textarea' && (
          <TextInput
            style={styles.textarea}
            onChangeText={onInputChange}
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
                onPress={() => onInputChange(option)}
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
    <>
      <View style={styles.topRow}>
        <Image
          source={require('../../../assets/images/bot.png')}
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
              strokeWidth={2}
            />
          </Svg>
          <View style={styles.ellipseTextContainer}>
            <Text style={styles.ellipseText}>{questions[currentQuestionIndex].value}</Text>
          </View>
        </View>
      </View>
      <View style={styles.box}>
        {renderInputField()}
        <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={selectedDate || new Date()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  box: {
    backgroundColor: Colors.secondary,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
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

export default QuestionsView; 