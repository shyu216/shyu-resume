import { type SkillCategory } from "@/types/skill-category";

export const skills: SkillCategory[] = [
  {
    id: "frontend",
    name: "前端",
    skills: [
      "React", "Next.js", "React Native", "TypeScript", "JavaScript", "Tailwind CSS", "PWA"
    ]
  },
  {
    id: "backend",
    name: "后端",
    skills: [
      "Node.js", "Python", "Go", "Flask", "RESTful API", "Socket.IO"
    ]
  },
  {
    id: "cloud-devops",
    name: "云计算与DevOps",
    skills: [
      "AWS", "CI/CD", "GitHub Actions", "Cloudflare", "Infrastructure as Code"
    ]
  },
  {
    id: "ml-ai",
    name: "机器学习与AI",
    skills: [
      "PyTorch", "YOLO", "OpenCV", "点云处理", "rPPG", "EVM"
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
    id: "data",
    name: "数据工程",
    skills: [
      "SQL", "PostGIS", "Hadoop", "分布式计算", "分块"
    ]
  },
  {
    id: "languages",
    name: "语言",
    skills: [
      "英语 (流利)", "普通话 (母语)", "粤语 (流利)"
    ]
  }
];
