"use client";

import React, { useEffect } from "react";
import { useFontFamily } from "./font-provider";
import { fontFamilies } from "@/lib/theme-config";

interface FontContextProviderProps {
  children: React.ReactNode;
}

export function FontContextProvider({ children }: FontContextProviderProps) {
  const { fontFamily } = useFontFamily();

  useEffect(() => {
    const fontStack = fontFamilies[fontFamily]?.fontStack.join(", ");
    if (fontStack) {
      document.documentElement.style.setProperty("--font-family", fontStack);
      console.log(`[FontContextProvider] Applied font: ${fontFamily}`);
      console.log(`[FontContextProvider] CSS variable --font-family set to: ${fontStack}`);
    }
  }, [fontFamily]);

  return <>{children}</>;
}
