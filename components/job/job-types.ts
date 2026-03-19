// Job Types - Centralized type definitions for job-related components

export const jobOptions = [
  { value: 'FULLSTACK', label: 'Full Stack', tooltipEn: 'Full Stack Engineer — End-to-end development', tooltipZh: '全栈工程师 — 端到端开发', tooltipZhHk: '全棧工程師 — 端到端開發' },
  { value: 'SOFTWARE', label: 'SWE', tooltipEn: 'Software Engineer — System & architecture', tooltipZh: '软件工程师 — 系统与架构', tooltipZhHk: '軟件工程師 — 系統與架構' },
  { value: 'DEVOPS', label: 'DevOps', tooltipEn: 'Cloud/DevOps/SRE — Infrastructure & CI/CD', tooltipZh: '云/DevOps 工程师 — 基础设施与 CI/CD', tooltipZhHk: '雲/DevOps 工程師 — 基礎設施與 CI/CD' },
  { value: 'ML_RESEARCHER', label: 'ML', tooltipEn: 'ML Researcher — AI & algorithms', tooltipZh: '机器学习研究员 — AI 与算法', tooltipZhHk: '機器學習研究員 — AI 與算法' },
] as const;

export type JobType = typeof jobOptions[number]['value'] | 'NONE';

export interface JobSwitcherProps {
  jobType: JobType;
  onJobTypeChange: (jobType: JobType) => void;
}
