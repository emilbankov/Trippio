import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, TouchableWithoutFeedback, View, Animated, Image, Text, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';
import Header from '../components/Header';

const { width: screenWidth } = Dimensions.get('window');

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
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
            duration: 300,
            useNativeDriver: true,
        }).start(() => setPopupVisible(false));
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={handleClosePopup}>
                <View style={{ flex: 1 }}>
                    <Tabs
                        screenOptions={{
                            tabBarActiveTintColor: Colors.secondary,
                            tabBarInactiveTintColor: Colors.text,
                            headerShown: true,
                            tabBarStyle: {
                                backgroundColor: Colors.primary,
                                borderTopWidth: 0.3,
                                borderTopColor: Colors.lightPurple
                            },
                        }}>
                        <Tabs.Screen
                            name="Plan"
                            options={{
                                header: () => <Header title="Trippio" onProfilePress={handleProfilePress} />,
                                tabBarIcon: ({ color }) => <FontAwesome name="plane" size={20} color={color} />,
                            }}
                        />
                        <Tabs.Screen
                            name="MyTrips"
                            options={{
                                header: () => <Header title="Trippio" onProfilePress={handleProfilePress} />,
                                tabBarIcon: ({ color }) => <FontAwesome name="map" size={20} color={color} />,
                            }}
                        />
                        <Tabs.Screen
                            name="Profile"
                            options={{
                                header: () => <Header title="Trippio" onProfilePress={handleProfilePress} />,
                                tabBarIcon: ({ color }) => <FontAwesome name="user" size={20} color={color} />,
                            }}
                        />
                    </Tabs>

                    {popupVisible && (
                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
                            <TouchableWithoutFeedback onPress={handleClosePopup}>
                                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                            </TouchableWithoutFeedback>
                            <Animated.View style={[styles.popup, { opacity: fadeAnim, width: screenWidth - 31, zIndex: 1001 }]}>
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
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    popup: {
        position: 'absolute',
        right: 16,
        top: 100,
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