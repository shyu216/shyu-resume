"use client";

import React from "react";
import { useState } from "react";


export type LanguageType = "en" | "zh" | "zh-hk";
export const LanguageContext = React.createContext({
  language: "en" as LanguageType,
  setLanguage: (lang: LanguageType) => { }
});

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<LanguageType>("en");
  const value = { language, setLanguage };


  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}