"use client";

import React from "react";
import { useState } from "react";


export const LanguageContext = React.createContext({
  language: "en",
  setLanguage: (lang: string) => { }
});

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState("en");
  const value = { language, setLanguage };


  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}