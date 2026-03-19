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
    name: "後端",
    skills: [
      "Node.js", "Python", "Go", "Flask", "RESTful API", "Socket.IO"
    ]
  },
  {
    id: "cloud-devops",
    name: "雲端與DevOps",
    skills: [
      "AWS", "CI/CD", "GitHub Actions", "Cloudflare", "Infrastructure as Code"
    ]
  },
  {
    id: "ml-ai",
    name: "機器學習與AI",
    skills: [
      "PyTorch", "YOLO", "OpenCV", "點雲處理", "rPPG", "EVM"
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
    name: "數據工程",
    skills: [
      "SQL", "PostGIS", "Hadoop", "分佈式計算", "分塊"
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
