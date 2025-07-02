import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏥 Welcome to Health Friends!</Text>
      <Button title="📓 Journal" onPress={() => navigation.navigate('Journal')} />
      <Button title="⚠️ Mood Tracker" onPress={() => navigation.navigate('Mood Tracker')} />
      <Button title="⏰ Reminders" onPress={() => navigation.navigate('Reminders')} />
      <Button title="🤖 AI Chatbot" onPress={() => navigation.navigate('Chatbot')} />
      <Button title="🎙 Voice Journal" onPress={() => navigation.navigate('Voice Journal')} />
      <View style={styles.spacer} />
      <Button title="🚪 Logout" color="red" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  spacer: { height: 20 }
});
