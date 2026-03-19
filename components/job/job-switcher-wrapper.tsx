"use client";

import React from "react";
import { JobSwitcher } from "./job-switcher";
import { JobSwitcher as JobSwitcherSm } from "./job-switcher-sm";
import { useJobType } from "./job-type-provider";

export function JobSwitcherWrapper() {
  const { jobType, setJobType } = useJobType();

  return <>
  <div className="sm:hidden">
    <JobSwitcherSm jobType={jobType} onJobTypeChange={setJobType} />
  </div>
  <div className="hidden sm:block">
    <JobSwitcher jobType={jobType} onJobTypeChange={setJobType} />
  </div>
  </>;
}