import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Colors from '@/constants/Colors';

const Profile: React.FC = () => {
  // Sample user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    preferences: ['Adventure', 'Food', 'Nature'],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.preferences}>
        <Text style={styles.label}>Preferences:</Text>
        {user.preferences.map((pref, index) => (
          <Text key={index} style={styles.preferenceItem}>
            - {pref}
          </Text>
        ))}
      </View>
      <Button title="Edit Profile" onPress={() => alert('Edit Profile Pressed')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.primary,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.text,
  },
  userInfo: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.text,
  },
  preferences: {
    marginTop: 16,
  },
  preferenceItem: {
    fontSize: 16,
    color: Colors.text,
  },
});

export default Profile;
