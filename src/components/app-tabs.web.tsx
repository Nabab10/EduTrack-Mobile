import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Image, useColorScheme, View } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#888888',
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="historique/index"
        options={{
          title: 'Historique',
          tabBarIcon: ({ color }) => (
            <Ionicons name="time-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="annonce/index"
        options={{
          title: 'Annonces',
          tabBarIcon: ({ color }) => (
            <Ionicons name="megaphone-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="edutrack/index"
        options={{
          title: 'EduTrack',
          tabBarIcon: () => (
            <View
              style={{
                position: 'absolute',
                top: -26,
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: '#1a5276',
                borderWidth: 3,
                borderColor: '#1a1a2e',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 8,
              }}
            >
              <Image
                source={require('@/assets/images/logo/log-e.png')}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bibliotheque/index"
        options={{
          title: 'Bibliothèque',
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil/index"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
