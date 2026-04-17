"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import React from "react";
import { createContext } from "react";
import { useJobType } from "@/components/job/job-type-provider";
import { LanguageContext } from "@/components/lang/language-provider";
import { getColor, getFont } from "@/content/config";
import { usePdfStyle } from "@/app/pdf-styles/pdf-style-provider";

type PrintContext = {
  componentRef: React.RefObject<HTMLDivElement> | null;
  handlePrint: () => void;
};

const PrintContext = createContext<PrintContext>({
  componentRef: null,
  handlePrint: () => {},
});

const FIRST_PAGE_MARGIN_TOP_CM = 1.5;
const OTHER_PAGES_MARGIN_TOP_CM = 0.75;
const PAGE_MARGIN_LEFT_RIGHT_CM = 1;
const PAGE_MARGIN_BOTTOM_CM = 0.5;

export function PrintProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = React.useContext(LanguageContext);
  const { jobType } = useJobType();
  const { styleId, style } = usePdfStyle();
  const fontStack = getFont(jobType, language).fontStack.join(", ");
  const colorSet = getColor(jobType, language);
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    onBeforePrint: () => {
      const el = componentRef.current as HTMLElement | null;
      if (el) {
        console.log("这是打印的HTML内容：");
        console.log(el.innerHTML);
      }

      const iframe = (document.querySelector("iframe#printWindow") ||
        document.querySelector('iframe#print-window') ||
        document.querySelector('iframe[name="printWindow"]') ||
        document.querySelector('iframe[name="print-window"]') ||
        document.querySelector('iframe[id*="print"]') ||
        document.querySelector('iframe[name*="print"]')) as HTMLIFrameElement | null;

      const targetDoc = iframe?.contentDocument;
      if (targetDoc) {
        targetDoc.documentElement.style.setProperty("--font-family", fontStack);
        targetDoc.body?.style.setProperty("font-family", fontStack);

        // PDF export always uses light theme colors for consistent output.
        targetDoc.documentElement.style.setProperty("--header-color", colorSet.light);
        targetDoc.documentElement.setAttribute("data-pdf-style", styleId);
        targetDoc.documentElement.style.setProperty("--pdf-font-scale", `${style.fontScale}`);
        targetDoc.documentElement.style.setProperty("--pdf-section-gap", style.sectionGap);
      }
    },
    onPrintError: (error) => console.log(error),

    content: () => componentRef.current,

    copyStyles: true,
    pageStyle: `
      @page {
        size: 210mm 297mm;
        margin: ${OTHER_PAGES_MARGIN_TOP_CM}cm ${PAGE_MARGIN_LEFT_RIGHT_CM}cm ${PAGE_MARGIN_BOTTOM_CM}cm ${PAGE_MARGIN_LEFT_RIGHT_CM}cm !important;
      }
      @page:first {
        margin: ${FIRST_PAGE_MARGIN_TOP_CM}cm ${PAGE_MARGIN_LEFT_RIGHT_CM}cm ${PAGE_MARGIN_BOTTOM_CM}cm ${PAGE_MARGIN_LEFT_RIGHT_CM}cm !important;
      }
      :root { 
        --font-family: ${fontStack}; 
        --header-color: ${colorSet.light};
        --pdf-font-scale: ${style.fontScale};
        --pdf-section-gap: ${style.sectionGap};
      }
      html, body { font-family: ${fontStack}; margin: 0; }
    `,
  });

  return (
    <PrintContext.Provider value={{ componentRef, handlePrint }}>
      {children}
    </PrintContext.Provider>
  );
}

export function PDFResumeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { componentRef } = usePrint();
  const { styleId } = usePdfStyle();

  return (
    <div ref={componentRef} className="pdf-resume-theme" data-pdf-style={styleId}>
      {children}
    </div>
  );
}

export function usePrint() {
  const { componentRef, handlePrint } = React.useContext(PrintContext);
  if (!componentRef) {
    throw new Error("usePrint must be used within a PrintProvider");
  }
  if (!handlePrint) {
    throw new Error("usePrint must be used within a PrintProvider");
  }
  return { componentRef, handlePrint };
}
