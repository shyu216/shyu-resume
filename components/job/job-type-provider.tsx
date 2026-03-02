"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { JobType } from "./job-switcher";

interface JobTypeContextType {
  jobType: JobType;
  setJobType: (jobType: JobType) => void;
}

const JobTypeContext = createContext<JobTypeContextType | undefined>(undefined);

export const useJobType = () => {
  const context = useContext(JobTypeContext);
  if (!context) {
    throw new Error("useJobType must be used within a JobTypeProvider");
  }
  return context;
};

interface JobTypeProviderProps {
  children: ReactNode;
}

export const JobTypeProvider: React.FC<JobTypeProviderProps> = ({ children }) => {
  const [jobType, setJobType] = useState<JobType>('FULLSTACK');

  return (
    <JobTypeContext.Provider value={{ jobType, setJobType }}>
      {children}
    </JobTypeContext.Provider>
  );
};