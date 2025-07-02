import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { Audio } from 'expo-av';

const meditations = [
  {
    id: '1',
    title: 'Calm Breathing',
    language: 'English',
    file: require('../../assets/meditations/calm_breathing_en.mp3')
  },
  {
    id: '2',
    title: 'Calm Breathing',
    language: 'Hindi',
    file: require('../../assets/meditations/calm_breathing_hi.mp3')
  },
  {
    id: '3',
    title: 'Sleep Relaxation',
    language: 'English',
    file: require('../../assets/meditations/sleep_relax_en.mp3')
  },
  {
    id: '4',
    title: 'Sleep Relaxation',
    language: 'Hindi',
    file: require('../../assets/meditations/sleep_relax_hi.mp3')
  }
];

export default function MeditationScreen() {
  const soundRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);

  const playMeditation = async (meditation) => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    const { sound } = await Audio.Sound.createAsync(meditation.file);
    soundRef.current = sound;
    setPlayingId(meditation.id);
    await sound.playAsync();
  };

  const stopPlayback = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setPlayingId(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧘 Guided Meditations</Text>
      <FlatList
        data={meditations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title} ({item.language})</Text>
            <Button
              title={playingId === item.id ? '⏹ Stop' : '▶️ Play'}
              onPress={() =>
                playingId === item.id ? stopPlayback() : playMeditation(item)
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10
  },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 8 }
});
