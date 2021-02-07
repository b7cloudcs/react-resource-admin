import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// langs
import zh from './langs/zh.json'
import en from './langs/en.json'

// 设置默认语言
const lng = localStorage.getItem("lng") != null
            ? localStorage.getItem("lng")
            : window.device.isZHCN?"zh":"en"

// init langs
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({

        resources: {en, zh},

        lng: lng,

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;