"use client";

import React from "react";
import { JobSwitcher } from "./job-switcher";
import { JobSwitcherMobile } from "./job-switcher-mobile";
import { useJobType } from "./job-type-provider";

export function JobSwitcherWrapper({ useMobile }: { useMobile?: boolean }) {
  const { jobType, setJobType } = useJobType();

  if (useMobile) {
    return <JobSwitcherMobile jobType={jobType} onJobTypeChange={setJobType} />;
  }
  return <JobSwitcher jobType={jobType} onJobTypeChange={setJobType} />;
}
