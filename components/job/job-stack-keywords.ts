import { JobType } from './job-switcher';

// 从 JSON 文件导入关键词数据
import keywordsData from '@/app/keywords.json';

// 为 NONE 类型返回空数组，其他类型使用 JSON 数据
export const jobStackKeywords: Record<JobType, string[]> = {
  ...(keywordsData as Omit<Record<JobType, string[]>, 'NONE'>),
  NONE: []
};

export const getJobStackKeywords = (jobType: JobType): string[] => {
  return jobStackKeywords[jobType] || [];
};
