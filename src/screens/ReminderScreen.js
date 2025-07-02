import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import i18n from '../utils/i18n';

export default function ReminderScreen() {
  const [reminder, setReminder] = useState('');
  const [reminders, setReminders] = useState([]);
  const [lang, setLang] = useState('en');

  const addReminder = () => {
    if (reminder.trim() === '') return;
    setReminders([...reminders, reminder]);
    setReminder('');
  };

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    i18n.locale = newLang;
    setLang(newLang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('reminderTitle')}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t('placeholder')}
        value={reminder}
        onChangeText={setReminder}
      />
      <Button title={i18n.t('addBtn')} onPress={addReminder} />
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>🔔 {item}</Text>}
        style={styles.list}
      />
      <Button title={i18n.t('toggleLang')} onPress={toggleLanguage} />
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
  item: { fontSize: 16, paddingVertical: 6, borderBottomWidth: 0.5, borderColor: '#ccc' },
  list: { marginVertical: 15 }
});
