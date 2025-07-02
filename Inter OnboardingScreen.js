import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, StyleSheet } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Dashboard')}
      onDone={() => navigation.replace('Dashboard')}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image style={styles.image} source={require('../../assets/onboard1.png')} />,
          title: 'Welcome to Health Friends',
          subtitle: 'Your AI-powered guide to better mental wellness.',
        },
        {
          backgroundColor: '#f9f9f9',
          image: <Image style={styles.image} source={require('../../assets/onboard2.png')} />,
          title: 'Voice + Text Journaling',
          subtitle: 'Record your thoughts in your language — via voice or typing.',
        },
        {
          backgroundColor: '#fff',
          image: <Image style={styles.image} source={require('../../assets/onboard3.png')} />,
          title: 'Multilingual AI Therapy',
          subtitle: 'Chat with a friendly AI that understands your emotions and culture.',
        },
        {
          backgroundColor: '#f9f9f9',
          image: <Image style={styles.image} source={require('../../assets/onboard4.png')} />,
          title: 'Smart Reminders + Streaks',
          subtitle: 'Build positive habits and track your progress over time.',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20
  }
});
