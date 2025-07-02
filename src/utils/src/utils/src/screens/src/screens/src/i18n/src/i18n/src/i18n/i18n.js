import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './en';
import hi from './hi';

i18n.translations = {
  en,
  hi
};

i18n.fallbacks = true;
i18n.locale = Localization.locale || 'en';

export default i18n;
