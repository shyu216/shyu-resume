"use client";

import React, { useState, useContext } from "react";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { useColor, HeaderColorType } from "./color-provider";
import { useTheme } from "next-themes";
import { useThemeColor, useTextColor, useSoftShadow } from "@/lib/theme-utils";
import { colorPalettes } from "@/lib/theme-config";
import { LanguageContext } from "@/components/lang/language-provider";
import type { LanguageType } from "@/components/lang/language-provider";
import { useLanguageMap } from "@/lib/utils";
import { cn } from "@/lib/utils";

const colorLabels: Record<HeaderColorType, Record<LanguageType, string>> = {
  blue: { en: "Ocean", zh: "海洋蓝", "zh-hk": "海洋藍" },
  red: { en: "Coral", zh: "珊瑚红", "zh-hk": "珊瑚紅" },
  purple: { en: "Violet", zh: "紫罗兰", "zh-hk": "紫羅蘭" },
  green: { en: "Forest", zh: "森林绿", "zh-hk": "森林綠" },
  orange: { en: "Sunset", zh: "日落橙", "zh-hk": "日落橙" },
  pink: { en: "Sakura", zh: "樱花粉", "zh-hk": "櫻花粉" },
  teal: { en: "Teal", zh: "青绿色", "zh-hk": "青綠色" },
  indigo: { en: "Indigo", zh: "靛青色", "zh-hk": "靛青色" },
};

const tooltipText: Record<LanguageType, string> = {
  en: "Change header color",
  zh: "切换标题颜色",
  "zh-hk": "切換標題顏色",
};

const headerText: Record<LanguageType, string> = {
  en: "Header Color",
  zh: "标题颜色",
  "zh-hk": "標題顏色",
};

export function ColorSwitcher() {
  const { headerColor, setHeaderColor } = useColor();
  const { resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState<HeaderColorType | null>(null);
  
  const { language } = useContext(LanguageContext);
  const surfaceColor = useThemeColor('surface');
  const borderColor = useThemeColor('border', 'default');
  const textColor = useTextColor();
  const shadow = useSoftShadow();

  const tipText = useLanguageMap(tooltipText, language);
  const headerLabel = useLanguageMap(headerText, language);

  const currentColor = isHovering || headerColor;
  const currentPalette = colorPalettes[currentColor];
  const currentColorValue = currentPalette?.[resolvedTheme === 'dark' ? 'dark' : 'light'] || colorPalettes.red.light;

  return (
    <div className="relative">
      <ElegantTooltip content={tipText} side="bottom">
        <button
          type="button"
          className={cn(
            "rounded-full px-3 py-2 bg-gradient-to-b ring-1 transition-all duration-200 backdrop-blur flex items-center gap-1.5"
          )}
          style={{
            boxShadow: shadow,
            borderColor: borderColor,
            background: `linear-gradient(to bottom, ${surfaceColor}80, ${surfaceColor}95)`,
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div 
            className="w-4 h-4 rounded-full border-2 border-white transition-transform duration-200 hover:scale-110"
            style={{ 
              backgroundColor: currentColorValue,
            }}
          />
        </button>
      </ElegantTooltip>
      
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-56 rounded-xl shadow-lg bg-surface ring-1 ring-border-default z-50 overflow-hidden"
          style={{
            boxShadow: shadow,
            borderColor: borderColor,
            backgroundColor: surfaceColor,
          }}
        >
          <div 
            className="px-4 py-3 border-b transition-all duration-200"
            style={{ 
              borderColor: borderColor,
              background: `linear-gradient(to right, ${currentColorValue}20, transparent)`,
            }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: textColor, opacity: 0.7 }}>
              {headerLabel}
            </h4>
            <p 
              className="text-sm mt-1 font-medium transition-all duration-200"
              style={{ 
                color: currentColorValue,
              }}
            >
              {colorLabels[currentColor][language]}
            </p>
          </div>
          
          <div className="py-3 px-4">
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(colorLabels).map(([value, labels]) => {
                const colorValue = value as HeaderColorType;
                const isSelected = headerColor === colorValue;
                const isHover = isHovering === colorValue;
                const palette = colorPalettes[colorValue];
                const colorHex = palette?.[resolvedTheme === 'dark' ? 'dark' : 'light'];
                
                return (
                  <ElegantTooltip 
                    key={colorValue} 
                    content={labels[language]} 
                    side="bottom"
                  >
                    <button
                      type="button"
                      className={cn(
                        "group relative w-10 h-10 rounded-xl transition-all duration-200 flex items-center justify-center",
                        isSelected && "ring-2 ring-offset-2 ring-offset-surface",
                        isHover && !isSelected && "scale-110"
                      )}
                      style={{
                        backgroundColor: colorHex,
                        ...(isSelected ? { ringColor: colorHex } : {}),
                      }}
                      onClick={() => {
                        setHeaderColor(colorValue);
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setIsHovering(colorValue)}
                      onMouseLeave={() => setIsHovering(null)}
                    >
                      <span 
                        className={cn(
                          "absolute -bottom-5 text-[10px] font-medium whitespace-nowrap transition-opacity duration-150",
                          isHover ? "opacity-100" : "opacity-0"
                        )}
                        style={{ color: textColor }}
                      >
                        {labels[language]}
                      </span>
                      {isSelected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white drop-shadow-md"
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
                  </ElegantTooltip>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
