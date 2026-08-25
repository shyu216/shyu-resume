"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import React from "react";
import { createContext } from "react";
import { getColor } from "@/content/config";

type PrintContext = {
  componentRef: React.RefObject<HTMLDivElement> | null;
  handlePrint: () => void;
};

const PrintContext = createContext<PrintContext>({
  componentRef: null,
  handlePrint: () => {},
});

/**
 * 从父文档的样式表中提取 LXGW WenKai 字体的 @font-face 信息，
 * 以便在 iframe 中重新注入 @font-face 规则，确保字体加载正确。
 */
function extractFontFaceInfo(): { family: string; src: string } | null {
  for (const sheet of document.styleSheets) {
    try {
      const rules = sheet.cssRules;
      if (!rules) continue;
      for (const rule of rules) {
        if (rule instanceof CSSFontFaceRule) {
          const family = rule.style.fontFamily;
          if (family.includes('lxgwWenKai') && !family.includes('Fallback')) {
            return {
              family: rule.style.fontFamily,
              src: rule.style.getPropertyValue('src'),
            };
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet，无法访问，跳过
    }
  }
  return null;
}

export function PrintProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorSet = getColor();
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    onBeforePrint: async () => {
      const iframe = (document.querySelector("iframe#printWindow") ||
        document.querySelector('iframe#print-window') ||
        document.querySelector('iframe[name="printWindow"]') ||
        document.querySelector('iframe[name="print-window"]') ||
        document.querySelector('iframe[id*="print"]') ||
        document.querySelector('iframe[name*="print"]')) as HTMLIFrameElement | null;

      const targetDoc = iframe?.contentDocument;
      if (targetDoc) {
        // 将 --font-lxgw 变量复制到 iframe 的 <html> 上
        const fontLxgw = getComputedStyle(document.documentElement).getPropertyValue('--font-lxgw').trim();
        if (fontLxgw) {
          targetDoc.documentElement.style.setProperty('--font-lxgw', fontLxgw);
        }

        // 从父文档提取 @font-face 信息，注入到 iframe 中
        // 使用绝对路径避免 iframe 中相对路径解析问题
        const fontFaceInfo = extractFontFaceInfo();
        if (fontFaceInfo) {
          const absoluteSrc = fontFaceInfo.src.replace(
            /url\((['"]?)(\/[^'"]+)(['"]?)\)/g,
            (_match, q1, url, q2) => `url(${q1}${window.location.origin}${url}${q2})`
          );
          const fontStyle = targetDoc.createElement('style');
          fontStyle.textContent = `
            @font-face {
              font-family: ${fontFaceInfo.family};
              src: ${absoluteSrc};
              font-display: block;
            }
          `;
          targetDoc.head.appendChild(fontStyle);
        }

        // 等待浏览器解析刚注入的 @font-face 并加载字体
        await new Promise(r => setTimeout(r, 100));
        if (targetDoc.fonts) {
          await targetDoc.fonts.ready;
        }

        targetDoc.documentElement.style.setProperty("--font-family", "var(--font-lxgw), system-ui, sans-serif");
        targetDoc.body?.style.setProperty("font-family", "var(--font-lxgw), system-ui, sans-serif");

        // PDF export always uses light theme colors for consistent output.
        targetDoc.documentElement.style.setProperty("--header-color", colorSet.light);
        targetDoc.documentElement.setAttribute("data-pdf-style", "cards");
        targetDoc.documentElement.style.setProperty("--pdf-font-scale", "1");
        targetDoc.documentElement.style.setProperty("--pdf-section-gap", "0.5rem");
      }

      // 打印前输出 HTML 内容到控制台，便于调试


      const el = componentRef.current as HTMLElement | null;
      if (el) {
        console.log("这是打印的HTML内容，复制以下内容进行调试：");
        console.log(el.innerHTML);
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
        --font-family: var(--font-lxgw), system-ui, sans-serif;
        --header-color: ${colorSet.light};
        --pdf-font-scale: 1;
        --pdf-section-gap: 0.5rem;
      }
      html, body { font-family: var(--font-lxgw), system-ui, sans-serif; margin: 0; }
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