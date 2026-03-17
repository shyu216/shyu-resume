
import { type SkillCategory } from "@/types/skill-category";

export const skills: SkillCategory[] = [
  // {
  //   id: "soft-skills",
  //   name: "軟實力",
  //   skills: [
  //     "團隊領導力", "項目管理", "敏捷/Scrum", "遠程協作", "問題解決",
  //     "技術文檔", "代碼審查", "利益相關者溝通", "獨立研究"
  //   ]
  // },
  {
    id: "frontend",
    name: "前端",
    skills: [
      "Next.js", "React", "React Native", "Tailwind CSS", "TypeScript", "JavaScript", "PWA", "SSR"
    ]
  },
  {
    id: "backend",
    name: "後端",
    skills: [
      "Node.js", "Python", "RESTful API", "Flask", "Socket.IO"
    ]
  },
  {
    id: "cloud-devops",
    name: "雲端與DevOps",
    skills: [
      "AWS (EC2, DynamoDB, S3, CDK, Amplify, EventBridge, SES, Lambda)", "CI/CD", "GitHub Actions", "Cloudflare"
    ]
  },
  {
    id: "ai-ml-cv",
    name: "AI / ML / 電腦視覺",
    skills: [
      "PyTorch", "YOLO", "OpenPCDet", "Open3D", "ONNX", "OpenCV", "NumPy", "EVM", "CUDA"
    ]
  },
  {
    id: "xr-3d",
    name: "XR / 3D",
    skills: [
      "Unity", "Meta Quest 3", "C#", "ComputeShader (HLSL)", "RealSense SDK"
    ]
  },
  {
    id: "data-database",
    name: "數據與數據庫",
    skills: [
      "SQL", "PostgreSQL", "PostGIS", "Hadoop/MapReduce", "DynamoDB", "信號處理"
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
