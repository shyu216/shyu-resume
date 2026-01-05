"use client";

import { useContext } from "react";
import Section from "@/components/section/section";
import { LanguageContext } from "@/components/lang/language-provider";
import { skills as skillsEn } from "@/content/en/skills";
import { skills as skillsZh } from "@/content/zh/skills";
import { skills as skillsZhHk } from "@/content/zh-hk/skills";
import Label from "../labels/label";

type Props = {
  usage: "live" | "pdf";
};

export default function SkillSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  let skills, title;
  if (language === "en") {
    skills = skillsEn;
    title = "SKILLS";
  } else if (language === "zh") {
    skills = skillsZh;
    title = "技能";
  } else {
    skills = skillsZhHk;
    title = "技能";
  }

  return (
<Section title={title} usage={usage}>
  <div className="grid grid-cols-1 grid-cols-[max-content,1fr] items-start">
    {skills.map((skill, index) => [
      <div key={`title-${index}`} className={usage === "live" ? "font-bold whitespace-nowrap text-sm" : "font-bold whitespace-nowrap text-11px"}>
        <Label content={skill.title} />
      </div>,
      <div key={`desc-${index}`} className={usage === "live" ? "ml-8 text-sm" : "ml-8 text-11px"}>
        {typeof skill.description === "string"
          ? <p>{skill.description}</p>
          : skill.description.map((d, i) => <p key={i}>{d}</p>)}
      </div>
    ])}
  </div>
</Section>
  );
}