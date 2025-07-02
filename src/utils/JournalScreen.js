import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../utils/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function JournalScreen() {
  const [journal, setJournal] = useState('');
  const [mood, setMood] = useState('');

  const analyzeMood = () => {
    const lower = journal.toLowerCase();
    if (lower.includes('happy') || lower.includes('calm') || lower.includes('excited')) {
      setMood('😊 Positive');
    } else if (lower.includes('sad') || lower.includes('anxious') || lower.includes('angry')) {
      setMood('😟 Negative');
    } else if (lower.trim() === '') {
      setMood('⚠️ Please write something first.');
    } else {
      setMood('😐 Neutral');
    }
  };

  const saveEntry = async () => {
    if (!journal.trim()) {
      Alert.alert('Write something first!');
      return;
    }

    try {
      await addDoc(collection(db, 'journals'), {
        text: journal,
        mood: mood || 'Unknown',
        createdAt: Timestamp.now()
      });
      Alert.alert('Journal saved ✅');
      setJournal('');
      setMood('');
    } catch (error) {
      console.error('Error saving journal:', error);
      Alert.alert('Failed to save.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📓 Daily Journal</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your thoughts here..."
        value={journal}
        onChangeText={setJournal}
      />
      <Button title="Analyze Mood" onPress={analyzeMood} />
      {mood ? <Text style={styles.mood}>Mood: {mood}</Text> : null}
      <Button title="Save Entry to Cloud ☁️" onPress={saveEntry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top'
  },
  mood: { marginTop: 15, fontSize: 18, fontWeight: '600' }
});
