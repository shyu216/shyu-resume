// WorkExperience 数据模型定义
export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  companyLink?: string;
  companyImage?: string;
  dateRange: string;
  techStack: string;
  bullets: string[];
}
