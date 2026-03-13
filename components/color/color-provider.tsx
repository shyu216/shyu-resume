"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type HeaderColorType = 'blue' | 'red' | 'purple' | 'green' | 'orange' | 'pink' | 'teal' | 'indigo';

interface ColorContextType {
  headerColor: HeaderColorType;
  setHeaderColor: (color: HeaderColorType) => void;
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
  const [headerColor, setHeaderColor] = useState<HeaderColorType>(() => {
    const DEFAULT_COLOR: HeaderColorType = "red";
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem("headerColor");
      console.log('[ColorProvider] localStorage headerColor:', savedColor);
      if (savedColor) {
        const validColors: HeaderColorType[] = ['blue', 'red', 'purple', 'green', 'orange', 'pink', 'teal', 'indigo'];
        if (validColors.includes(savedColor as HeaderColorType)) {
          return savedColor as HeaderColorType;
        }
      }
      return DEFAULT_COLOR;
    }
    console.log('[ColorProvider] SSR mode, returning default: red');
    return DEFAULT_COLOR;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("headerColor", headerColor);
    }
  }, [headerColor]);

  return (
    <ColorContext.Provider value={{ headerColor, setHeaderColor }}>
      {children}
    </ColorContext.Provider>
  );
}
