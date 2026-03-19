"use client";

import React from "react";
import { JobSwitcher } from "./job-switcher";
import { JobSwitcherMobile } from "./job-switcher-mobile";
import { useJobType } from "./job-type-provider";

export function JobSwitcherWrapper() {
  const { jobType, setJobType } = useJobType();

  return <>
  <div className="sm:hidden">
    <JobSwitcherMobile jobType={jobType} onJobTypeChange={setJobType} />
  </div>
  <div className="hidden sm:block">
    <JobSwitcher jobType={jobType} onJobTypeChange={setJobType} />
  </div>
  </>;
}
