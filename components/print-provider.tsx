"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import React from "react";
import { createContext } from "react";
import { useFontFamily } from "@/components/font/font-provider";
import { fontFamilies } from "@/lib/theme-config";

type PrintContext = {
  componentRef: React.MutableRefObject<null> | null;
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
  const { fontFamily } = useFontFamily();
  const fontStack = fontFamilies[fontFamily].fontStack.join(", ");
  const componentRef = useRef(null);
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
      }
    },
    onPrintError: (error) => console.log(error),

    content: () => componentRef.current,

    copyStyles: true,
    pageStyle: `
      @page:first { margin-top: 0cm; }
      @page { size: 210mm 297mm; margin-top: 1cm; margin-bottom: 0.5cm; }
      :root { --font-family: ${fontStack}; }
      html, body { font-family: ${fontStack}; margin: 0; }
    `,
  });

  return (
    <PrintContext.Provider value={{ componentRef, handlePrint }}>
      {children}
    </PrintContext.Provider>
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
