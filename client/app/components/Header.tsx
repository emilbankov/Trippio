import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

const Header: React.FC<{ title: string; onProfilePress: () => void }> = ({ title, onProfilePress }) => {
    const insets = useSafeAreaInsets();
    
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar 
                barStyle="light-content" 
                backgroundColor={Colors.primary}
                translucent={true}
            />
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={onProfilePress}>
                    <Image
                        source={require('../../assets/images/no-image.jpg')}
                        style={styles.profilePicture}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
    },
    header: {
        height: 56,
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
});

export default Header;