
import { type SkillCategory } from "@/types/skill-category";

export const skills: SkillCategory[] = [
  {
    id: "ai-computer-vision",
    name: "AI / Computer Vision",
    skills: [
      "PyTorch", "Open3D", "3D Object Detection",
      "EVM/rPPG", "Unity (C#, ComputeShader)"
    ]
  },
  {
    id: "cloud-infrastructure",
    name: "Cloud Computing & Infrastructure",
    skills: [
      "AWS (CDK/Lambda/EventBridge/Amplify)",
      "Firebase",
      "GitHub Actions"
    ]
  },
  {
    id: "software-engineering",
    name: "Software Engineering",
    skills: [
      "Next.js", "TypeScript",
      "React Native"
    ]
  },
  {
    id: "languages",
    name: "Languages",
    skills: [
      "English", "Mandarin", "Cantonese"
    ]
  }
];
