"use client";

import { Icons } from "@/components/ui/icons";
import { usePrint } from "@/components/print-provider";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { ElegantTooltip } from "@/components/ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUsageMap, useLanguageMap } from "@/lib/utils";
import { useHeaderColor, useTextColor, useIsDarkTheme } from "@/lib/theme-utils";

type Props = {
  className?: string;
  usage: "live" | "pdf";
};

export default function ActionButton({ className, usage }: Props) {
  const { handlePrint } = usePrint();
  const { language } = useContext(LanguageContext);
  const buttonBg = useHeaderColor(usage);
  const buttonHoverBg = useHeaderColor(usage);
  const isDark = useIsDarkTheme();
  const textColor = useTextColor(usage);
  // PDF模式下按钮文本始终为白色
  const buttonText = usage === "pdf" ? '#ffffff' : (isDark ? textColor : '#ffffff');

  const baseButtonClass = cn(
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
    className
  );

  const text = useUsageMap({
    live: useLanguageMap({
      zh: "保存PDF",
      ja: "PDFを保存",
      fr: "Enregistrer PDF",
    }, language),
    pdf: useLanguageMap({
      zh: "前往",
      ja: "開く",
      fr: "Ouvrir",
    }, language),
  }, usage);

  const tooltip = useLanguageMap({
    zh: "建议在 Chrome 浏览器打印，确保最佳排版和链接完整",
    ja: "Chromeブラウザで印刷することをお勧めします。最適なレイアウトとリンクの完全性を確保",
    fr: "Recommandé d'utiliser Chrome pour imprimer le PDF pour une meilleure pagination et support des liens",
  }, language);

  return usage === "live" ? (
    <ElegantTooltip content={tooltip} side="bottom">
      <button
        type="button"
        onClick={handlePrint}
        className={cn(baseButtonClass, "font-semibold")}
        style={{
          backgroundColor: buttonBg,
          color: buttonText,
        }}
      >
        {text}
      </button>
    </ElegantTooltip>
  ) : (
    <Link
      className={cn(baseButtonClass, "font-semibold")}
      href="https://shyu216.github.io/shyu-resume/"
      style={{
        backgroundColor: buttonBg,
        color: buttonText,
      }}
    >
      {text}
      <Icons.OpenLink className="h-4 w-4 stroke-stone-300 transition group-active:stroke-stone-700 dark:group-hover:stroke-stone-50 dark:group-active:stroke-stone-50" />
    </Link>
  );
}
