import { JobType } from '@/components/job/job-switcher';

// 从JSON文件导入关键词数据
import keywordsData from '@/app/keywords.json';

export const jobStackKeywords: Record<JobType, string[]> = keywordsData as Record<JobType, string[]>;

export const getJobStackKeywords = (jobType: JobType): string[] => {
  return jobStackKeywords[jobType] || [];
};
