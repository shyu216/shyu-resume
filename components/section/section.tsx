// Section Component - Server Component
// Section wrapper with title and border

import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  usage: "live" | "pdf";
}

export default function Section({ title, children, usage }: SectionProps) {
  const titleSize = usage === "live" ? "text-md" : "text-[14px]";

  return (
    <section className="mt-2">
      <h3
        className={cn(titleSize, "font-bold")}
        style={{ color: 'var(--header-color)' }}
      >
        {title}
      </h3>
      <div
        className="w-full border-t mb-1"
        style={{ borderColor: 'var(--color-border-default)' }}
      ></div>
      {children}
    </section>
  );
}
