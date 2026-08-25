"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { usePrint } from "@/components/print-provider";
import { LanguageContext } from "@/components/lang/language-provider";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { copy, jobOptions, type JobType } from "@/content/copy";
import { getJobTooltip } from "@/content/config";
import { useJobType } from "@/components/job/job-type-provider";

export function FloatingActionButton() {
  const { handlePrint } = usePrint();
  const { language, isTransitioning } = useContext(LanguageContext);
  const { jobType, setJobType } = useJobType();
  const uiCopy = copy[language];
  const [bottomOffset, setBottomOffset] = useState(80);
  const [rightOffset, setRightOffset] = useState(24);
  const buttonRef = useRef<HTMLDivElement>(null);

  const isNoneActive = jobType === "NONE";
  const allLabel = uiCopy.switcher.jobType.options.NONE.label;

  // 测量 header 玻璃 div 的右边缘，使按钮与之对齐
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const glassDiv = header.querySelector('[data-glass="true"]') as HTMLElement | null;
    if (!glassDiv) return;

    const updateRightOffset = () => {
      const rect = glassDiv.getBoundingClientRect();
      const offset = window.innerWidth - rect.right;
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

  // 滚动时保持与 footer 的间距
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

  const activeStyle = (isActive: boolean): React.CSSProperties => ({
    background: isActive
      ? `linear-gradient(to bottom, color-mix(in srgb, var(--header-color) 90%, transparent), color-mix(in srgb, var(--header-color) 70%, transparent))`
      : "var(--color-overlay)",
    color: isActive ? "var(--color-text-secondary)" : "var(--color-text-primary)",
  });

  return (
    <div
      ref={buttonRef}
      className="fixed z-40 print:hidden lg:hidden transition-all duration-300 ease-out"
      style={{ bottom: `${bottomOffset}px`, right: `${rightOffset}px` }}
    >
      <div className="flex flex-col gap-1 rounded-xl bg-card-mix backdrop-blur-sm ring-1 ring-default shadow-soft p-2">
        {jobOptions.map((option) => {
          const isActive = jobType === option.value;
          return (
            <ElegantTooltip key={option.value} content={getJobTooltip(option, language)} side="left">
              <button
                type="button"
                onClick={() => setJobType(option.value as JobType)}
                className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105"
                style={activeStyle(isActive)}
              >
                {option.label}
              </button>
            </ElegantTooltip>
          );
        })}
        <ElegantTooltip content={uiCopy.switcher.jobType.options.NONE.tooltip} side="left">
          <button
            type="button"
            onClick={() => setJobType("NONE")}
            className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105"
            style={activeStyle(isNoneActive)}
          >
            {allLabel}
          </button>
        </ElegantTooltip>

        <hr className="border-t border-default my-1" />

        <ElegantTooltip content={uiCopy.actionButton.tooltip} side="left">
          <button
            type="button"
            aria-label={uiCopy.actionButton.ariaLabel}
            className="w-full rounded-xl bg-gradient-to-b px-3 py-2 ring-1 ring-default backdrop-blur transition-all duration-200 hover:scale-105 shadow-soft font-bold text-secondary text-sm"
            onClick={handlePrint}
            style={{
              background: `linear-gradient(to bottom, color-mix(in srgb, var(--header-color) 90%, transparent), color-mix(in srgb, var(--header-color) 70%, transparent))`,
            }}
          >
            <span
              className={`transition-all duration-200 inline-block whitespace-nowrap ${
                isTransitioning ? "opacity-0 scale-75" : "opacity-100 scale-100"
              }`}
            >
              {uiCopy.actionButton.liveText}
            </span>
          </button>
        </ElegantTooltip>
      </div>
    </div>
  );
}