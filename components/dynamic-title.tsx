"use client";

import { useJobType } from "@/components/job/job-type-provider";
import { LanguageContext } from "@/components/lang/language-provider";
import { jobOptions } from "@/content/copy";
import { siteConfig } from "@/content/config";
import { useEffect, useContext } from "react";

export function DynamicTitle() {
  const { jobType } = useJobType();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const jobOption = jobOptions.find((opt) => opt.value === jobType);
    const jobLabel = jobOption?.label || "";
    const title = jobLabel
      ? `${siteConfig.title} - ${jobLabel} - ${language}`
      : `${siteConfig.title} - ${language}`;
    document.title = title;
  }, [jobType, language]);

  return null;
}
