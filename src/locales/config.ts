import i18next from "i18next";
import {
  default as Backend,
  default as LangDectector,
} from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { en } from "./en/translation";
import { th } from "./th/translation";

i18next
  .use(Backend)
  .use(LangDectector)
  .use(initReactI18next)
  .init({
    detection: {
      lookupLocalStorage: "language",
    },
    // debug: true,
    resources: {
      en,
      th,
    },
  });

export default i18next;
