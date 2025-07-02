import React, { useState } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';

export default function MoodTrackerScreen() {
  const [moodValue, setMoodValue] = useState(5);

  const getMoodLabel = (value) => {
    if (value < 3) return '😢 Sad';
    if (value < 6) return '😐 Neutral';
    return '😄 Happy';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>⚠️ How are you feeling today?</Text>
      <Text style={styles.label}>{getMoodLabel(moodValue)}</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={moodValue}
        onValueChange={setMoodValue}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#ccc"
      />
      <Text style={styles.value}>Mood Level: {moodValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, alignItems: 'center', backgroundColor: '#fff' },
  header: { fontSize: 20, marginBottom: 20 },
  label: { fontSize: 26, marginVertical: 10 },
  value: { fontSize: 16, color: '#666' }
});
