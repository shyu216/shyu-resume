"use client";

import React from "react";
import { useTheme } from "next-themes";
import { LanguageContext } from "@/components/lang/language-provider";
import { useJobType } from "@/components/job/job-type-provider";
import {
  BG_STYLE_PRESETS,
  type BgStylePreset,
  pickDifferentBgStyle,
  pickRandomBgStyle,
} from "@/app/bg-styles/presets";

type BgStyleContextValue = {
  styleId: string;
  motion: BgStylePreset["motion"];
};

const defaultStyle = BG_STYLE_PRESETS[0];

const BgStyleContext = React.createContext<BgStyleContextValue>({
  styleId: defaultStyle.id,
  motion: defaultStyle.motion,
});

export function BgStyleProvider({ children }: { children: React.ReactNode }) {
  const { language } = React.useContext(LanguageContext);
  const { jobType } = useJobType();
  const { resolvedTheme } = useTheme();
  const [activeStyle, setActiveStyle] = React.useState<BgStylePreset>(defaultStyle);
  const switchKeyRef = React.useRef<string>("");

  React.useEffect(() => {
    const nextStyle = pickRandomBgStyle();
    setActiveStyle(nextStyle);
    document.documentElement.setAttribute("data-bg-style", nextStyle.id);
  }, []);

  React.useEffect(() => {
    const nextSwitchKey = `${language}:${jobType}:${resolvedTheme ?? "system"}`;

    if (!switchKeyRef.current) {
      switchKeyRef.current = nextSwitchKey;
      return;
    }

    if (switchKeyRef.current === nextSwitchKey) {
      return;
    }

    switchKeyRef.current = nextSwitchKey;

    setActiveStyle((current) => {
      const nextStyle = pickDifferentBgStyle(current.id);
      document.documentElement.setAttribute("data-bg-style", nextStyle.id);
      return nextStyle;
    });
  }, [language, jobType, resolvedTheme]);

  const value = React.useMemo(
    () => ({ styleId: activeStyle.id, motion: activeStyle.motion }),
    [activeStyle]
  );

  return <BgStyleContext.Provider value={value}>{children}</BgStyleContext.Provider>;
}

export function useBgStyle() {
  return React.useContext(BgStyleContext);
}
