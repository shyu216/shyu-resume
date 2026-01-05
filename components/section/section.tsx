"use client";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  children: React.ReactNode;
  usage: "live" | "pdf";
};

export default function Section({ title, children, usage }: Props) {
  return (
    <section className="mt-2">
      <h3
        className={cn(
          usage === "live" ? "text-md" : "text-14px",
          "font-bold text-rose-600"
        )}
      >
        {title}
      </h3>
      <div className="w-full border-t border-stone-700 dark:border-stone-300 mb-1"></div>
      {children}
    </section>
  );
}
