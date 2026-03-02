import { JobType } from './job-switcher';

export const jobStackKeywords: Record<JobType, string[]> = {
  FULLSTACK: ['nextjs', 'react', 'react native', 'typescript', 'javascript', 'node.js', 'aws', 'restful api', 'dynamodb', 'tailwind css', 'html/css', 'ui/3d integration', 'firebase auth', 'socket.io', 'stripe api', 'jwt', 'oauth 2.0', 'git', 'i18n', 'agile/scrum'],
  SOFTWARE: ['node.js', 'go', 'python', 'c#', 'typescript', 'javascript', 'restful api', 'mysql', 'sqlite', 'dynamodb', 'postgresql', 'postgis', 'hadoop/mapreduce', 'er modelling', 'spatial analysis', 'distributed systems', 'raft', 'slurm', 'linux', 'nginx'],
  ML_RESEARCHER: ['pytorch', 'yolo', 'openpcdet', 'open3d', 'onnx', 'hugging face', 'scikit-learn', 'doc2vec', 'sbert', 'bilstm', 'cuda', 'python', 'flask', 'opencv', 'numpy', 'evm', 'rppg', 'real sense', 'compute shader', 'unity', 'meta quest 3'],
};

export const getJobStackKeywords = (jobType: JobType): string[] => {
  return jobStackKeywords[jobType] || [];
};