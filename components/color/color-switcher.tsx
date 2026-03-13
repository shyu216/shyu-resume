"use client";

import React, { useState } from "react";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { useColor, HeaderColorType } from "./color-provider";
import { useThemeColor, useTextColor, useSoftShadow } from "@/lib/theme-utils";
import { colorPalettes } from "@/lib/theme-config";
import { cn } from "@/lib/utils";

// 从 theme-config 统一获取颜色选项
const colorOptions: { value: HeaderColorType; label: string; color: string }[] = [
  { value: "blue", label: "Blue", color: colorPalettes.blue.light },
  { value: "red", label: "Red", color: colorPalettes.red.light },
  { value: "purple", label: "Purple", color: colorPalettes.purple.light },
  { value: "green", label: "Green", color: colorPalettes.green.light },
  { value: "orange", label: "Orange", color: colorPalettes.orange.light },
  { value: "pink", label: "Pink", color: colorPalettes.pink.light },
  { value: "teal", label: "Teal", color: colorPalettes.teal.light },
  { value: "indigo", label: "Indigo", color: colorPalettes.indigo.light },
];

export function ColorSwitcher() {
  const { headerColor, setHeaderColor } = useColor();
  const [isOpen, setIsOpen] = useState(false);
  
  const surfaceColor = useThemeColor('surface');
  const borderColor = useThemeColor('border', 'default');
  const textColor = useTextColor();
  const shadow = useSoftShadow();

  return (
    <div className="relative">
      <ElegantTooltip content="Change header color" side="bottom">
        <button
          type="button"
          className={cn(
            "rounded-full px-3 py-2 bg-gradient-to-b ring-1 transition backdrop-blur duration-200 flex items-center justify-center"
          )}
          style={{
            boxShadow: shadow,
            borderColor: borderColor,
            background: `linear-gradient(to bottom, ${surfaceColor}80, ${surfaceColor}95)`,
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div 
            className="w-4 h-4 rounded-full border-2 border-white" 
            style={{ 
              backgroundColor: colorPalettes[headerColor]?.light || colorPalettes.blue.light
            }}
          />
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
          <div className="py-2 px-3">
            <h4 className="text-sm font-medium mb-2" style={{ color: textColor }}>
              Header Color
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((color) => (
                <ElegantTooltip key={color.value} content={color.label} side="bottom">
                  <button
                    type="button"
                    className={cn(
                      "w-8 h-8 rounded-full transition duration-150 ease-in-out flex items-center justify-center",
                      headerColor === color.value && "ring-2 ring-offset-2"
                    )}
                    style={{
                      backgroundColor: color.color,
                    }}
                    onClick={() => {
                      setHeaderColor(color.value);
                      setIsOpen(false);
                    }}
                  >
                    {headerColor === color.value && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </ElegantTooltip>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
