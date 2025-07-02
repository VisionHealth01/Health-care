import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { getMedicationInfoFromGPT } from '../utils/ai';

export default function MedAwarenessScreen() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const response = await getMedicationInfoFromGPT(query);
    setResult(response);
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💊 Medication Awareness</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Fluoxetine, Alprazolam"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search Medication Info" onPress={handleSearch} />
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      {result !== '' && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15
  },
  resultBox: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginTop: 20,
    borderRadius: 10
  },
  resultText: {
    fontSize: 16,
    color: '#333'
  }
});
