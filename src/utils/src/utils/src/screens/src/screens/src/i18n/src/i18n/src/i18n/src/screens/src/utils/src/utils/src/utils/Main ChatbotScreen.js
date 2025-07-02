import React, { useState } from 'react';
import {
  View, Text, TextInput, Button,
  ScrollView, StyleSheet, ActivityIndicator
} from 'react-native';
import { sendChatMessage } from '../utils/ai';

export default function ChatbotScreen() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedConv = [...conversation, userMessage];
    setConversation(updatedConv);
    setInput('');
    setLoading(true);

    const reply = await sendChatMessage(updatedConv);
    setConversation([...updatedConv, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧠 Therapy Chatbot</Text>
      <ScrollView style={styles.chatBox}>
        {conversation.map((msg, i) => (
          <View key={i} style={msg.role === 'user' ? styles.userBubble : styles.botBubble}>
            <Text style={styles.msgText}>{msg.content}</Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="small" />}
      </ScrollView>

      <TextInput
        placeholder="How are you feeling?"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  chatBox: { flex: 1, marginBottom: 10 },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7ff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
    maxWidth: '75%'
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
    maxWidth: '75%'
  },
  msgText: { fontSize: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8
  }
});
