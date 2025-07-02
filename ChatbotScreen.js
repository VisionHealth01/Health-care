import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function ChatbotScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello 👋 I\'m your mental wellness buddy. How can I support you today?' }
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    const botReply = getBotResponse(input);

    setMessages((prev) => [...prev, userMessage, { from: 'bot', text: botReply }]);
    setInput('');
  };

  const getBotResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('anxious') || lower.includes('stress')) {
      return 'I understand. Try taking a deep breath and grounding yourself. Would you like a meditation session? 🧘‍♀️';
    } else if (lower.includes('happy')) {
      return 'That’s great to hear! Keep journaling and doing what makes you smile 😊';
    } else if (lower.includes('sad') || lower.includes('alone')) {
      return 'I\'m here for you. You\'re not alone. Would you like to talk more or try some relaxing activities? 🌈';
    } else {
      return 'Thank you for sharing. I\'m here to listen. ❤️';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.message,
              msg.from === 'user' ? styles.userMsg : styles.botMsg
            ]}
          >
            <Text>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          value={input}
          onChangeText={setInput}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chat: { flex: 1, padding: 10 },
  message: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '80%'
  },
  userMsg: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end'
  },
  botMsg: {
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start'
  },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    borderColor: '#ccc'
  }
});
