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
                    <p key={i}>{d}</p>
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
                    <p key={i}>{d}</p>
                  ))
              }
            </div>
          </div>
      ))}
    </Section>
  );
}