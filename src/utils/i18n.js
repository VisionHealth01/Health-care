import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
  en: {
    reminderTitle: '⏰ Add a Smart Reminder',
    placeholder: 'e.g. Take medicine at 9 PM',
    addBtn: 'Add Reminder',
    currentReminders: 'Current Reminders',
    toggleLang: 'Switch to Hindi'
  },
  hi: {
    reminderTitle: '⏰ स्मार्ट रिमाइंडर जोड़ें',
    placeholder: 'उदा. 9 बजे दवा लें',
    addBtn: 'रिमाइंडर जोड़ें',
    currentReminders: 'वर्तमान रिमाइंडर',
    toggleLang: 'अंग्रेज़ी में बदलें'
  }
};

i18n.locale = Localization.locale || 'en';
i18n.fallbacks = true;

export default i18n;
