import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { questions } from '../../../constants/constants';
import { searchCountries, searchCities } from '../../../app/services/searchService';
import CountryFlag from 'react-native-country-flag';

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
  const [countryResults, setCountryResults] = useState([]);
  const [cityResults, setCityResults] = useState([]);
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      if (currentQuestionIndex === 0 && answers[0]?.trim() && !isCountrySelected) {
        const response = await searchCountries(answers[0]);
        setCountryResults(response.countries);
      }
    };

    const fetchCities = async () => {
      if (currentQuestionIndex === 1 && answers[0]?.trim() && answers[1]?.trim() && !isCitySelected) {
        const selectedCountry = countryResults.find(country => country.name === answers[0]);
        if (selectedCountry) {
          const response = await searchCities(selectedCountry.code, answers[1]);
          setCityResults(response.cities);
        }
      }
    };

    fetchCountries();
    fetchCities();
  }, [currentQuestionIndex, answers, isCountrySelected, isCitySelected]);

  const handleInputChange = (value: string) => {
    onInputChange(value);
    if (currentQuestionIndex === 0) {
      setIsCountrySelected(false);
      if (!value.trim()) {
        setCountryResults([]);
      }
    } else if (currentQuestionIndex === 1) {
      setIsCitySelected(false);
      if (!value.trim()) {
        setCityResults([]);
      }
    }
  };

  const renderInputField = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const value = answers[currentQuestionIndex];

    return (
      <View style={styles.inputContainer}>
        {currentQuestion.type === 'text' && (
          <>
            <TextInput
              style={styles.input}
              onChangeText={handleInputChange}
              value={value}
              placeholder={currentQuestion.placeholder}
              placeholderTextColor="#aaa"
            />
            {currentQuestionIndex === 0 && countryResults.length > 0 && !isCountrySelected && (
              <View style={styles.resultsBox}>
                <FlatList
                  data={countryResults}
                  keyExtractor={(item) => item.code}
                  initialNumToRender={3}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => {
                      onInputChange(item.name);
                      setCountryResults([]);
                      setIsCountrySelected(true);
                    }} style={[
                      styles.resultItem,
                      index !== countryResults.length - 1 && { borderBottomWidth: 1, borderBottomColor: Colors.text }
                    ]}>
                      <FontAwesome name="map-marker" size={20} color={Colors.text} style={styles.mapPointer} />
                      <Text style={styles.resultText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                      <CountryFlag
                        isoCode={item.code}
                        size={20}
                        style={styles.flag}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            {currentQuestionIndex === 1 && cityResults.length > 0 && !isCitySelected && (
              <View style={styles.resultsBox}>
                <FlatList
                  data={cityResults}
                  keyExtractor={(item) => item.iataCode}
                  initialNumToRender={3}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => {
                      onInputChange(item.name);
                      setCityResults([]);
                      setIsCitySelected(true);
                    }} style={[
                      styles.resultItem,
                      index !== cityResults.length - 1 && { borderBottomWidth: 1, borderBottomColor: Colors.text }
                    ]}>
                      <FontAwesome name="map-marker" size={20} color={Colors.text} style={styles.mapPointer} />
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </>
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
    position: 'relative',
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
  resultsBox: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: Colors.lightPurple,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
    maxHeight: 145,
    overflow: 'hidden',
    zIndex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  mapPointer: {
    marginRight: 10,
  },
  resultText: {
    flex: 1,
    marginRight: 10,
    color: Colors.text
  },
  flag: {
    marginLeft: 'auto',
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
    marginBottom: 120
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