import { createContext, useContext, useState } from "react";

import en from "../locales/en.json";
import ru from "../locales/ru.json";
import kz from "../locales/kz.json";

const translations = { en, ru, kz };

const LanguageContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocaleState] = useState(() => {
    try {
      const saved = localStorage.getItem("appLanguage");
      if (saved && translations[saved]) return saved;
    } catch {
      // Local storage might not be available. That's okay.
    }
    try {
      const browserLang = navigator.language.split("-")[0];
      if (translations[browserLang]) return browserLang;
    } catch {
      // Navigator might not be available. That's okay.
    }
    return "en";
  });

  const setLocale = (newLocale) => {
    if (translations[newLocale]) {
      setLocaleState(newLocale);
      try {
        localStorage.setItem("appLanguage", newLocale);
      } catch {
        // Local storage might not be available. That's okay.
      }
    }
  };

  const t = (key, params) => {
    const keys = key.split(".");
    let result = translations[locale] || translations.en;
    for (const k of keys) {
      result = result?.[k];
    }
    if (typeof result !== "string") return key;
    if (params) {
      return result.replace(/\{(\w+)\}/g, (_, name) =>
        name in params ? String(params[name]) : `{${name}}`,
      );
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
