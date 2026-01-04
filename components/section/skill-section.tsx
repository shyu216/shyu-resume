"use client";

import { useContext } from "react";
import Section from "@/components/section/section";
import { LanguageContext } from "@/components/lang/language-provider";
import { skills as skillsEn } from "@/content/skills_en";
import { skills as skillsZh } from "@/content/skills_zh";

type Props = {
  usage: "live" | "pdf";
};

export default function SkillSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  const skills = language === "en" ? skillsEn : skillsZh;
  const title = language === "en" ? "SKILLS" : "技能";

  return (
<Section title={title} usage={usage}>
  <div className="grid grid-cols-1 grid-cols-[max-content,1fr] items-start">
    {skills.map((skill, index) => [
      <div key={`title-${index}`} className={usage === "live" ? "font-bold whitespace-nowrap text-sm" : "font-bold whitespace-nowrap text-11px"}>
        {skill.title}
      </div>,
      <div key={`desc-${index}`} className={usage === "live" ? "ml-8 text-mygray-700 dark:text-mygray-300 text-sm" : "ml-8 text-mygray-700 dark:text-mygray-300 text-11px"}>
        {typeof skill.description === "string"
          ? <p>{skill.description}</p>
          : skill.description.map((d, i) => <p key={i}>{d}</p>)}
      </div>
    ])}
  </div>
</Section>
  );
}