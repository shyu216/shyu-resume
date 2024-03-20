"use client";

import { useContext } from "react";
import Section from "./section";
import { LanguageContext } from "../lang/language-provider";

export default function SkillSection() {
  const { language } = useContext(LanguageContext);

  const skills_en = [
    {
      title: "Full Stack Development",
      description: "Next.js, ReactJS, and Bootstrap for building web applications;"
    },
    {
      description: "AWS (Amplify, Lambda) for deployment and hosting."
    },
    {
      title: "Machine/Deep Learning",
      description: "PyTorch and CUDA for construction and optimization;",
    },
    {
      description: "Matplotlib and Open3D for visualization.",
    },
    {
      title: "Others",
      description: "Databases, Big Data Computing/Storage, Parallel/Distributed Systems, Computer Networks, and Cybersecurity.",
    },
    {
      title: "Tools",
      description: "VS Code, Git, Docker, Markdown, and LaTex.",
    },
  ]

  const skills_zh = [
    {
      title: "全栈开发",
      description: "使用Next.js、ReactJS和Bootstrap构建网络应用程序；"
    },
    {
      description: "使用AWS (Amplify, Lambda)进行部署和托管。"
    },
    {
      title: "机器/深度学习",
      description: "使用PyTorch和CUDA进行构建和优化；",
    },
    {
      description: "使用Matplotlib和Open3D进行可视化。",
    },
    {
      title: "其他",
      description: "数据库、大数据计算/存储、并行/分布式系统、计算机网络和网络安全。",
    },
    {
      title: "工具",
      description: "VS Code、Git、Docker、Markdown和LaTex。",
    },
  ]

  const skills = language === "en" ? skills_en : skills_zh;
  const title = language === "en" ? "SKILLS" : "技能";
  const subtitlelength = language === "en" ? "w-48" : "w-28";

  return (
    <Section title={title}>
      {skills.map((skill, index) => (
        <div key={index} className="text-sm flex">
          <div className={`${subtitlelength} flex-shrink-0 flex justify-between`}>
            {skill.title && <><span className="font-bold">{skill.title}</span>:</>}
          </div>
          <div className="ml-8 text-zinc-700 dark:text-zinc-300">
            {skill.description}
          </div>
        </div>
      ))}
    </Section>
  );
}

