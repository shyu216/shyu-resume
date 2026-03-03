"use client";

import { useContext } from "react";
import Section from "@/components/section/section";
import { LanguageContext } from "@/components/lang/language-provider";
import { skills as skillsEn } from "@/content/en/skills";
import { skills as skillsZh } from "@/content/zh/skills";
import { skills as skillsZhHk } from "@/content/zh-hk/skills";
import Label from "../labels/label";
import { type SkillCategory } from "@/types/skill-category";

type Props = {
  usage: "live" | "pdf";
};

export default function SkillSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  const contentMap = {
    en: { data: skillsEn, title: "SKILLS" },
    zh: { data: skillsZh, title: "技能" },
    "zh-hk": { data: skillsZhHk, title: "技能" },
  };
  
  const { data: skills, title } = contentMap[language];

  const styleMap = {
    live: "font-bold whitespace-nowrap text-sm",
    pdf: "font-bold whitespace-nowrap text-11px",
  };
  
  const descStyleMap = {
    live: "ml-8 text-sm",
    pdf: "ml-8 text-11px",
  };

  return (
    <Section title={title} usage={usage}>
      <div className="break-inside-avoid page-break-inside-avoid break-before-auto">
        <div className="grid grid-cols-1 grid-cols-[max-content,1fr] items-start">
          {skills.map((skill, index) => [
            <div key={`title-${index}`} className={styleMap[usage]}>
              <Label content={skill.name} />
            </div>,
            <div key={`desc-${index}`} className={descStyleMap[usage]}>
              <p>{skill.skills.join(" · ")}</p>
            </div>
          ])}
        </div>
      </div>
    </Section>
  );
}