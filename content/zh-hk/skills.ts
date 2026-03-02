
import { type SkillCategory } from "@/types/skill-category";

export const skills: SkillCategory[] = [
  {
    id: "frontend",
    name: "前端",
    skills: [
      "Next.js", "React", "React Native", "Tailwind CSS", "HTML/CSS", "TypeScript", "JavaScript", "UI/3D Integration"
    ]
  },
  {
    id: "backend",
    name: "後端",
    skills: [
      "Node.js", "Go", "Python", "C#", "RESTful API", "Firebase Auth", "MySQL", "SQLite", "DynamoDB", "Socket.IO"
    ]
  },
  {
    id: "cloud-devops",
    name: "雲端與DevOps",
    skills: [
      "AWS (EC2, DynamoDB, S3, CDK, Amplify, EventBridge, SES, Lambda)", "CI/CD", "GitHub Actions", "Cloudflare (DNS/SSL)", "Linux", "Nginx"
    ]
  },
  {
    id: "ai-ml-cv",
    name: "AI / ML / 電腦視覺",
    skills: [
      "PyTorch", "YOLO", "OpenPCDet", "Open3D", "ONNX", "Hugging Face", "scikit-learn", "Doc2Vec", "SBERT", "BiLSTM", "rPPG", "EVM", "CUDA"
    ]
  },
  {
    id: "xr-3d",
    name: "XR / 3D",
    skills: [
      "Unity", "Meta Quest 3", "C#", "ComputeShader (HLSL)", "RealSense SDK", "3D Assets/UI"
    ]
  },
  {
    id: "data-database",
    name: "數據與數據庫",
    skills: [
      "SQL", "PostgreSQL", "PostGIS", "Hadoop/MapReduce", "DynamoDB", "ER Modelling", "Spatial Analysis"
    ]
  },
  {
    id: "payments-auth",
    name: "支付與認證",
    skills: [
      "Stripe API (deposits/refunds)", "Firebase Auth (email/SMS)", "JWT", "OAuth 2.0"
    ]
  },
  {
    id: "other",
    name: "其他",
    skills: [
      "Distributed Systems (Raft)", "Git", "i18n", "Agile/Scrum", "SLURM HPC", "WakaTime"
    ]
  },
  {
    id: "languages",
    name: "語言",
    skills: [
      "英語 (流利)", "普通話 (母語)", "粵語 (流利)"
    ]
  }
];
