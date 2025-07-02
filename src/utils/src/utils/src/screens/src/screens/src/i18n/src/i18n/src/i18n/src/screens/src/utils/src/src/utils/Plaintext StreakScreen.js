import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../utils/firebase';
import moment from 'moment';

export default function StreakScreen() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStreak();
  }, []);

  const checkStreak = async () => {
    try {
      const user = auth.currentUser;
      const logsRef = query(
        collection(db, 'activity_logs'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(logsRef);
      const dates = new Set();

      snapshot.forEach(doc => {
        const dateStr = moment(doc.data().createdAt.toDate()).format('YYYY-MM-DD');
        dates.add(dateStr);
      });

      let streak = 0;
      let best = 0;
      let dayCursor = moment();

      while (true) {
        const dayStr = dayCursor.format('YYYY-MM-DD');
        if (dates.has(dayStr)) {
          streak++;
          if (streak > best) best = streak;
          dayCursor.subtract(1, 'day');
        } else {
          break;
        }
      }

      setCurrentStreak(streak);
      setBestStreak(best);
    } catch (err) {
      console.error('Streak check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏆 Your Streaks</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.streakBox}>
          <Text style={styles.streakText}>🔥 Current Streak: {currentStreak} days</Text>
          <Text style={styles.streakText}>🌟 Best Streak: {bestStreak} days</Text>
          {currentStreak >= 3 && (
            <Text style={styles.badge}>🎉 Great going! Keep the streak alive!</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  streakBox: { alignItems: 'center' },
  streakText: { fontSize: 18, marginVertical: 10 },
  badge: {
    fontSize: 16,
    marginTop: 20,
    backgroundColor: '#e7f5ff',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    color: '#007AFF'
  }
});
