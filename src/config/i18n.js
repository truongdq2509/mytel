import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enText from '../assets/locales/en.json'
import myText from '../assets/locales/my.json'

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: enText,
			},
			my: {
				translation: myText,
			},
		},
		lng: localStorage.getItem('i18nextLng') || 'en',
		fallbackLng: 'en',
	})

export default i18n
