// src/screens/VoiceJournalScreen.js

import React, { useState } from 'react';
import {
  View, Text, Button, StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { getTranscription } from '../utils/voice';

export default function VoiceJournalScreen() {
  const [recording, setRecording] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      console.error('Recording error:', err);
    }
  };

  const stopRecording = async () => {
    setLoading(true);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64
      });

      const text = await getTranscription(base64);
      setTranscript(text || 'No transcription found.');
    } catch (err) {
      console.error('Stop recording error:', err);
      Alert.alert('Error', 'Failed to process voice.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎤 Voice Journal</Text>

      <Button
        title={recording ? '⏹ Stop Recording' : '🎙 Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      {transcript !== '' && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>📝 Transcript:</Text>
          <Text style={styles.transcriptText}>{transcript}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  resultBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10
  },
  resultLabel: { fontWeight: 'bold', marginBottom: 5 },
  transcriptText: { fontSize: 16 }
});
