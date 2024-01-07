"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useContext } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { LanguageContext } from "./language-provider";

const languages = [
  {
    label: "中",
    value: "zh",
  },
  {
    label: "ENG",
    value: "en",
  },
];



export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  React.useEffect(() => setMounted(true), []);

  const { language, setLanguage } = useContext(LanguageContext);

  function handleLanguageChange() {
    const lang = language === "en" ? "zh" : "en";
    setLanguage(lang);
  }



  if (!mounted) {
    return null;
  }

  return (
    <Tooltip.Provider disableHoverableContent>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label="Change language"
            className="group rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 py-2 shadow-lg shadow-zinc-600/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-600/90 dark:ring-white/10 dark:hover:ring-white/20"
            onClick={handleLanguageChange}
          >
            {languages.find((lang) => lang.value === language)?.label}
          </button>
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
                  {languages.find((l)=>l.value===language)?.label}
                </motion.div>
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}