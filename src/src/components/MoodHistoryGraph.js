import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const mockMoodData = [
  { day: 'Mon', mood: 3 },
  { day: 'Tue', mood: 5 },
  { day: 'Wed', mood: 7 },
  { day: 'Thu', mood: 2 },
  { day: 'Fri', mood: 6 },
  { day: 'Sat', mood: 4 },
  { day: 'Sun', mood: 8 }
];

const getEmoji = (value) => {
  if (value <= 3) return '😢';
  if (value <= 6) return '😐';
  return '😊';
};

export default function MoodHistoryGraph() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 Weekly Mood Summary</Text>
      <View style={styles.graph}>
        {mockMoodData.map((item, index) => (
          <View key={index} style={styles.barWrapper}>
            <View style={[styles.bar, { height: item.mood * 10 }]} />
            <Text style={styles.emoji}>{getEmoji(item.mood)}</Text>
            <Text style={styles.day}>{item.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  graph: { flexDirection: 'row', alignItems: 'flex-end' },
  barWrapper: { alignItems: 'center', marginHorizontal: 6 },
  bar: {
    width: 20,
    backgroundColor: '#007AFF',
    borderRadius: 4
  },
  emoji: { fontSize: 16, marginVertical: 2 },
  day: { fontSize: 12, color: '#555' }
});
