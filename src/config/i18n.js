import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enText from '../assets/locales/en.json'
import myText from '../assets/locales/my.json'

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			my: {
				translation: myText,
			},
			en: {
				translation: enText,
			},

		},
		lng: localStorage.getItem('i18nextLng') || 'my',
		fallbackLng: 'my',
	})

export default i18n
