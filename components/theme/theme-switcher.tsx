"use client";

import { useTheme } from "next-themes";
import React, { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { Icons } from "@/components/ui/icons";
import { ElegantTooltip } from "@/components/ui/tooltip";


const themeLabels = {
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
};

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

  React.useEffect(() => setMounted(true), []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  if (!mounted) {
    return null;
  }

  return (
    <ElegantTooltip
      content={themeLabels[language]?.[theme as "light" | "dark"]}
      side="bottom"
    >
      <button
        type="button"
        aria-label="Change theme"
        className="group rounded-full bg-gradient-to-b from-stone-50/50 to-white/90 px-3 py-2 shadow-lg shadow-stone-700/5 ring-1 ring-stone-900/5 backdrop-blur transition dark:from-stone-900/50 dark:to-stone-700/90 dark:ring-white/10 dark:hover:ring-white/20"
        onClick={toggleTheme}
      >
        <ThemeIcon className="h-6 w-6 stroke-stone-500 p-0.5 transition group-hover:stroke-stone-700 dark:group-hover:stroke-stone-200" />
      </button>
    </ElegantTooltip>
  );
}
