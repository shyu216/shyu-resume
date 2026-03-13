"use client";

import React, { useEffect } from "react";
import { useColor } from "./color-provider";
import { colorPalettes } from "@/lib/theme-config";

interface ColorContextProviderProps {
  children: React.ReactNode;
}

export function ColorContextProvider({ children }: ColorContextProviderProps) {
  const { headerColor } = useColor();

  useEffect(() => {
    const colors = colorPalettes[headerColor];
    if (colors) {
      document.documentElement.style.setProperty("--header-color-light", colors.light);
      document.documentElement.style.setProperty("--header-color-dark", colors.dark);
    }
  }, [headerColor]);

  return <>{children}</>;
}
