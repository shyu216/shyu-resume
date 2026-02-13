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
    name: "移动 / MR",
    skills: ["React Native", "Unity (MR)", "Qt (C++)"],
    rank: 1,
  },
  {
    id: "backend-cloud",
    name: "后端 / 云",
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
    name: "语言",
    skills: ["英语", "普通话", "粤语"],
    rank: 1,
  },
];
