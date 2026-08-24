"use client";

import { useContext } from "react";

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

  const { data: displayContent } = getLocalizedSection(
    language,
    "summary",
    jobType,
  );

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
    <div className={`${fontSize} leading-normal text-primary mb-2`} style={{ textIndent: '2em' }}>
      {renderBoldText(typeof displayContent === "string" ? displayContent : "")}
    </div>
  );
}
