import { type SkillCategory } from "@/types/skill-category";

export const skills: SkillCategory[] = [
  {
    id: "frontend-web",
    name: "前端 / Web",
    skills: ["Next.js", "React", "Vue", "Tailwind"],
    rank: 1,
  },
  {
    id: "mobile-mr",
    name: "移動 / MR",
    skills: ["React Native", "Unity (MR)", "Qt (C++)"],
    rank: 1,
  },
  {
    id: "backend-cloud",
    name: "後端 / 雲",
    skills: ["AWS Amplify", "AWS CDK", "Lambda", "EventBridge", "Firebase Auth"],
    rank: 1,
  },
  {
    id: "devops-tools",
    name: "DevOps / 工具",
    skills: ["Git", "Docker", "GitHub Actions", "LaTeX/Markdown", "VS Code", "Unity"],
    rank: 2,
  },
  {
    id: "languages",
    name: "語言",
    skills: ["英語", "普通話", "粵語"],
    rank: 1,
  },
];
