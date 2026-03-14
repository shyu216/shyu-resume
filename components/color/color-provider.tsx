"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { loadSettings, saveSettings, DEFAULT_SETTINGS } from "@/lib/storage";

export type HeaderColorType = 'blue' | 'red' | 'purple' | 'green' | 'orange' | 'pink' | 'teal' | 'indigo';

interface ColorContextType {
  headerColor: HeaderColorType;
  setHeaderColor: (color: HeaderColorType) => void;
  isInitialized: boolean;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}

interface ColorProviderProps {
  children: React.ReactNode;
}

export function ColorProvider({ children }: ColorProviderProps) {
  const [headerColor, setHeaderColorState] = useState<HeaderColorType>(DEFAULT_SETTINGS.color);
  const [isInitialized, setIsInitialized] = useState(false);

  // 客户端挂载后从统一存储读取
  useEffect(() => {
    const settings = loadSettings();
    setHeaderColorState(settings.color);
    setIsInitialized(true);
  }, []);

  // 保存到统一存储
  const setHeaderColor = (color: HeaderColorType) => {
    setHeaderColorState(color);
    if (isInitialized) {
      saveSettings({ color });
    }
  };

  return (
    <ColorContext.Provider value={{ headerColor, setHeaderColor, isInitialized }}>
      {children}
    </ColorContext.Provider>
  );
}
