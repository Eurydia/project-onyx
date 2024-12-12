import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en/translation";

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  debug: true,
  resources: {
    en,
  },
});
