"use client";

import type { CSSProperties } from "react";
import { usePrint } from "./print-provider";
import { useFontFamily } from "@/components/font/font-provider";
import { fontFamilies } from "@/lib/theme-config";

export function PDFResumeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { componentRef } = usePrint();
  const { fontFamily } = useFontFamily();
  const fontStack = fontFamilies[fontFamily].fontStack.join(", ");

  const pdfStyle: CSSProperties & { "--font-family"?: string } = {
    fontFamily: fontStack,
    "--font-family": fontStack,
  };

  return (
    <div
      ref={componentRef}
      style={pdfStyle}
    >
      {children}
    </div>
  );
}
