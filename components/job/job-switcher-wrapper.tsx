"use client";

import React from "react";
import { JobSwitcher } from "./job-switcher";
import { useJobType } from "./job-type-provider";

export function JobSwitcherWrapper() {
  const { jobType, setJobType } = useJobType();
  return <JobSwitcher jobType={jobType} onJobTypeChange={setJobType} />;
}