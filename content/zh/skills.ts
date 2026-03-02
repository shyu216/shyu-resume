import { type SkillCategory } from "@/types/skill-category";

export const skills: SkillCategory[] = [
{
  "id": "frontend",
  "name": "前端",
  "skills": [
    "Next.js", "React", "React Native", "Tailwind CSS", "HTML/CSS", "TypeScript", "JavaScript", "UI/3D Integration"
  ]
},
{
  "id": "backend",
  "name": "后端",
  "skills": [
    "Node.js", "Go", "Python", "C#", "RESTful API", "Firebase Auth", "MySQL", "SQLite", "DynamoDB", "Socket.IO"
  ]
},
{
  "id": "cloud-devops",
  "name": "云计算与DevOps",
  "skills": [
    "AWS (EC2, DynamoDB, S3, CDK, Amplify, EventBridge, SES, Lambda)", "CI/CD", "GitHub Actions", "Cloudflare (DNS/SSL)", "Linux", "Nginx"
  ]
},
{
  "id": "ai-ml-cv",
  "name": "AI / ML / 计算机视觉",
  "skills": [
    "PyTorch", "YOLO", "OpenPCDet", "Open3D", "ONNX", "Hugging Face", "scikit-learn", "Doc2Vec", "SBERT", "BiLSTM", "rPPG", "EVM", "CUDA"
  ]
},
{
  "id": "xr-3d",
  "name": "XR / 3D",
  "skills": [
    "Unity", "Meta Quest 3", "C#", "ComputeShader (HLSL)", "RealSense SDK", "3D Assets/UI"
  ]
},
{
  "id": "data-database",
  "name": "数据与数据库",
  "skills": [
    "SQL", "PostgreSQL", "PostGIS", "Hadoop/MapReduce", "DynamoDB", "ER Modelling", "Spatial Analysis"
  ]
},
{
  "id": "payments-auth",
  "name": "支付与认证",
  "skills": [
    "Stripe API (deposits/refunds)", "Firebase Auth (email/SMS)", "JWT", "OAuth 2.0"
  ]
},
{
  "id": "other",
  "name": "其他",
  "skills": [
    "Distributed Systems (Raft)", "Git", "i18n", "Agile/Scrum", "SLURM HPC", "WakaTime"
  ]
},
{
  "id": "languages",
  "name": "语言",
  "skills": [
    "英语 (流利)", "普通话 (母语)", "粤语 (流利)"
  ]
}
];