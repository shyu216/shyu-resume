"use client";

import React, { useState, useContext } from "react";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { LanguageContext } from "./language-provider";
import { languageOptions, type LanguageType } from "@/content/copy";
import { cn } from "@/content/config";

export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [hoveredLang, setHoveredLang] = useState<LanguageType | null>(null);

  React.useEffect(() => setMounted(true), []);

  const { language, setLanguage } = useContext(LanguageContext);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex gap-1">
      {languageOptions.map((lang) => {
        const isSelected = language === lang.value;
        const isHovered = hoveredLang === lang.value;
        const hasHover = hoveredLang !== null;
        const shouldScale = isHovered || (isSelected && !hasHover);

        return (
          <ElegantTooltip key={lang.value} content={lang.name} side="bottom">
            <button
              type="button"
              aria-label={`Switch to ${lang.name}`}
              className={cn(
                "rounded-full px-3 py-2 bg-gradient-to-b font-bold ring-1 transition-all duration-200 backdrop-blur",
                !shouldScale && "scale-90"
              )}
              style={{
                boxShadow: 'var(--shadow-soft)',
                borderColor: 'var(--color-border-default)',
                background: isSelected
                  ? `linear-gradient(to bottom, color-mix(in srgb, var(--header-color) 90%, transparent), color-mix(in srgb, var(--header-color) 70%, transparent))`
                  : `linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 80%, transparent), color-mix(in srgb, var(--color-surface) 95%, transparent))`,
                color: isSelected ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
              }}
              onClick={() => setLanguage(lang.value)}
              onMouseEnter={() => setHoveredLang(lang.value)}
              onMouseLeave={() => setHoveredLang(null)}
            >
              <span className={cn(
                "transition-transform duration-200 inline-block",
                shouldScale ? "scale-100" : "scale-90"
              )}>
                {lang.label}
              </span>
            </button>
          </ElegantTooltip>
        );
      })}
    </div>
  );
}
