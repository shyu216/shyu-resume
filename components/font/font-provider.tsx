"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FontFamilyType } from "@/lib/theme-config";
import { loadSettings, saveSettings, DEFAULT_SETTINGS } from "@/lib/storage";

interface FontContextType {
  fontFamily: FontFamilyType;
  setFontFamily: (fontFamily: FontFamilyType) => void;
  isInitialized: boolean;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function useFontFamily() {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFontFamily must be used within a FontProvider");
  }
  return context;
}

interface FontProviderProps {
  children: React.ReactNode;
}

export function FontProvider({ children }: FontProviderProps) {
  const [fontFamily, setFontFamilyState] = useState<FontFamilyType>(DEFAULT_SETTINGS.fontFamily);
  const [isInitialized, setIsInitialized] = useState(false);

  // 客户端挂载后从统一存储读取
  useEffect(() => {
    const settings = loadSettings();
    setFontFamilyState(settings.fontFamily);
    setIsInitialized(true);
  }, []);

  // 保存到统一存储
  const setFontFamily = (font: FontFamilyType) => {
    setFontFamilyState(font);
    if (isInitialized) {
      saveSettings({ fontFamily: font });
    }
  };

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily, isInitialized }}>
      {children}
    </FontContext.Provider>
  );
}
