"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useTextColor, useThemeColor, useShadow } from "@/lib/theme-utils";

const { Provider, Root, Trigger, Portal } = TooltipPrimitive;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  const bgColor = useThemeColor('card', 'default');
  const textColor = useTextColor();
  const borderColor = useThemeColor('border', 'default');
  const mdShadow = useShadow();

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs font-medium shadow-lg shadow-neutral-600/5 ring-1 backdrop-blur transition",
        className
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
        boxShadow: mdShadow,
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
