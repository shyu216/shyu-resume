"use client";

import React, { useState, useContext } from "react";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { LanguageContext } from "./language-provider";
import { useLanguageMap } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useHeaderColor, useThemeColor, useTextColor, useShadow, useSoftShadow } from "@/lib/theme-utils";

const languages = [
  {
    label: "ENG",
    value: "en",
    name: "English",
  },
  {
    label: "简",
    value: "zh",
    name: "简体中文",
  },
  {
    label: "繁",
    value: "zh-hk",
    name: "繁體中文",
  },
];


export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => setMounted(true), []);

  const { language, setLanguage } = useContext(LanguageContext);
  const headerColor = useHeaderColor();
  const surfaceColor = useThemeColor('surface');
  const borderColor = useThemeColor('border', 'default');
  const textColor = useTextColor();
  const textMuted = useTextColor();
  const shadow = useSoftShadow();

  // 统一提示文本
  const tipText = useLanguageMap({
    en: "Click to switch language",
    zh: "点击切换语言",
    "zh-hk": "點擊切換語言",
  }, language);

  if (!mounted) {
    return null;
  }

  return (
    <ElegantTooltip content={tipText} side="bottom">
      <div className="flex gap-1">
        {languages.map((lang) => (
          <button
            key={lang.value}
            type="button"
            aria-label={`Switch to ${lang.name}`}
            className={cn(
              "rounded-full px-3 py-2 bg-gradient-to-b font-bold ring-1 transition backdrop-blur duration-200",
              language === lang.value 
                ? "from-primary/90 to-primary/70 text-white"
                : "hover:from-surface/90 hover:to-surface/100"
            )}
            style={{
              boxShadow: shadow,
              borderColor: borderColor,
              background: language === lang.value 
                ? `linear-gradient(to bottom, ${headerColor}90, ${headerColor}70)` 
                : `linear-gradient(to bottom, ${surfaceColor}80, ${surfaceColor}95)`,
              color: language === lang.value ? '#ffffff' : textColor,
            }}
            onClick={() => setLanguage(lang.value as any)}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </ElegantTooltip>
  );
}