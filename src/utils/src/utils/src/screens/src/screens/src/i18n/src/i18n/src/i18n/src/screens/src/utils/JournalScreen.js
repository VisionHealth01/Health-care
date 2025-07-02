// src/screens/JournalScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { getMoodFromText } from '../utils/ai';

export default function JournalScreen() {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeMood = async () => {
    if (!entry.trim()) {
      Alert.alert('Please write something.');
      return;
    }

    setLoading(true);
    const result = await getMoodFromText(entry);
    setMood(result);
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📓 Daily Journal</Text>
      <TextInput
        multiline
        style={styles.textArea}
        placeholder="How are you feeling today?"
        value={entry}
        onChangeText={setEntry}
      />
      <Button title="🧠 Analyze Mood" onPress={analyzeMood} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      {mood && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>🪞 AI Mood Insight:</Text>
          <Text style={styles.moodText}>{mood}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  textArea: {
    height: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    textAlignVertical: 'top'
  },
  resultBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginTop: 20,
    borderRadius: 10
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  moodText: {
    marginTop: 10,
    fontSize: 16
  }
});
