"use client";

import React, { useState, useContext } from "react";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { LanguageContext, type LanguageType } from "./language-provider";
import { cn } from "@/lib/utils";
import { useHeaderColor, useThemeColor, useTextColor, useSoftShadow } from "@/lib/theme-utils";

const languages: { label: string; value: LanguageType; name: string }[] = [
  {
    label: "简",
    value: "zh",
    name: "简体中文",
  },
  {
    label: "日",
    value: "ja",
    name: "日本語",
  },
  {
    label: "FR",
    value: "fr",
    name: "Français",
  },
];

export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [hoveredLang, setHoveredLang] = useState<LanguageType | null>(null);

  React.useEffect(() => setMounted(true), []);

  const { language, setLanguage } = useContext(LanguageContext);
  const headerColor = useHeaderColor();
  const surfaceColor = useThemeColor('surface');
  const borderColor = useThemeColor('border', 'default');
  const textColor = useTextColor();
  const shadow = useSoftShadow();

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex gap-1">
      {languages.map((lang) => {
        const isSelected = language === lang.value;
        const isHovered = hoveredLang === lang.value;
        const hasHover = hoveredLang !== null;
        
        // 同时只有一个放大：hover 的优先，否则选中状态放大
        const shouldScale = isHovered || (isSelected && !hasHover);
        
        return (
          <ElegantTooltip key={lang.value} content={lang.name} side="bottom">
            <button
              type="button"
              aria-label={`Switch to ${lang.name}`}
              className={cn(
                "rounded-full px-3 py-2 bg-gradient-to-b font-bold ring-1 transition-all duration-200 backdrop-blur",
                shouldScale && "scale-105"
              )}
              style={{
                boxShadow: shadow,
                borderColor: borderColor,
                background: isSelected 
                  ? `linear-gradient(to bottom, ${headerColor}90, ${headerColor}70)` 
                  : `linear-gradient(to bottom, ${surfaceColor}80, ${surfaceColor}95)`,
                color: isSelected ? '#ffffff' : textColor,
              }}
              onClick={() => setLanguage(lang.value)}
              onMouseEnter={() => setHoveredLang(lang.value)}
              onMouseLeave={() => setHoveredLang(null)}
            >
              <span className={cn(
                "transition-transform duration-200 inline-block",
                shouldScale ? "scale-105" : "scale-100"
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
