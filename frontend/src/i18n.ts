import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

/** Пространство имен по умолчанию, из которого будут браться переводы, если в useTranslation не передали переменную*/
export const defaultNS = 'DefaultNS'

/** Массив ns, подгружаемый при посещении сайта*/
export const ns = []

i18n
    .use(initReactI18next)
    .use(HttpApi)
    .init({
        debug: true,
        fallbackLng: 'ru',
        defaultNS,
        ns,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;