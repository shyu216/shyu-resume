"use client";

import { useContext, useMemo } from "react";
import Section from "@/components/section/section";
import { LanguageContext } from "@/components/lang/language-provider";
import { skills as skillsEn } from "@/content/en/skills";
import { skills as skillsZh } from "@/content/zh/skills";
import { skills as skillsZhHk } from "@/content/zh-hk/skills";
import Label from "../labels/label";
import { useJobType } from "@/components/job/job-type-provider";
import { getJobStackKeywords } from "@/components/job/job-stack-keywords";
import { hasKeywordMatches } from "@/lib/keyword-utils";
import { useLanguageMap } from "@/lib/utils";

type Props = {
  usage: "live" | "pdf";
};

export default function SkillSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const { jobType } = useJobType();
  const keywords = getJobStackKeywords(jobType);

  const { data: skills, title } = useLanguageMap({
    en: { data: skillsEn, title: "SKILLS" },
    zh: { data: skillsZh, title: "技能" },
    "zh-hk": { data: skillsZhHk, title: "技能" },
  }, language);

  // 基于 jobType 关键词过滤 skills
  const filteredSkills = useMemo(() => {
    // 如果是 NONE 或没有关键词，返回所有技能
    if (jobType === 'NONE' || !keywords || keywords.length === 0) {
      return skills;
    }
    // 过滤逻辑：检查技能类别中是否有至少一个技能匹配关键词
    return skills.filter(skill =>
      skill.skills.some(skillName => hasKeywordMatches(skillName, keywords))
    );
  }, [skills, keywords, jobType]);

  const style = usage === "live" ? "font-bold whitespace-nowrap text-sm" : "font-bold whitespace-nowrap text-[11px]";
  const descStyle = usage === "live" ? "ml-8 text-sm" : "ml-8 text-[11px]";

  return (
    <Section title={title} usage={usage}>
      <div className="break-inside-avoid page-break-inside-avoid break-before-auto">
        <div className="grid grid-cols-1 grid-cols-[max-content,1fr] items-start">
          {filteredSkills.map((skill, index) => [
            <div key={`title-${index}`} className={style}>
              <Label content={skill.name} usage={usage} />
            </div>,
            <div key={`desc-${index}`} className={descStyle} style={{ color: 'var(--color-text-primary)' }}>
              <p>{skill.skills.join(" · ")}</p>
            </div>
          ])}
        </div>
      </div>
    </Section>
  );
}
