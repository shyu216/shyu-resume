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
        targetDoc.documentElement.style.setProperty("--pdf-section-padding", "0.08rem 0");

        // ====== 验证：所有注入值是否已生效 ======
        const html = targetDoc.documentElement;
        const body = targetDoc.body;
        console.log("=== PDF 注入变量验证 ===");
        console.log("--font-lxgw:",              html.style.getPropertyValue('--font-lxgw'));
        console.log("--font-family:",            html.style.getPropertyValue('--font-family'));
        console.log("--header-color:",           html.style.getPropertyValue('--header-color'));
        console.log("--pdf-font-scale:",         html.style.getPropertyValue('--pdf-font-scale'));
        console.log("--pdf-section-gap:",        html.style.getPropertyValue('--pdf-section-gap'));
        console.log("--pdf-section-padding:",    html.style.getPropertyValue('--pdf-section-padding'));
        console.log("data-pdf-style:",           html.getAttribute('data-pdf-style'));
        console.log("body font-family (computed):", getComputedStyle(body).fontFamily);
        console.log("body font-size (computed):",   getComputedStyle(body).fontSize);
        // 检查 @font-face 规则
        let fontFaceCount = 0;
        for (const sheet of targetDoc.styleSheets) {
          try {
            const rules = sheet.cssRules;
            if (!rules) continue;
            for (const rule of rules) {
              if (rule instanceof CSSFontFaceRule) fontFaceCount++;
            }
          } catch (_) { /* skip cross-origin */ }
        }
        console.log("@font-face 规则数:", fontFaceCount);
        // 检查字体加载状态
        if (targetDoc.fonts) {
          for (const f of targetDoc.fonts) {
            console.log("  字体:", f.family, "status:", f.status);
          }
        }

        // 打印 iframe 的 <html> 结构（含注入的 inline style + <head> 中的 @font-face）
        // 方便复制粘贴到本地 html 文件单独调试
        console.log("=== iframe HTML 结构（可复制调试）===");
        const htmlClone = html.cloneNode(true) as HTMLHtmlElement;
        // 清理 body 内容，只保留结构骨架
        const bodyClone = htmlClone.querySelector('body');
        if (bodyClone) {
          // 仅保留 body 上的 inline style，移除大量子内容
          while (bodyClone.firstChild) bodyClone.removeChild(bodyClone.firstChild);
          bodyClone.textContent = '...（内容省略）';
        }
        console.log(htmlClone.outerHTML);
        console.log("=== iframe HTML 结构结束 ===");
        // ====== 验证结束 ======
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