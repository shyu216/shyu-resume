"use client";

import React, { useState, useContext } from "react";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { useFontFamily } from "./font-provider";
import { FontFamilyType, fontFamilies } from "@/lib/theme-config";
import { useThemeColor, useTextColor, useSoftShadow, useHeaderColor } from "@/lib/theme-utils";
import { LanguageContext } from "@/components/lang/language-provider";
import type { LanguageType } from "@/components/lang/language-provider";
import { useLanguageMap } from "@/lib/utils";
import { cn } from "@/lib/utils";

const fontLabels: Record<FontFamilyType, Record<LanguageType, string>> = {
  "inter": { en: "Inter", zh: "Inter", "zh-hk": "Inter" },
  "jetbrains-mono": { en: "JetBrains Mono", zh: "JetBrains Mono", "zh-hk": "JetBrains Mono" },
  "system-ui": { en: "System UI", zh: "系统字体", "zh-hk": "系統字體" },
  "monospace": { en: "Monospace", zh: "等宽字体", "zh-hk": "等寬字體" },
  "serif": { en: "Serif", zh: "衬线体", "zh-hk": "襯線體" },
};

const fontPreviewText: Record<LanguageType, string> = {
  en: "The quick brown fox",
  zh: "天地玄黄宇宙洪荒",
  "zh-hk": "天地玄黃宇宙洪荒",
};

const tooltipText: Record<LanguageType, string> = {
  en: "Change font",
  zh: "切换字体",
  "zh-hk": "切換字體",
};

const headerText: Record<LanguageType, string> = {
  en: "Typography",
  zh: "字体",
  "zh-hk": "字體",
};

export function FontSwitcher() {
  const { fontFamily, setFontFamily } = useFontFamily();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState<FontFamilyType | null>(null);
  
  const { language } = useContext(LanguageContext);
  const surfaceColor = useThemeColor('surface');
  const borderColor = useThemeColor('border', 'default');
  const textColor = useTextColor();
  const headerColor = useHeaderColor();
  const shadow = useSoftShadow();

  const currentLabel = useLanguageMap(fontLabels[fontFamily], language);
  const tipText = useLanguageMap(tooltipText, language);
  const headerLabel = useLanguageMap(headerText, language);
  const previewText = useLanguageMap(fontPreviewText, language);

  const previewFont = isHovering || fontFamily;

  return (
    <div className="relative">
      <ElegantTooltip content={tipText} side="bottom">
        <button
          type="button"
          className={cn(
            "rounded-full px-3 py-2 bg-gradient-to-b font-bold ring-1 transition-all duration-200 backdrop-blur flex items-center gap-1.5 min-w-[80px] justify-center",
            "hover:brightness-105 hover:scale-105"
          )}
          style={{
            boxShadow: shadow,
            borderColor: borderColor,
            background: `linear-gradient(to bottom, ${surfaceColor}80, ${surfaceColor}95)`,
            color: textColor,
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <>
              <span 
                className="text-xs"
                style={{ fontFamily: fontFamilies[fontFamily].fontStack.join(", ") }}
              >
                Aa
              </span>
              <span className="text-[10px] opacity-60">
                {currentLabel}
              </span>
            </>
          )}
        </button>
      </ElegantTooltip>
      
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-64 rounded-xl shadow-lg bg-surface ring-1 ring-border-default z-50 overflow-hidden"
          style={{
            boxShadow: shadow,
            borderColor: borderColor,
            backgroundColor: surfaceColor,
          }}
        >
          <div 
            className="px-4 py-3 border-b"
            style={{ borderColor: borderColor }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: textColor, opacity: 0.7 }}>
              {headerLabel}
            </h4>
            <p 
              className="text-lg mt-1 transition-all duration-150"
              style={{ 
                fontFamily: fontFamilies[previewFont].fontStack.join(", "),
                color: headerColor,
              }}
            >
              {previewText}
            </p>
          </div>
          
          <div className="py-1 max-h-64 overflow-y-auto">
            {Object.entries(fontLabels).map(([value, labels]) => {
              const fontValue = value as FontFamilyType;
              const isSelected = fontFamily === fontValue;
              const isHover = isHovering === fontValue;
              
              return (
                <button
                  key={fontValue}
                  type="button"
                  className={cn(
                    "block w-full text-left px-4 py-2.5 text-sm transition-all duration-150 ease-in-out flex items-center justify-between",
                    isSelected && "bg-primary/10",
                    isHover && !isSelected && "bg-surface/80"
                  )}
                  style={{
                    color: isSelected ? headerColor : textColor,
                    backgroundColor: isSelected ? `${headerColor}15` : undefined,
                  }}
                  onClick={() => {
                    setFontFamily(fontValue);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setIsHovering(fontValue)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <span 
                    className="flex items-center gap-2"
                    style={{ fontFamily: fontFamilies[fontValue].fontStack.join(", ") }}
                  >
                    <span className="text-base">Aa</span>
                    <span className="text-xs opacity-70">{labels[language]}</span>
                  </span>
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
