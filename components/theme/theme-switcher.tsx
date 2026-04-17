"use client";

import { useTheme } from "next-themes";
import React, { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { Icons } from "@/components/ui/icons";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { copy } from "@/content/copy";
import { cn } from "@/content/config";

const themes = [
  { value: "light", icon: Icons.Sun },
  { value: "dark", icon: Icons.Moon },
];

export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const { language } = useContext(LanguageContext);
  const uiCopy = copy[language];

  const ThemeIcon = React.useMemo(
    () => themes.find((t) => t.value === resolvedTheme)?.icon ?? Icons.Sun,
    [resolvedTheme]
  );

  React.useEffect(() => setMounted(true), []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const tooltipContent = resolvedTheme === "dark" ? uiCopy.themeSwitcher.tooltip.dark : uiCopy.themeSwitcher.tooltip.light;

  if (!mounted) {
    return null;
  }

  return (
    <ElegantTooltip content={tooltipContent} side="bottom">
      <button
        type="button"
        aria-label={uiCopy.themeSwitcher.ariaLabel}
        className={cn(
          "group rounded-full bg-gradient-to-b px-3 py-2 ring-1 backdrop-blur transition-all duration-200 hover:scale-105"
        )}
        style={{
          boxShadow: 'var(--shadow-soft)',
          borderColor: 'var(--color-border-default)',
          background: `linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 80%, transparent), color-mix(in srgb, var(--color-surface) 95%, transparent))`,
        }}
        onClick={toggleTheme}
      >
        <ThemeIcon
          className="h-6 w-6 p-0.5 transition-all duration-200 group-hover:rotate-12"
          style={{
            stroke: 'var(--color-text-primary)',
            transition: 'stroke 0.2s ease, transform 0.2s ease'
          }}
        />
      </button>
    </ElegantTooltip>
  );
}
