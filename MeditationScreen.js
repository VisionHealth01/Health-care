import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function MeditationScreen() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
    );
    setSound(newSound);
    setIsPlaying(true);
    await newSound.playAsync();
    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
        setSound(null);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧘 Guided Meditation</Text>
      <Button
        title={isPlaying ? 'Stop Meditation' : 'Start Meditation'}
        onPress={playSound}
      />
      {isPlaying && <Text style={styles.status}>🌿 Playing calming audio...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  status: { marginTop: 15, fontSize: 16, color: 'green' }
});
