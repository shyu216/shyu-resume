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
    () => themes.find((t) => t.value === theme)?.icon ?? Icons.Lightning,
    [theme]
  );
  
  const surfaceColor = useThemeColor('surface');
  const borderColor = useThemeColor('border', 'default');
  const textColor = useTextColor();
  const shadow = useSoftShadow();

  React.useEffect(() => setMounted(true), []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const tooltipContent = useLanguageMap({
    en: {
      light: "Click to switch to Dark Mode",
      dark: "Click to switch to Light Mode",
    },
    zh: {
      light: "点击切换为深色模式",
      dark: "点击切换为浅色模式",
    },
    'zh-hk': {
      light: "點擊切換為深色模式",
      dark: "點擊切換為淺色模式",
    },
  }, language)[theme as "light" | "dark"];

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
          "group rounded-full bg-gradient-to-b px-3 py-2 ring-1 backdrop-blur transition"
        )}
        style={{
          boxShadow: shadow,
          borderColor: borderColor,
          background: `linear-gradient(to bottom, ${surfaceColor}80, ${surfaceColor}95)`,
        }}
        onClick={toggleTheme}
      >
        <ThemeIcon 
          className="h-6 w-6 p-0.5 transition group-hover:stroke-opacity-100"
          style={{ 
            stroke: textColor, 
            transition: 'stroke 0.2s ease'
          }}
        />
      </button>
    </ElegantTooltip>
  );
}