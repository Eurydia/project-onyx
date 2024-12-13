import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en/translation";
import { th } from "./th/translation";

i18next.use(initReactI18next).init({
  fallbackLng: "th",
  debug: true,
  resources: {
    en,
    th,
  },
});
