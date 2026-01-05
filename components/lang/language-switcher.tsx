"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useContext } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { LanguageContext } from "./language-provider";

const languages = [
  {
    label: "ENG",
    value: "en",
    name: "English",
  },
  {
    label: "简",
    value: "zh",
    name: "简体中文",
  },
  {
    label: "繁",
    value: "zh-hk",
    name: "繁體中文",
  },
];



export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  React.useEffect(() => setMounted(true), []);

  const { language, setLanguage } = useContext(LanguageContext);


  // 统一提示文本
  const tipTextMap = {
    en: "Click to switch language",
    zh: "点击切换语言",
    "zh-hk": "點擊切換語言",
  };
  const tipText = tipTextMap[language] || "Click to switch language";



  if (!mounted) {
    return null;
  }

  return (
    <Tooltip.Provider disableHoverableContent>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <div className="flex gap-1">
            {languages.map((lang) => (
              <button
                key={lang.value}
                type="button"
                aria-label={`Switch to ${lang.name}`}
                className={
                  [
                    "rounded-full px-3 py-2 bg-gradient-to-b font-bold shadow-lg ring-1 transition backdrop-blur duration-200",
                    language === lang.value
                      ? "from-stone-900/50 to-stone-700/90 shadow-stone-700/5 ring-white/10 dark:from-stone-200/50 dark:to-stone-400/90 dark:ring-stone-900/5  text-stone-100"
                      : "from-stone-50/50 to-white/90 shadow-stone-700/5 ring-stone-900/5 dark:from-stone-900/50 dark:to-stone-700/90 dark:ring-white/10 dark:hover:ring-white/20 text-stone-500 hover:text-stone-700 dark:hover:text-stone-200",
                  ].join(" ")
                }
                onClick={() => setLanguage(lang.value as any)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </Tooltip.Trigger>
        <AnimatePresence>
          {open && (
            <Tooltip.Portal forceMount>
              <Tooltip.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {tipText}
                </motion.div>
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}