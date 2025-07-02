import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function ReminderScreen() {
  const [reminder, setReminder] = useState('');
  const [reminders, setReminders] = useState([]);

  const addReminder = () => {
    if (reminder.trim() === '') return;
    setReminders([...reminders, reminder]);
    setReminder('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏰ Add a Smart Reminder</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Take medicine at 9 PM"
        value={reminder}
        onChangeText={setReminder}
      />
      <Button title="Add Reminder" onPress={addReminder} />
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.reminderItem}>🔔 {item}</Text>}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  list: { marginTop: 20 },
  reminderItem: {
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  }
});
