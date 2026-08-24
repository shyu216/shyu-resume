"use client";

import React, { useContext } from "react";
import { LanguageContext } from "./language-provider";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { cn } from "@/content/config";

export function BilangSwitch() {
  const [mounted, setMounted] = React.useState(false);
  const { language, setLanguage } = useContext(LanguageContext);

  React.useEffect(() => setMounted(true), []);

  function toggleLanguage() {
    setLanguage(language === "en" ? "zh" : "en");
  }

  const displayLabel = language === "en" ? "中" : "EN";
  const tooltipContent = language === "en" ? "切换至中文" : "Switch to English";

  if (!mounted) {
    return null;
  }

  return (
    <ElegantTooltip content={tooltipContent} side="bottom">
      <button
        type="button"
        aria-label={tooltipContent}
        className={cn(
          "group rounded-full bg-gradient-to-b px-3 py-2 ring-1 backdrop-blur transition-all duration-200 hover:scale-105 shadow-soft"
        )}
        style={{
          borderColor: 'var(--color-border-default)',
          background: `linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 80%, transparent), color-mix(in srgb, var(--color-surface) 95%, transparent))`,
        }}
        onClick={toggleLanguage}
      >
        <span
          className="font-bold transition-all duration-200 group-hover:scale-110 inline-block text-primary"
        >
          {displayLabel}
        </span>
      </button>
    </ElegantTooltip>
  );
}