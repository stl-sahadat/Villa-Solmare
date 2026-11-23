"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type Language, type TranslationSchema } from "@/data/translations";

export type { Language, TranslationSchema };

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("villa-lang") as Language;
      if (stored === "en" || stored === "bn") {
        setLangState(stored);
        document.documentElement.lang = stored;
      } else {
        const params = new URLSearchParams(window.location.search);
        const paramLang = params.get("lang") as Language;
        if (paramLang === "bn" || paramLang === "en") {
          setLangState(paramLang);
          document.documentElement.lang = paramLang;
        }
      }
    } catch {}
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    try {
      localStorage.setItem("villa-lang", newLang);
    } catch {}
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "bn" : "en");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
