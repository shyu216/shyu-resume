import { type SkillCategory } from "@/types/skill-category";

export const skills: SkillCategory[] = [
  {
    id: "frontend-web",
    name: "Frontend / Web",
    skills: ["Next.js", "React", "Vue", "Tailwind"],
    rank: 1,
  },
  {
    id: "mobile-mr",
    name: "Mobile / MR",
    skills: ["React Native", "Unity (MR)", "Qt (C++)"],
    rank: 1,
  },
  {
    id: "backend-cloud",
    name: "Backend / Cloud",
    skills: ["AWS Amplify", "AWS CDK", "Lambda", "EventBridge", "Firebase Auth"],
    rank: 1,
  },
  {
    id: "devops-tools",
    name: "DevOps / Tools",
    skills: ["Git", "Docker", "GitHub Actions", "LaTeX/Markdown", "VS Code", "Unity"],
    rank: 2,
  },
  {
    id: "languages",
    name: "Languages",
    skills: ["English", "Mandarin", "Cantonese"],
    rank: 1,
  },
];
