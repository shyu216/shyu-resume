"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import React from "react";
import { createContext } from "react";
import { getColor } from "@/content/config";
import '@/lib/pagination';

type PrintContext = {
  componentRef: React.RefObject<HTMLDivElement> | null;
  handlePrint: () => void;
};

const PrintContext = createContext<PrintContext>({
  componentRef: null,
  handlePrint: () => {},
});

export function PrintProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorSet = getColor();
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
        targetDoc.documentElement.style.setProperty("--font-family", "LXGWWenKaiTC, system-ui, sans-serif");
        targetDoc.body?.style.setProperty("font-family", "LXGWWenKaiTC, system-ui, sans-serif");

        // PDF export always uses light theme colors for consistent output.
        targetDoc.documentElement.style.setProperty("--header-color", colorSet.light);
        targetDoc.documentElement.setAttribute("data-pdf-style", "cards");
        targetDoc.documentElement.style.setProperty("--pdf-font-scale", "1");
        targetDoc.documentElement.style.setProperty("--pdf-section-gap", "0.5rem");

        // Call shared pagination implementation from lib
        try {
          if (typeof window.__runPagination === "function") {
            // pass the iframe document into the shared runner
            console.log("Running pagination ...");
            window.__runPagination(targetDoc, ".pdf-resume-root");
          } else {
            console.warn("Shared pagination runner not available on window");
          }
        } catch (e) {
          console.warn("Pagination runner failed", e);
        }
      }
    },
    onPrintError: (error) => console.log(error),

    content: () => componentRef.current,

    copyStyles: true,
    pageStyle: `
      @page {
        size: 210mm 297mm;
      }
      :root { 
        --font-family: "LXGWWenKaiTC", system-ui, sans-serif;
        --header-color: ${colorSet.light};
        --pdf-font-scale: 1;
        --pdf-section-gap: 0.5rem;
      }
      html, body { font-family: "LXGWWenKaiTC", system-ui, sans-serif; margin: 0; }
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

  return (
    <div ref={componentRef} className="pdf-resume-theme" data-pdf-style="cards">
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
