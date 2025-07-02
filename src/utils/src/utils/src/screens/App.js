import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/utils/firebase';

import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import MoodTrackerScreen from './src/screens/MoodTrackerScreen';
import ReminderScreen from './src/screens/ReminderScreen';
import ChatbotScreen from './src/screens/ChatbotScreen';
import VoiceJournalScreen from './src/screens/VoiceJournalScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) return null; // You can return loading indicator

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Journal" component={JournalScreen} />
            <Stack.Screen name="Mood Tracker" component={MoodTrackerScreen} />
            <Stack.Screen name="Reminders" component={ReminderScreen} />
            <Stack.Screen name="Chatbot" component={ChatbotScreen} />
            <Stack.Screen name="Voice Journal" component={VoiceJournalScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
