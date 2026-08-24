"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { usePrint } from "@/components/print-provider";
import { LanguageContext } from "@/components/lang/language-provider";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { copy } from "@/content/copy";

export function FloatingActionButton() {
  const { handlePrint } = usePrint();
  const { language, isTransitioning } = useContext(LanguageContext);
  const uiCopy = copy[language];
  const [bottomOffset, setBottomOffset] = useState(80);
  const [rightOffset, setRightOffset] = useState(24); // 默认 right-6
  const buttonRef = useRef<HTMLDivElement>(null);

  // 测量 header 玻璃 div 的右边缘，使按钮与之对齐
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const glassDiv = header.querySelector('[data-glass="true"]') as HTMLElement | null;
    if (!glassDiv) return;

    const updateRightOffset = () => {
      const rect = glassDiv.getBoundingClientRect();
      const offset = window.innerWidth - rect.right;
      // 最小 4px 防止贴边；四舍五入到整数避免 sub-pixel 抖动
      setRightOffset(Math.max(Math.round(offset), 4));
    };

    const observer = new ResizeObserver(updateRightOffset);
    observer.observe(header);
    observer.observe(glassDiv);
    updateRightOffset();

    window.addEventListener("resize", updateRightOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateRightOffset);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    let ticking = false;

    const updatePosition = () => {
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const gap = 24;
      const defaultOffset = 80;

      if (footerRect.top < viewportHeight) {
        // Footer 进入视口：按钮上移，保持 gap 间距
        const spaceAboveFooter = viewportHeight - footerRect.top;
        setBottomOffset(Math.max(defaultOffset, spaceAboveFooter + gap));
      } else {
        setBottomOffset(defaultOffset);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updatePosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updatePosition();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={buttonRef}
      className="fixed z-40 print:hidden transition-all duration-300 ease-out"
      style={{ bottom: `${bottomOffset}px`, right: `${rightOffset}px` }}
    >
      <ElegantTooltip content={uiCopy.actionButton.tooltip} side="left">
        <button
          type="button"
          aria-label={uiCopy.actionButton.ariaLabel}
          className="group rounded-xl bg-gradient-to-b px-3 py-2 ring-1 ring-default backdrop-blur transition-all duration-200 hover:scale-105 shadow-soft"
          onClick={handlePrint}
          style={{
            background: `linear-gradient(to bottom, color-mix(in srgb, var(--header-color) 90%, transparent), color-mix(in srgb, var(--header-color) 70%, transparent))`,
          }}
        >
          <span
            className={`font-bold transition-all duration-200 inline-block text-secondary whitespace-nowrap ${
              isTransitioning ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
          >
            {uiCopy.actionButton.liveText}
          </span>
        </button>
      </ElegantTooltip>
    </div>
  );
}