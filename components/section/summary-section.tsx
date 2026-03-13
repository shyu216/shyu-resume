"use client";

import { useContext } from "react";
import Section from "@/components/section/section";
import { LanguageContext } from "@/components/lang/language-provider";
import { summary as summaryEn } from "@/content/en/summary";
import { summary as summaryZh } from "@/content/zh/summary";
import { summary as summaryZhHk } from "@/content/zh-hk/summary";
import { useJobType } from "@/components/job/job-type-provider";
import { useLanguageMap, useUsageMap } from "@/lib/utils";
import { useTextColor } from "@/lib/theme-utils";

type Props = {
  usage: "live" | "pdf";
};

export default function SummarySection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const { jobType } = useJobType();
  const textSecondary = useTextColor(usage);
  
  const fontSize = useUsageMap({
    live: "text-sm",
    pdf: "text-[11px]",
  }, usage);

  const { data: summary, title } = useLanguageMap({
    en: { data: summaryEn, title: "SUMMARY" },
    zh: { data: summaryZh, title: "个人简介" },
    "zh-hk": { data: summaryZhHk, title: "個人簡介" },
  }, language);

  const getSummaryContent = () => {
    switch (jobType) {
      case "FULLSTACK":
        return summary.fullstack;
      case "SOFTWARE":
        return summary.software;
      case "ML_RESEARCHER":
        return summary.ml;
      default:
        return summary.fullstack;
    }
  };

  return (
    <Section title={title} usage={usage}>
      <div className={fontSize} style={{ color: textSecondary }}>
        {getSummaryContent()}
      </div>
    </Section>
  );
}