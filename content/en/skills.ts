
import { type SkillCategory } from "@/types/skill-category";

export const skills: SkillCategory[] = [
  // {
  //   id: "soft-skills",
  //   name: "Soft Skills",
  //   skills: [
  //     "Team Leadership", "Project Management", "Agile/Scrum", "Remote Collaboration", "Problem Solving",
  //     "Technical Documentation", "Code Review", "Stakeholder Communication", "Independent Research"
  //   ]
  // },
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      "Next.js", "React", "React Native", "Tailwind CSS", "TypeScript", "JavaScript", "PWA", "SSR"
    ]
  },
  {
    id: "backend",
    name: "Backend",
    skills: [
      "Node.js", "Python", "RESTful API", "Flask", "Socket.IO"
    ]
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    skills: [
      "AWS (EC2, DynamoDB, S3, CDK, Amplify, EventBridge, SES, Lambda)", "CI/CD", "GitHub Actions", "Cloudflare"
    ]
  },
  {
    id: "ai-ml-cv",
    name: "AI / ML / CV",
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
    name: "Data & Database",
    skills: [
      "SQL", "PostgreSQL", "PostGIS", "Hadoop/MapReduce", "DynamoDB", "Signal Processing"
    ]
  },
  {
    id: "payments-auth",
    name: "Payments & Auth",
    skills: [
      "Stripe API", "Firebase Auth", "JWT", "OAuth 2.0"
    ]
  },
  {
    id: "other",
    name: "Other",
    skills: [
      "Distributed Systems (Raft)", "Git", "i18n", "SLURM HPC", "Real-time Systems"
    ]
  },
  {
    id: "languages",
    name: "Languages",
    skills: [
      "English (Fluent)", "Mandarin (Native)", "Cantonese (Fluent)"
    ]
  }
];
