// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your language files
import en from './lang/en.json';
import cn from './lang/cn.json';
import zh from './lang/zh.json';

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      cn: { translation: cn },
      zh: { translation: zh },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;