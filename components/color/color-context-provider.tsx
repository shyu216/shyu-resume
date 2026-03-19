"use client";

import React, { useEffect } from "react";
import { useColor } from "./color-provider";

interface ColorContextProviderProps {
  children: React.ReactNode;
}

export function ColorContextProvider({ children }: ColorContextProviderProps) {
  const { headerColor } = useColor();

  useEffect(() => {
    // Set data attribute for CSS variable targeting
    document.documentElement.setAttribute("data-header-color", headerColor);
  }, [headerColor]);

  return <>{children}</>;
}
