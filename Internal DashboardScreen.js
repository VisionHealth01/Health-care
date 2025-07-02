import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Button, ScrollView
} from 'react-native';
import { auth } from '../utils/firebase';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export default function DashboardScreen() {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const [greeting, setGreeting] = useState('');
  const [date, setDate] = useState(moment().format('MMMM Do, YYYY'));

  useEffect(() => {
    const hour = moment().hour();
    if (hour < 12) setGreeting('Good Morning ☀️');
    else if (hour < 18) setGreeting('Good Afternoon 🌞');
    else setGreeting('Good Evening 🌙');
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{greeting}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.subtext}>Welcome back, {user?.email || 'friend'} 👋</Text>

      <View style={styles.module}>
        <Text style={styles.section}>🚀 Quick Access</Text>
        <Button title="📓 Journal Now" onPress={() => navigation.navigate('Journal')} />
        <Button title="🧘 Start Meditation" onPress={() => navigation.navigate('Meditation')} />
        <Button title="🤖 Talk to Therapist" onPress={() => navigation.navigate('Chatbot')} />
      </View>

      <View style={styles.module}>
        <Text style={styles.section}>📊 Self-Check</Text>
        <Button title="📈 Mood Graph" onPress={() => navigation.navigate('Mood')} />
        <Button title="🏆 Streaks" onPress={() => navigation.navigate('Streaks')} />
      </View>

      <View style={styles.module}>
        <Text style={styles.section}>⚙️ Settings</Text>
        <Button title="⏰ Smart Reminders" onPress={() => navigation.navigate('Reminders')} />
        <Button title="👤 Profile" onPress={() => navigation.navigate('Profile')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, backgroundColor: '#fff', flexGrow: 1 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 5 },
  date: { fontSize: 16, color: '#888' },
  subtext: { marginTop: 5, marginBottom: 30, fontSize: 16 },
  section: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  module: { marginBottom: 30 }
});
