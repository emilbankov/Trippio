import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Colors from '@/constants/Colors';

const Header: React.FC<{ title: string; onProfilePress: () => void }> = ({ title, onProfilePress }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={onProfilePress}>
                    <Image
                        source={require('../../assets/images/no-image.jpg')}
                        style={styles.profilePicture}
                    />
                </TouchableOpacity>
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
});

export default Header;