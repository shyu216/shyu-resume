"use client";

import { Icons } from "@/components/ui/icons";
import { usePrint } from "@/components/print-provider";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { ElegantTooltip } from "@/components/ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  usage: "live" | "pdf";
};

export default function ActionButton({ className, usage }: Props) {
  const { handlePrint } = usePrint();
  const { language } = useContext(LanguageContext);

  const baseButtonClass = cn(
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
    "bg-stone-700 font-semibold text-stone-100 hover:bg-stone-700 active:bg-stone-700 active:text-stone-100/70 dark:bg-stone-700 dark:hover:bg-stone-700 dark:active:bg-stone-700 dark:active:text-stone-100/70",
    className
  );

  const textMap = {
    live: {
      en: "Save PDF",
      zh: "保存PDF",
      "zh-hk": "儲存PDF",
    },
    pdf: {
      en: "Open",
      zh: "前往",
      "zh-hk": "打開",
    },
  } as const;

  const tooltipMap = {
    en: "Recommended to use Chrome to print PDF for best pagination and link support",
    zh: "建议在 Chrome 浏览器打印，确保最佳排版和链接完整",
    "zh-hk": "建議在 Chrome 瀏覽器列印，以確保最佳排版和連結完整",
  } as const;

  const text = textMap[usage][language];
  const tooltip = tooltipMap[language];

  return usage === "live" ? (
    <ElegantTooltip content={tooltip} side="bottom">
      <button
        type="button"
        onClick={handlePrint}
        className={baseButtonClass}
      >
        {text}
      </button>
    </ElegantTooltip>
  ) : (
    <Link
      className={baseButtonClass}
      href="https://shyu216.github.io/shyu-resume/"
    >
      {text}
      <Icons.OpenLink className="h-4 w-4 stroke-stone-300 transition group-active:stroke-stone-700 dark:group-hover:stroke-stone-50 dark:group-active:stroke-stone-50" />
    </Link>
  );
}
