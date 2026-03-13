"use client";

import { cn } from "@/lib/utils";
import { useUsageMap } from "@/lib/utils";
import { usePrimaryColor, useBorderColor, useTextColor } from "@/lib/theme-utils";

type Props = {
  title: string;
  children: React.ReactNode;
  usage: "live" | "pdf";
};

export default function Section({ title, children, usage }: Props) {
  const titleSize = useUsageMap({
    live: "text-md",
    pdf: "text-14px",
  }, usage);
  
  const primaryColor = usePrimaryColor(usage);
  const borderColor = useBorderColor(usage);
  const textColor = useTextColor(usage);
  
  return (
    <section className="mt-2">
      <h3
          className={cn(
            titleSize,
            "font-bold"
          )}
          style={{ color: primaryColor }}
        >
        {title}
      </h3>
      <div 
        className="w-full border-t mb-1"
        style={{ borderColor: borderColor }}
      ></div>
      {children}
    </section>
  );
}
