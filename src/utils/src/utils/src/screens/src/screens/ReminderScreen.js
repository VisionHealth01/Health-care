import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  }),
});

export default function ReminderScreen() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setPermissionGranted(status === 'granted');
  };

  const scheduleNotification = async () => {
    if (!permissionGranted) {
      Alert.alert("Permission Denied", "Enable notifications in settings");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '💡 Health Friends Reminder',
        body: "It's time to check in with your mood or meditate 🌿",
      },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: true,
      },
    });

    Alert.alert('Reminder Set ✅', 'You’ll receive daily nudges at 9:00 AM');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏰ Smart Reminders</Text>
      <Text style={styles.info}>
        Set daily reminders to help you stay consistent with journaling, meditation, or medication.
      </Text>
      <Button title="Set Daily Reminder at 9:00 AM" onPress={scheduleNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  info: { fontSize: 16, marginBottom: 20, textAlign: 'center' }
});
