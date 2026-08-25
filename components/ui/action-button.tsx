"use client";

import { usePrint } from "@/components/print-provider";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { copy } from "@/content/copy";

export default function ActionButton() {
  const { handlePrint } = usePrint();
  const { language, isTransitioning } = useContext(LanguageContext);
  const uiCopy = copy[language];

  return (
    <ElegantTooltip content={uiCopy.actionButton.tooltip} side="bottom">
      <button
        type="button"
        aria-label={uiCopy.actionButton.ariaLabel}
        className="group rounded-xl bg-gradient-to-b px-3 py-2 ring-1 ring-default backdrop-blur transition-all duration-200 hover:scale-105 shadow-soft"
        onClick={handlePrint}
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, var(--header-color) 90%, transparent), color-mix(in srgb, var(--header-color) 70%, transparent))`,
        }}
      >
        <span className={`font-bold transition-all duration-200 inline-block text-secondary whitespace-nowrap ${
          isTransitioning ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}>
          {uiCopy.actionButton.liveText}
        </span>
      </button>
    </ElegantTooltip>
  );
}