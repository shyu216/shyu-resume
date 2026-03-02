import { JobType } from './job-switcher';

export const jobStackKeywords: Record<JobType, string[]> = {
  FULLSTACK: ['nextjs', 'react', 'react native', 'typescript', 'javascript', 'node.js', 'aws', 'restful api', 'dynamodb', 'tailwind css'],
  SOFTWARE: ['node.js', 'go', 'python', 'c#', 'typescript', 'javascript', 'restful api', 'mysql', 'sqlite', 'dynamodb'],
  ML_RESEARCHER: ['pytorch', 'yolo', 'openpcdet', 'open3d', 'onnx', 'hugging face', 'scikit-learn', 'doc2vec', 'sbert', 'bilstm', 'cuda'],
};

export const getJobStackKeywords = (jobType: JobType): string[] => {
  return jobStackKeywords[jobType] || [];
};