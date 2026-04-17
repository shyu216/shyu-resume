"use client";

import { Icons } from "@/components/ui/icons";
import { usePrint } from "@/components/print-provider";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { ElegantTooltip, HoverLink } from "@/components/ui/tooltip";
import { cn } from "@/content/config";
import { useUsageMap } from "@/content/config";
import { copy } from "@/content/copy";

type Props = {
  className?: string;
  usage: "live" | "pdf";
};

export default function ActionButton({ className, usage }: Props) {
  const { handlePrint } = usePrint();
  const { language } = useContext(LanguageContext);
  const uiCopy = copy[language];

  const baseButtonClass = cn(
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
    className
  );

  const text = useUsageMap({
    live: uiCopy.actionButton.liveText,
    pdf: uiCopy.actionButton.pdfText,
  }, usage);

  const tooltip = uiCopy.actionButton.tooltip;

  return usage === "live" ? (
    <ElegantTooltip content={tooltip} side="bottom">
      <button
        type="button"
        aria-label={uiCopy.actionButton.ariaLabel}
        onClick={handlePrint}
        className={cn(baseButtonClass, "font-semibold")}
        style={{
          background: 'linear-gradient(to bottom, color-mix(in srgb, var(--header-color) 90%, transparent), color-mix(in srgb, var(--header-color) 70%, transparent))',
          color: 'var(--color-text-secondary)',
        }}
      >
        {text}
      </button>
    </ElegantTooltip>
  ) : (
    <HoverLink
      className={cn(baseButtonClass, "font-semibold")}
      href="https://shyu216.github.io/shyu-resume/"
      aria-label={uiCopy.actionButton.ariaLabel}
      style={{
        background: 'linear-gradient(to bottom, color-mix(in srgb, var(--header-color) 90%, transparent), color-mix(in srgb, var(--header-color) 70%, transparent))',
        color: 'var(--color-text-primary)',
      }}
      tooltipContent={tooltip}
    >
      {text}
      <Icons.OpenLink className="h-4 w-4 stroke-stone-300 transition group-active:stroke-stone-700 dark:group-hover:stroke-stone-50 dark:group-active:stroke-stone-50" />
    </HoverLink>
  );
}
