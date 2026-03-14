"use client";

import React, { useState, useEffect } from "react";

export type LanguageType = "en" | "zh" | "zh-hk";

const STORAGE_KEY = "resume-language";

const getInitialLanguage = (): LanguageType => {
  if (typeof window === "undefined") return "en";
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && ["en", "zh", "zh-hk"].includes(stored)) {
    return stored as LanguageType;
  }
  return "en";
};

export const LanguageContext = React.createContext<{
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}>({
  language: "en",
  setLanguage: () => {},
});

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<LanguageType>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化时从 localStorage 读取
  useEffect(() => {
    setLanguageState(getInitialLanguage());
    setIsInitialized(true);
  }, []);

  // 保存到 localStorage
  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const value = { language, setLanguage };

  // 防止 hydration 不匹配，初始化完成前不渲染
  if (!isInitialized) {
    return (
      <LanguageContext.Provider value={value}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
