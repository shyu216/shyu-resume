"use client";

import React from "react";
import { useTheme } from "next-themes";
import { LanguageContext } from "@/components/lang/language-provider";
import { useJobType } from "@/components/job/job-type-provider";
import { getBgStyle, getBgStyleBindingMode } from "@/content/config";
import {
  BG_STYLE_PRESETS,
  type BgStylePreset,
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

function getBgStylePresetById(styleId: string): BgStylePreset {
  return BG_STYLE_PRESETS.find((item) => item.id === styleId) ?? defaultStyle;
}

export function BgStyleProvider({ children }: { children: React.ReactNode }) {
  const { language } = React.useContext(LanguageContext);
  const { jobType: profile } = useJobType();
  const { resolvedTheme } = useTheme();
  const [activeStyle, setActiveStyle] = React.useState<BgStylePreset>(defaultStyle);
  const switchKeyRef = React.useRef<string>("");
  const prevProfileRef = React.useRef<string>(profile);

  React.useEffect(() => {
    const mode = getBgStyleBindingMode();
    const nextSwitchKey = `${language}:${profile}:${resolvedTheme ?? "system"}`;
    const profileChanged = prevProfileRef.current !== profile;
    prevProfileRef.current = profile;

    const shouldUpdateOnThisInteraction =
      mode === "random"
      || profileChanged
      || !switchKeyRef.current;

    if (!shouldUpdateOnThisInteraction) {
      switchKeyRef.current = nextSwitchKey;
      return;
    }

    const nextStyleId = getBgStyle(profile);

    if (!switchKeyRef.current) {
      switchKeyRef.current = nextSwitchKey;

      const nextStyle = getBgStylePresetById(nextStyleId);
      setActiveStyle(nextStyle);
      document.documentElement.setAttribute("data-bg-style", nextStyle.id);
      return;
    }

    if (switchKeyRef.current === nextSwitchKey) {
      return;
    }

    switchKeyRef.current = nextSwitchKey;

    const nextStyle = getBgStylePresetById(nextStyleId);
    setActiveStyle(nextStyle);
    document.documentElement.setAttribute("data-bg-style", nextStyle.id);
  }, [language, profile, resolvedTheme]);

  const value = React.useMemo(
    () => ({ styleId: activeStyle.id, motion: activeStyle.motion }),
    [activeStyle]
  );

  return <BgStyleContext.Provider value={value}>{children}</BgStyleContext.Provider>;
}

export function useBgStyle() {
  return React.useContext(BgStyleContext);
}
