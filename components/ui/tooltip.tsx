"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn, getColor } from "@/content/config";
import * as React from "react";
import Link from "next/link";
import { LanguageContext } from "@/components/lang/language-provider";
import { useJobType } from "@/components/job/job-type-provider";
import { copy } from "@/content/copy";
import { useTheme } from "next-themes";

const { Provider, Root, Trigger, Portal } = TooltipPrimitive;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs font-medium shadow-lg shadow-neutral-600/5 ring-1 backdrop-blur transition",
        className
      )}
      style={{
        backgroundColor: 'var(--color-card-default)',
        color: 'var(--color-text-primary)',
        borderColor: 'var(--color-border-default)',
        boxShadow: 'var(--shadow-md)',
      }}
      {...props}
    />
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export const Tooltip = {
  Root,
  Trigger,
  Content: TooltipContent,
  Provider,
  Portal,
} as const;

type ElegantTooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
  side?: "top" | "bottom" | "left" | "right";
};

export function ElegantTooltip({
  children,
  content,
  delayDuration = 200,
  side = "bottom",
}: ElegantTooltipProps) {
  return (
    <Tooltip.Provider disableHoverableContent delayDuration={delayDuration}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side={side}>{content}</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

type HoverLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  tooltipContent?: React.ReactNode;
  tooltipSide?: "top" | "bottom" | "left" | "right";
  showTooltip?: boolean;
};

export function HoverLink({
  href,
  children,
  className,
  style,
  target,
  rel,
  ariaLabel,
  tooltipContent,
  tooltipSide = "bottom",
  showTooltip = true,
}: HoverLinkProps) {
  const { language } = React.useContext(LanguageContext);
  const resolvedTooltip = tooltipContent ?? `${copy[language].labelWithLink.openPrefix}${href}`;

  const linkNode = (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );

  if (!showTooltip) {
    return linkNode;
  }

  return (
    <ElegantTooltip content={resolvedTooltip} side={tooltipSide}>
      {linkNode}
    </ElegantTooltip>
  );
}

type CopyTextProps = {
  value: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  copiedIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  tooltipSide?: "top" | "bottom" | "left" | "right";
};

const COPY_FEEDBACK_MS = 3000;

export function CopyText({
  value,
  icon,
  children,
  copiedIcon,
  className,
  style,
  ariaLabel,
  tooltipSide = "bottom",
}: CopyTextProps) {
  const { language } = React.useContext(LanguageContext);
  const { jobType } = useJobType();
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = React.useState(false);
  const [showCopiedIcon, setShowCopiedIcon] = React.useState(false);
  const [isIconShrinking, setIsIconShrinking] = React.useState(false);
  const [isInteracting, setIsInteracting] = React.useState(false);
  const [forceTooltipOpen, setForceTooltipOpen] = React.useState(false);
  const [countdownPercent, setCountdownPercent] = React.useState(100);
  const resetTimerRef = React.useRef<number | null>(null);
  const switchTimerRef = React.useRef<number | null>(null);
  const progressTimerRef = React.useRef<number | null>(null);
  const countdownDeadlineRef = React.useRef<number>(0);

  const clearTimers = React.useCallback(() => {
    if (switchTimerRef.current !== null) {
      window.clearTimeout(switchTimerRef.current);
      switchTimerRef.current = null;
    }
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    if (progressTimerRef.current !== null) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const animateIconSwap = React.useCallback((toCopied: boolean) => {
    setIsIconShrinking(true);
    switchTimerRef.current = window.setTimeout(() => {
      setShowCopiedIcon(toCopied);
      setIsIconShrinking(false);
    }, 120);
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      clearTimers();
      setCopied(true);
      setForceTooltipOpen(true);
      setCountdownPercent(100);
      animateIconSwap(true);
      countdownDeadlineRef.current = Date.now() + COPY_FEEDBACK_MS;
      progressTimerRef.current = window.setInterval(() => {
        const remaining = countdownDeadlineRef.current - Date.now();
        const nextPercent = Math.max(0, (remaining / COPY_FEEDBACK_MS) * 100);
        setCountdownPercent(nextPercent);
      }, 50);
      resetTimerRef.current = window.setTimeout(() => {
        setCopied(false);
        setForceTooltipOpen(false);
        setCountdownPercent(0);
        animateIconSwap(false);
      }, COPY_FEEDBACK_MS);
    } catch {
      setCopied(false);
      setForceTooltipOpen(false);
    }
  };

  const tooltipText = copied
    ? `${copy[language].labelWithLink.copiedPrefix}${value}`
    : `${copy[language].labelWithLink.copyPrefix}${value}`;

  const activeIcon = showCopiedIcon ? (copiedIcon ?? <span>OK</span>) : icon;
  const tooltipOpen = forceTooltipOpen || isInteracting;
  const accentColor = getColor(jobType, language)[resolvedTheme === "dark" ? "dark" : "light"];

  const tooltipContent = (
    <div className="min-w-[160px]">
      <div>{tooltipText}</div>
      {copied && (
        <div
          className="mt-0.5 h-0.5 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 25%, transparent)` }}
        >
          <div
            className="h-full origin-left transition-[width] duration-75 ease-linear"
            style={{
              width: `${countdownPercent}%`,
              backgroundColor: accentColor,
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <Tooltip.Provider disableHoverableContent delayDuration={200}>
      <Tooltip.Root open={tooltipOpen}>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className={className}
            style={style}
            aria-label={ariaLabel}
            onClick={handleCopy}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onFocus={() => setIsInteracting(true)}
            onBlur={() => setIsInteracting(false)}
          >
            <span
              className={cn(
                "inline-flex items-center justify-center transition-transform duration-150",
                isIconShrinking ? "scale-75" : "scale-100"
              )}
              aria-hidden="true"
            >
              {activeIcon}
            </span>
            {children}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side={tooltipSide}>{tooltipContent}</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
