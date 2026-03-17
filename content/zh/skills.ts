import { type SkillCategory } from "@/types/skill-category";

export const skills: SkillCategory[] = [
  // {
  //   id: "soft-skills",
  //   name: "软实力",
  //   skills: [
  //     "团队领导力", "项目管理", "敏捷/Scrum", "远程协作", "问题解决",
  //     "技术文档", "代码审查", "利益相关者沟通", "独立研究"
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
    name: "后端",
    skills: [
      "Node.js", "Python", "RESTful API", "Flask", "Socket.IO"
    ]
  },
  {
    id: "cloud-devops",
    name: "云计算与DevOps",
    skills: [
      "AWS (EC2, DynamoDB, S3, CDK, Amplify, EventBridge, SES, Lambda)", "CI/CD", "GitHub Actions", "Cloudflare"
    ]
  },
  {
    id: "ai-ml-cv",
    name: "AI / ML / 计算机视觉",
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
    name: "数据与数据库",
    skills: [
      "SQL", "PostgreSQL", "PostGIS", "Hadoop/MapReduce", "DynamoDB", "信号处理"
    ]
  },
  {
    id: "payments-auth",
    name: "支付与认证",
    skills: [
      "Stripe API", "Firebase Auth", "JWT", "OAuth 2.0"
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