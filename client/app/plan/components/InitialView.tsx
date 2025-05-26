import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Animated } from 'react-native';
import Colors from '@/constants/Colors';

const InitialView: React.FC<InitialViewProps> = ({ onStartPlanning }) => {
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
    <View style={styles.initialContainer}>
      <View style={styles.imageWrapper} pointerEvents="none">
        <Image
          source={require('../../../assets/images/bot-sign.png')}
          style={styles.botImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable
          onPress={onStartPlanning}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={({ pressed }) => [
            styles.initialButton,
          ]}
        >
          {({ pressed }) => (
            <Animated.View
               style={{
                 transform: [{ scale: animatedScale }],
                 ...styles.animatedButtonContent
               }}
            >
              <Text style={styles.initialButtonText}>Plan your next trip</Text>
            </Animated.View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botImage: {
    width: 450,
    height: 450,
    marginBottom: -74,
    marginRight: 10,
  },
  imageWrapper: {
    zIndex:1
  },
  buttonWrapper: {
    backgroundColor: 'black',
    borderRadius: 25,
    padding: 6,
    alignSelf: 'center',
  },
  initialButton: {
    
  },
  animatedButtonContent: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 23,
  },
  initialButtonText: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default InitialView; 