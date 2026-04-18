"use client";

import React from "react";
import { useJobType } from "@/components/job/job-type-provider";
import { getPdfStyle } from "@/content/config";
import {
  PDF_STYLE_PRESETS,
  type PdfStylePreset,
  getPdfStylePreset,
} from "@/app/pdf-styles/presets";

type PdfStyleContextValue = {
  styleId: string;
  style: PdfStylePreset;
};

const defaultStyle = PDF_STYLE_PRESETS[0];

const PdfStyleContext = React.createContext<PdfStyleContextValue>({
  styleId: defaultStyle.id,
  style: defaultStyle,
});

export function PdfStyleProvider({ children }: { children: React.ReactNode }) {
  const { jobType: profile } = useJobType();
  const styleId = getPdfStyle(profile);

  const activeStyle = React.useMemo<PdfStylePreset>(
    () => getPdfStylePreset(styleId),
    [styleId]
  );

  const value = React.useMemo(
    () => ({ styleId: activeStyle.id, style: activeStyle }),
    [activeStyle]
  );

  return <PdfStyleContext.Provider value={value}>{children}</PdfStyleContext.Provider>;
}

export function usePdfStyle() {
  return React.useContext(PdfStyleContext);
}
