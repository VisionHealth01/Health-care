import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Button, Alert, Picker
} from 'react-native';
import { auth } from '../utils/firebase';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const [selectedLang, setSelectedLang] = useState('en');

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (err) {
      console.error('Logout error:', err);
      Alert.alert('Logout Failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 Profile</Text>
      <Text style={styles.info}>Email: {user?.email}</Text>

      <Text style={styles.label}>🌐 Preferred Language</Text>
      <Picker
        selectedValue={selectedLang}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedLang(itemValue)}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Hindi" value="hi" />
        <Picker.Item label="Marathi" value="mr" />
        <Picker.Item label="Tamil" value="ta" />
      </Picker>

      <View style={{ marginVertical: 30 }}>
        <Button title="🔓 Log Out" onPress={handleLogout} color="#D00" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 20 },
  picker: { height: 50, width: '100%' }
});
