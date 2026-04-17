"use client";

import React, { useState, useEffect } from "react";
import { loadSettings, saveSettings, DEFAULT_SETTINGS } from "@/lib/storage";
import type { LanguageProviderProps, LanguageType } from "@/content/copy";

export const LanguageContext = React.createContext<{
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  isInitialized: boolean;
}>({
  language: "en",
  setLanguage: () => {},
  isInitialized: false,
});

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<LanguageType>(DEFAULT_SETTINGS.language);
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化时从统一存储读取
  useEffect(() => {
    const settings = loadSettings();
    setLanguageState(settings.language);
    setIsInitialized(true);
  }, []);

  // 保存到统一存储
  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    if (isInitialized) {
      saveSettings({ language: lang });
    }
  };

  const value = { language, setLanguage, isInitialized };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
