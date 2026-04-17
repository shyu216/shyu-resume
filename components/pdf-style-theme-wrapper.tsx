"use client";

import React from "react";
import { usePdfStyle } from "@/app/pdf-styles/pdf-style-provider";

export function PdfStyleThemeWrapper({ children }: { children: React.ReactNode }) {
  const { styleId } = usePdfStyle();

  return (
    <div className="pdf-resume-theme" data-pdf-style={styleId}>
      {children}
    </div>
  );
}
