"use client";

import { useContext } from "react";
import Section from "@/components/section/section";
import { LanguageContext } from "@/components/lang/language-provider";
import Label from "../labels/label";
import { getLocalizedSection } from "@/content/config";
import type { SkillCategory } from "@/types/skill-category";

type Props = {
  usage: "live" | "pdf";
};

export default function SkillSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  const { data: skills, title } = getLocalizedSection(language, "skills") as { data: SkillCategory[]; title: string };

  const style = usage === "live" ? "font-bold whitespace-nowrap text-sm" : "font-bold whitespace-nowrap text-[11px]";
  const descStyle = usage === "live" ? "text-sm" : "text-[11px]";

  return (
    <Section title={title} usage={usage}>
      <div className="m-0 grid grid-cols-[max-content,minmax(0,1fr)] items-start gap-x-8 gap-y-1 p-0">
        {skills.map((skill: SkillCategory, index: number) => (
          <div key={`row-${index}`} className="contents">
            <div className={style}>
              <Label content={skill.name} usage={usage} />
            </div>
            <div className={`min-w-0 ${descStyle}`} style={{ color: 'var(--color-text-primary)' }}>
              <p>{skill.skills.join("·")}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
