import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enLang from './locales/en/translation.json';
import deLang from './locales/de/translation.json';

const resources = {
    en: {
        translation: enLang,
    },
    de: {
        translation: deLang,
    },
};
let language = localStorage.getItem('language');
if (language == null){
    language = 'en';
    localStorage.setItem("language", "en");
}

i18n.use(LanguageDetector).use(initReactI18next).init({
        resources,
        lng: language,
        fallbackLng: 'en',
        debug: true,


        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });


export default i18n;