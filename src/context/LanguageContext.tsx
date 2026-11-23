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
      let initial: Language = "en";
      const stored = localStorage.getItem("villa-lang") as Language;
      if (stored === "en" || stored === "bn") {
        initial = stored;
      } else {
        const params = new URLSearchParams(window.location.search);
        const paramLang = params.get("lang") as Language;
        if (paramLang === "bn" || paramLang === "en") {
          initial = paramLang;
        }
      }
      setLangState(initial);
      document.documentElement.lang = initial;
      document.documentElement.setAttribute("data-lang", initial);
      if (initial === "bn") {
        document.documentElement.classList.add("font-bangla");
      } else {
        document.documentElement.classList.remove("font-bangla");
      }
    } catch {}
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.setAttribute("data-lang", newLang);
    if (newLang === "bn") {
      document.documentElement.classList.add("font-bangla");
    } else {
      document.documentElement.classList.remove("font-bangla");
    }
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
