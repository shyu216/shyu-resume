"use client";

import React, { useState, useEffect } from "react";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { useFontFamily } from "./font-provider";
import { FontFamilyType, fontFamilies } from "@/lib/theme-config";
import { useThemeColor, useTextColor, useSoftShadow, useHeaderColor } from "@/lib/theme-utils";
import { cn } from "@/lib/utils";


// 字体选项
const fontOptions: { value: FontFamilyType; label: string }[] = [
  { value: "inter", label: "Inter" },
  { value: "jetbrains-mono", label: "JetBrains Mono" },
  { value: "system-ui", label: "System UI" },
  { value: "monospace", label: "Monospace" },
  { value: "serif", label: "Serif" },
];

export function FontSwitcher() {
  const { fontFamily, setFontFamily } = useFontFamily();
  const [isOpen, setIsOpen] = useState(false);
  
  const surfaceColor = useThemeColor('surface');
  const borderColor = useThemeColor('border', 'default');
  const textColor = useTextColor();
  const headerColor = useHeaderColor();
  const shadow = useSoftShadow();

  // 字体切换时输出console.log
  useEffect(() => {
    console.log(`[FontSwitcher] Font switched to: ${fontFamily} (${fontFamilies[fontFamily]?.name || 'Unknown'})`);
    console.log(`[FontSwitcher] Font stack: ${fontFamilies[fontFamily]?.fontStack.join(", ") || 'N/A'}`);
  }, [fontFamily]);

  return (
    <div className="relative">
      <ElegantTooltip content="Change font" side="bottom">
        <button
          type="button"
          className={cn(
            "rounded-full px-3 py-2 bg-gradient-to-b font-bold ring-1 transition backdrop-blur duration-200 flex items-center gap-1"
          )}
          style={{
            boxShadow: shadow,
            borderColor: borderColor,
            background: `linear-gradient(to bottom, ${surfaceColor}80, ${surfaceColor}95)`,
            color: textColor,
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xs">Aa</span>
        </button>
      </ElegantTooltip>
      
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-1 w-48 rounded-md shadow-lg bg-surface ring-1 ring-border-default z-50"
          style={{
            boxShadow: shadow,
            borderColor: borderColor,
            backgroundColor: surfaceColor,
          }}
        >
          <div className="py-1">
            {fontOptions.map((font) => (
              <button
                key={font.value}
                type="button"
                className={cn(
                  "block w-full text-left px-4 py-2 text-sm transition duration-150 ease-in-out",
                  fontFamily === font.value
                    ? "bg-primary text-white"
                    : "hover:bg-surface/80"
                )}
                style={{
                  color: fontFamily === font.value ? '#ffffff' : textColor,
                  backgroundColor: fontFamily === font.value ? headerColor : undefined,
                }}
                onClick={() => {
                  setFontFamily(font.value);
                  setIsOpen(false);
                }}
              >
                <span style={{ fontFamily: fontFamilies[font.value].fontStack.join(", ") }}>
                  {font.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
