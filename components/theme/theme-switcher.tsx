"use client";

import { useTheme } from "next-themes";
import React, { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { Icons } from "@/components/ui/icons";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { copy } from "@/content/copy";
import { cn } from "@/content/config";

export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const { language } = useContext(LanguageContext);
  const uiCopy = copy[language];

  React.useEffect(() => setMounted(true), []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const isDark = resolvedTheme === "dark";
  const tooltipContent = isDark ? uiCopy.themeSwitcher.tooltip.dark : uiCopy.themeSwitcher.tooltip.light;

  if (!mounted) {
    return null;
  }

  return (
    <ElegantTooltip content={tooltipContent} side="bottom">
      <button
        type="button"
        aria-label={uiCopy.themeSwitcher.ariaLabel}
        className={cn(
          "group rounded-full bg-gradient-to-b px-3 py-2 ring-1 ring-default backdrop-blur transition-all duration-200 hover:scale-105 shadow-soft border-default"
        )}
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 80%, transparent), color-mix(in srgb, var(--color-surface) 95%, transparent))`,
        }}
        onClick={toggleTheme}
      >
        <div className="relative h-6 w-6 group-hover:rotate-12 transition-transform duration-200">
          <Icons.Sun
            className="absolute inset-0 h-full w-full p-0.5 text-primary transition-all duration-300"
            style={{
              opacity: isDark ? 1 : 0,
              transform: `scale(${isDark ? 1 : 0.5}) rotate(${isDark ? 0 : 90}deg)`,
            }}
          />
          <Icons.Moon
            className="absolute inset-0 h-full w-full p-0.5 text-primary transition-all duration-300"
            style={{
              opacity: isDark ? 0 : 1,
              transform: `scale(${isDark ? 0.5 : 1}) rotate(${isDark ? -90 : 0}deg)`,
            }}
          />
        </div>
      </button>
    </ElegantTooltip>
  );
}
