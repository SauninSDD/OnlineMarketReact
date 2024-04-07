import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

export const defaultNS = 'ru'

i18n
    .use(initReactI18next)
    .use(HttpApi)
    .init({
        debug: true,
        fallbackLng: 'ru',
        defaultNS,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;