// Section Component - Server Component
// Section wrapper with title and border

import { cn } from "@/content/config";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  usage: "live" | "pdf";
}

export default function Section({ title, children, usage }: SectionProps) {
  const titleSize = usage === "live" ? "text-md" : "text-[16px]";

  return (
    <section className="resume-section mt-2">
      <h3
        className={cn(titleSize, "resume-section-title mb-1 font-bold")}
        style={{ color: 'var(--header-color)' }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}
