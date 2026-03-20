"use client";

import { useJobType } from "@/components/job/job-type-provider";
import { jobOptions } from "@/components/job/job-types";
import { siteConfig } from "@/content/config";
import { useEffect } from "react";

export function DynamicTitle() {
  const { jobType } = useJobType();

  useEffect(() => {
    const jobOption = jobOptions.find((opt) => opt.value === jobType);
    const jobLabel = jobOption?.label || "";
    const title = jobLabel
      ? `${siteConfig.title} - ${jobLabel}`
      : siteConfig.title;
    document.title = title;
  }, [jobType]);

  return null;
}
