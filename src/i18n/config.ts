
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des traductions
import fr from './locales/fr.json';
import en from './locales/en.json';

const resources = {
  fr: {
    translation: fr
  },
  en: {
    translation: en
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Langue par défaut
    fallbackLng: 'fr',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;
