import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function VoiceJournalScreen() {
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);

  const startVoiceInput = async () => {
    setRecording(true);
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Speech Recognition not supported on this device');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN'; // You can change to 'hi-IN' for Hindi
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setText((prev) => prev + ' ' + spokenText);
      };

      recognition.onerror = () => {
        alert('Error in voice input');
        setRecording(false);
      };

      recognition.onend = () => {
        setRecording(false);
      };

      recognition.start();
    } catch (e) {
      console.error('Voice input error:', e);
      alert('Speech-to-text not supported here.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎙️ Voice Journal</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Transcribed text will appear here..."
        value={text}
        onChangeText={setText}
      />
      <Button title={recording ? '🎤 Listening...' : 'Start Voice Input'} onPress={startVoiceInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: {
    height: 160,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top'
  }
});
