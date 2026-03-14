"use client";

import { useTheme } from "next-themes";
import React, { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { Icons } from "@/components/ui/icons";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { useLanguageMap } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useThemeColor, useTextColor, useSoftShadow } from "@/lib/theme-utils";

const themes = [
  {
    value: "light",
    icon: Icons.Sun,
  },
  {
    value: "dark",
    icon: Icons.Moon,
  },
];
export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, theme, resolvedTheme } = useTheme();
  const { language } = useContext(LanguageContext);
  const ThemeIcon = React.useMemo(
    () => themes.find((t) => t.value === resolvedTheme)?.icon ?? Icons.Sun,
    [resolvedTheme]
  );
  
  const surfaceColor = useThemeColor('surface');
  const borderColor = useThemeColor('border', 'default');
  const textColor = useTextColor();
  const shadow = useSoftShadow();

  React.useEffect(() => setMounted(true), []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const tooltipMap = useLanguageMap({
    zh: {
      light: "切换至深色",
      dark: "切换至浅色",
    },
    ja: {
      light: "ダークモードに切り替え",
      dark: "ライトモードに切り替え",
    },
    fr: {
      light: "Passer en mode sombre",
      dark: "Passer en mode clair",
    },
  }, language);
  
  const tooltipContent = resolvedTheme === "dark" ? tooltipMap.dark : tooltipMap.light;

  if (!mounted) {
    return null;
  }

  return (
    <ElegantTooltip
      content={tooltipContent}
      side="bottom"
    >
      <button
        type="button"
        aria-label="Change theme"
        className={cn(
          "group rounded-full bg-gradient-to-b px-3 py-2 ring-1 backdrop-blur transition-all duration-200 hover:scale-105"
        )}
        style={{
          boxShadow: shadow,
          borderColor: borderColor,
          background: `linear-gradient(to bottom, ${surfaceColor}80, ${surfaceColor}95)`,
        }}
        onClick={toggleTheme}
      >
        <ThemeIcon
          size={16}
          className="transition-transform duration-300 group-hover:rotate-12"
          style={{ color: textColor }}
        />
      </button>
    </ElegantTooltip>
  );
}
