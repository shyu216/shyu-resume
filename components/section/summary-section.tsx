"use client";

import { useContext } from "react";
import Section from "@/components/section/section";
import { LanguageContext } from "@/components/lang/language-provider";
import { useJobType } from "@/components/job/job-type-provider";
import { getLocalizedSection } from "@/content/config";

type Props = {
  usage: "live" | "pdf";
};

export default function SummarySection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const { jobType } = useJobType();

  const fontSize = usage === "live" ? "text-sm" : "text-[11px]";
  const bodyLineHeight = "leading-normal";

  const { data: summary, title } = getLocalizedSection(language, "summary");
  const displayContent =
    jobType === "FULLSTACK"
      ? summary.fullstack
      : jobType === "SOFTWARE"
        ? summary.software
        : jobType === "DEVOPS"
          ? summary.devops
          : jobType === "ML_RESEARCHER"
            ? summary.ml
            : summary.default;

  const renderBoldText = (text: string) => {
    const segments = text.split(/(\*\*[^*]+\*\*)/g);
    return segments.map((segment, index) => {
      if (segment.startsWith("**") && segment.endsWith("**")) {
        return <strong key={index}>{segment.slice(2, -2)}</strong>;
      }
      return <span key={index}>{segment}</span>;
    });
  };

  return (
    <Section title={title} usage={usage}>
      <div
        className={`${fontSize} ${bodyLineHeight}`}
        style={{ color: 'var(--color-text-primary)' }}
      >
        {renderBoldText(displayContent)}
      </div>
    </Section>
  );
}
