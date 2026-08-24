// Section Component - Server Component
// Section wrapper with title and border

import { cn } from "@/content/config";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  usage: "live" | "pdf";
}

export default function Section({ title, children, usage }: SectionProps) {
  const titleSize = usage === "live" ? "text-md" : "text-[14px]";

  return (
    <section className="resume-section">
      <h3
        className={cn(titleSize, "resume-section-title font-bold mb-1 text-accent")}>
        <span className="resume-section-title-text">{title}</span>
      </h3>
      {children}
    </section>
  );
}
