"use client";

import { useContext } from "react";
import Section from "@/components/section";
import { LanguageContext } from "@/components/lang/language-provider";

const skills_en = [
  {
    title: "Languages",
    description: [
      "Chinese (native), English (fluent), Cantonese (basic)"
    ]
  },
  {
    title: "Web Development",
    description: [
      "Next.js, Vue.js, and React.js for building web applications;",
      "AWS (Amplify, Lambda) for deployment and hosting."
    ]
  },
  {
    title: "Machine Learning",
    description: [
      "PyTorch and CUDA for construction and optimization;",
      "Matplotlib and Open3D for visualization."
    ]
  },
  {
    title: "Knowledge",
    description: "Big Data Computing/Storage, Parallel/Distributed Systems, Cybersecurity, NLP, CV, Quantum Computing, Algorithms for Bioinformatics"
  }
]

const skills_zh = [
  {
    title: "语言",
    description: [
      "中文（母语）、英文（流利）、粤语（基础）"
    ]
  },
  {
    title: "网页开发",
    description: [
      "使用Next.js、Vue.js和React.js构建Web应用程序；",
      "使用AWS (Amplify, Lambda)进行部署和托管。"
    ]
  },
  {
    title: "深度学习",
    description: [
      "使用PyTorch和CUDA进行构建和优化；",
      "使用Matplotlib和Open3D进行可视化。"
    ]
  },
  {
    title: "其他知识",
    description: "大数据计算/存储、并行/分布式系统、网络安全、自然语言处理、计算机视觉、量子计算、生物信息学算法"
  }
]

type Props = {
  usage: "live" | "pdf";
};

export default function SkillSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);


  const skills = language === "en" ? skills_en : skills_zh;
  const title = language === "en" ? "SKILLS" : "技能";

  return (
    <Section title={title} usage={usage}>
      {skills.map((skill, index) => (
        usage === "live" ?
          <div key={index} className="text-sm flex">
            <div className="flex-shrink-0 flex">
              <span className="font-bold">{skill.title}</span>
            </div>
            <div className="ml-8 text-mygray-700 dark:text-mygray-300">
              {
                typeof skill.description === "string" ? <p>{skill.description}</p> :
                  skill.description.map((d, i) => (
                    <p key={i} className="mb-2">{d}</p>
                  ))
              }
            </div>
          </div> :
          <div key={index} className="text-11px flex">
            <div className="flex-shrink-0 flex">
              <span className="font-bold">{skill.title}</span>
            </div>
            <div className="ml-8 text-mygray-700 dark:text-mygray-300">
              {
                typeof skill.description === "string" ? <p>{skill.description}</p> :
                  skill.description.map((d, i) => (
                    <p key={i} className="mb-2">{d}</p>
                  ))
              }
            </div>
          </div>
      ))}
    </Section>
  );
}

