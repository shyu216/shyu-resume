"use client";

import { useJobType } from "@/components/job/job-type-provider";
import { LanguageContext } from "@/components/lang/language-provider";
import { jobOptions } from "@/content/copy";
import { siteConfig } from "@/content/config";
import { useEffect, useContext } from "react";

function getFullName(language: string): string {
  const name = siteConfig.personal.name;
  if (language === "zh") {
    return `${name.zh.last}${name.zh.first}`;
  }
  return `${name.en.first}_${name.en.last}`;
}

function getResumeLabel(language: string): string {
  return language === "zh" ? "简历" : "Resume";
}

export function DynamicTitle() {
  const { jobType } = useJobType();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const jobOption = jobOptions.find((opt) => opt.value === jobType);
    const jobLabel = jobOption?.label || "";
    const fullName = getFullName(language);
    const resumeLabel = getResumeLabel(language);
    const title = jobLabel
      ? `${fullName}_${jobLabel}_${resumeLabel}`
      : `${fullName}_${resumeLabel}`;
    document.title = title;
  }, [jobType, language]);

  return null;
}
