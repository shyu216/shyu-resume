"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FontFamilyType } from "@/lib/theme-config";

interface FontContextType {
  fontFamily: FontFamilyType;
  setFontFamily: (fontFamily: FontFamilyType) => void;
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
  const [fontFamily, setFontFamily] = useState<FontFamilyType>(() => {
    if (typeof window !== 'undefined') {
      const savedFont = localStorage.getItem("fontFamily");
      return (savedFont as FontFamilyType) || "inter";
    }
    return "inter";
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("fontFamily", fontFamily);
    }
  }, [fontFamily]);

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily }}>
      {children}
    </FontContext.Provider>
  );
}
