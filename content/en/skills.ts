import { type SkillCategory } from "@/types/skill-category";

export const skills: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      "React", "Next.js", "React Native", "TypeScript", "JavaScript", "Tailwind CSS", "PWA"
    ]
  },
  {
    id: "backend",
    name: "Backend",
    skills: [
      "Node.js", "Python", "Go", "Flask", "RESTful API", "Socket.IO"
    ]
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    skills: [
      "AWS", "CI/CD", "GitHub Actions", "Cloudflare", "Infrastructure as Code"
    ]
  },
  {
    id: "ml-ai",
    name: "Machine Learning & AI",
    skills: [
      "PyTorch", "YOLO", "OpenCV", "Point Cloud Processing", "rPPG", "EVM"
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
    name: "Data Engineering",
    skills: [
      "SQL", "PostGIS", "Hadoop", "Distributed Computing", "Chunking"
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
