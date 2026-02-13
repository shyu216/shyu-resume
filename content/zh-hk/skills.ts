
import { type SkillCategory } from "@/types/skill-category";

export const skills: SkillCategory[] = [
  {
    id: "ai-computer-vision",
    name: "AI / 電腦視覺",
    skills: [
      "PyTorch", "Open3D", "三維目標檢測",
      "EVM/rPPG", "Unity (C#, ComputeShader)"
    ]
  },
  {
    id: "cloud-infrastructure",
    name: "雲端運算與維護",
    skills: [
      "AWS (CDK/Lambda/EventBridge/Amplify)",
      "Firebase",
      "GitHub Actions"
    ]
  },
  {
    id: "software-engineering",
    name: "軟件工程",
    skills: [
      "Next.js", "TypeScript",
      "React Native"
    ]
  },
  {
    id: "languages",
    name: "語言",
    skills: [
      "英語", "普通話", "粵語"
    ]
  }
];
