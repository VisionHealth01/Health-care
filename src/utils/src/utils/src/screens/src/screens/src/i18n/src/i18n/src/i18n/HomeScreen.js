import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Picker, Platform } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import i18n from '../i18n/i18n';

export default function HomeScreen({ navigation }) {
  const [language, setLanguage] = useState(i18n.locale);

  const changeLanguage = (lang) => {
    i18n.locale = lang;
    setLanguage(lang);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('welcome')}</Text>

      <Button title={`📓 ${i18n.t('journal')}`} onPress={() => navigation.navigate('Journal')} />
      <Button title={`⚠️ ${i18n.t('mood')}`} onPress={() => navigation.navigate('Mood Tracker')} />
      <Button title={`⏰ ${i18n.t('reminders')}`} onPress={() => navigation.navigate('Reminders')} />
      <Button title={`🤖 ${i18n.t('chatbot')}`} onPress={() => navigation.navigate('Chatbot')} />
      <Button title={`🎙 ${i18n.t('voice')}`} onPress={() => navigation.navigate('Voice Journal')} />

      <View style={styles.spacer} />

      <Text style={styles.label}>🌐 Select Language</Text>
      {Platform.OS === 'ios' || Platform.OS === 'android' ? (
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={(itemValue) => changeLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="हिन्दी" value="hi" />
        </Picker>
      ) : (
        <Button title="Switch Language" onPress={() => changeLanguage(language === 'en' ? 'hi' : 'en')} />
      )}

      <View style={styles.spacer} />
      <Button title={`🚪 ${i18n.t('logout')}`} color="red" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { marginTop: 20, textAlign: 'center', fontSize: 16 },
  picker: { height: 50, width: '100%' },
  spacer: { height: 20 }
});
