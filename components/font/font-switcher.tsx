"use client";

import React, { useState, useContext } from "react";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { useFontFamily } from "./font-provider";
import { FontFamilyType, fontFamilies } from "@/lib/theme-config";
import { LanguageContext } from "@/components/lang/language-provider";
import type { LanguageType } from "@/components/lang/language-provider";
import { useLanguageMap } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useDropdownMenu } from "@/lib/hooks/use-dropdown-menu";

const fontLabels: Record<FontFamilyType, Record<LanguageType, string>> = {
  "inter": { zh: "Inter", ja: "Inter", fr: "Inter" },
  "jetbrains-mono": { zh: "JetBrains Mono", ja: "JetBrains Mono", fr: "JetBrains Mono" },
  "system-ui": { zh: "系统字体", ja: "システムフォント", fr: "Police système" },
  "monospace": { zh: "等宽字体", ja: "等幅フォント", fr: "Police monospace" },
  "serif": { zh: "衬线体", ja: "明朝体", fr: "Police à empattements" },
};

const fontPreviewText: Record<LanguageType, string> = {
  zh: "天地玄黄宇宙洪荒",
  ja: "あいうえおかきくけこ",
  fr: "Le renard brun rapide",
};

const tooltipText: Record<LanguageType, string> = {
  zh: "切换字体",
  ja: "フォントを変更",
  fr: "Changer la police",
};

const headerText: Record<LanguageType, string> = {
  zh: "字体",
  ja: "フォント",
  fr: "Typographie",
};

export function FontSwitcher() {
  const { fontFamily, setFontFamily } = useFontFamily();
  const [isHovering, setIsHovering] = useState<FontFamilyType | null>(null);

  const { language } = useContext(LanguageContext);

  const currentLabel = useLanguageMap(fontLabels[fontFamily], language);
  const tipText = useLanguageMap(tooltipText, language);
  const headerLabel = useLanguageMap(headerText, language);
  const previewText = useLanguageMap(fontPreviewText, language);

  const previewFont = isHovering || fontFamily;

  const { isOpen, setIsOpen, containerRef, menuRef, menuPosition } = useDropdownMenu({
    menuWidth: 256
  });

  return (
    <div className="relative" ref={containerRef}>
      <ElegantTooltip content={tipText} side="bottom">
        <button
          type="button"
          className={cn(
            "rounded-full px-3 py-2 bg-gradient-to-b font-bold ring-1 transition-all duration-200 backdrop-blur flex items-center gap-1.5 min-w-[80px] justify-center",
            "hover:brightness-105 hover:scale-105"
          )}
          style={{
            boxShadow: 'var(--shadow-soft)',
            borderColor: 'var(--color-border-default)',
            background: `linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 80%, transparent), color-mix(in srgb, var(--color-surface) 95%, transparent))`,
            color: 'var(--color-text-primary)',
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
          ref={menuRef}
          className="absolute top-full mt-2 w-64 rounded-xl shadow-lg z-50 overflow-hidden"
          style={{
            boxShadow: 'var(--shadow-soft)',
            borderColor: 'var(--color-border-default)',
            backgroundColor: 'var(--color-surface)',
            ...menuPosition,
          }}
        >
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: 'var(--color-border-default)' }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)', opacity: 0.7 }}>
              {headerLabel}
            </h4>
            <p
              className="text-lg mt-1 transition-all duration-150"
              style={{
                fontFamily: fontFamilies[previewFont].fontStack.join(", "),
                color: 'var(--header-color)',
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
                    color: isSelected ? 'var(--header-color)' : 'var(--color-text-primary)',
                    backgroundColor: isSelected ? 'color-mix(in srgb, var(--header-color) 15%, transparent)' : undefined,
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
                      style={{ color: 'var(--header-color)' }}
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
