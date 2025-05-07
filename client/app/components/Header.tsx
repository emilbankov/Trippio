import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Animated, TouchableWithoutFeedback } from 'react-native';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Header: React.FC<{ title: string; onProfilePress: () => void }> = ({ title, onProfilePress }) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value

    const handleProfilePress = () => {
        if (popupVisible) {
            // Fade out
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setPopupVisible(false)); // Set visibility to false after fade out
        } else {
            setPopupVisible(true); // Show the popup
            // Fade in
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleClosePopup = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setPopupVisible(false)); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={handleProfilePress}>
                    <Image
                        source={require('../../assets/images/no-image.jpg')}
                        style={styles.profilePicture}
                    />
                </TouchableOpacity>

                {popupVisible && (
                    <TouchableWithoutFeedback onPress={handleClosePopup}>
                        <Animated.View style={[styles.popup, { opacity: fadeAnim }]}>
                            <View style={styles.userInfo}>
                                <Image
                                    source={require('../../assets/images/no-image.jpg')}
                                    style={styles.popupProfilePicture}
                                />
                                <View style={styles.userDetails}>
                                    <Text style={styles.userName}>Jon Doe</Text>
                                    <Text style={styles.userEmail}>john.doe@example.com</Text>
                                </View>
                            </View>
                            <View style={styles.touchableOpacity}>
                                <TouchableOpacity onPress={() => { handleClosePopup(); }}>
                                    <Text style={styles.popupButton}>Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { handleClosePopup(); }}>
                                    <Text style={styles.popupButton}>Settings</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.logoutBox} onPress={() => { handleClosePopup(); }}>
                                    <View style={styles.logoutContent}>
                                        <FontAwesome name="sign-out" size={18} color={"red"} />
                                        <Text style={styles.logoutButton}>Log out</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: Colors.primary,
    },
    header: {
        height: "auto",
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        color: Colors.text,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    popup: {
        position: 'absolute',
        right: 16,
        top: 60,
        width: '100%',
        padding: 20,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        elevation: 5,
        shadowColor: Colors.lightPurple,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        textAlign: "center",
        alignItems: "center",
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        alignSelf: "flex-start",
    },
    popupProfilePicture: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userDetails: {
        flexDirection: 'column',
    },
    userName: {
        fontSize: 16,
        color: Colors.text,
    },
    userEmail: {
        fontSize: 14,
        color: Colors.text,
    },
    popupButton: {
        fontSize: 16,
        backgroundColor: Colors.secondary,
        paddingVertical: 10,
        borderRadius: 10,
        width: "100%",
        color: Colors.text,
        textAlign: "center",
        marginBottom: 10,
    },
    touchableOpacity: {
        width: "100%",
    },
    logoutBox: {
        width: "100%",
    },
    logoutContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    logoutButton: {
        fontSize: 18,
        marginLeft: 4,
        color: "red",
    },
});

export default Header;
