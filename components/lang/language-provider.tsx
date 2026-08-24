"use client";

import React, { useState, useEffect } from "react";
import { loadSettings, saveSettings, DEFAULT_SETTINGS } from "@/lib/storage";
import type { LanguageProviderProps, LanguageType } from "@/content/copy";

export const LanguageContext = React.createContext<{
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  isInitialized: boolean;
  isTransitioning: boolean;
  transitionLanguage: (lang: LanguageType) => void;
}>({
  language: "en",
  setLanguage: () => {},
  isInitialized: false,
  isTransitioning: false,
  transitionLanguage: () => {},
});

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<LanguageType>(DEFAULT_SETTINGS.language);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 初始化时从统一存储读取
  useEffect(() => {
    const settings = loadSettings();
    setLanguageState(settings.language);
    setIsInitialized(true);
  }, []);

  // 将当前语言写入 document.lang，以便 CSS :lang() 选择器生效
  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // ignore (SSR safe)
    }
  }, [language]);

  // 保存到统一存储
  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    if (isInitialized) {
      saveSettings({ language: lang });
    }
  };

  // 带动画的语言切换：先淡出 → 切换语言 → 淡入
  const transitionLanguage = (lang: LanguageType) => {
    if (lang === language || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setLanguage(lang);
      // 等待 React 完成新语言渲染
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      });
    }, 150);
  };

  const value = { language, setLanguage, isInitialized, isTransitioning, transitionLanguage };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
