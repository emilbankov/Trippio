import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import Header from '../components/Header';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const handleProfilePress = () => {
    console.log('Profile picture pressed');
  };

  return (
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
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors.text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="MyTrips"
        options={{
          header: () => <Header title="Trippio" onProfilePress={handleProfilePress} />,
          tabBarIcon: ({ color }) => <FontAwesome name="suitcase" size={20} color={color} />,
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
  );
}