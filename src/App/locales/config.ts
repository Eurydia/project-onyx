import i18next from "i18next";
import { default as LangDectector } from "i18next-browser-languagedetector";
import { default as Backend } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { EN_COMPONENTS } from "./en/component";
import { EN_NAV } from "./en/nav";
import EN_VIEWS from "./en/views";
import { TH_COMPONENTS } from "./th/component";
import { TH_NAV } from "./th/nav";
import TH_VIEWS from "./th/views";
i18next
  .use(Backend)
  .use(LangDectector)
  .use(initReactI18next)
  .init({
    detection: {
      lookupLocalStorage: "language",
    },
    resources: {
      en: {
        components: EN_COMPONENTS,
        nav: EN_NAV,
        views: EN_VIEWS,
      },
      th: {
        views: TH_VIEWS,
        nav: TH_NAV,
        components: TH_COMPONENTS,
      },
    },
    debug: true,
  });

export default i18next;
