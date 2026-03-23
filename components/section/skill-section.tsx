"use client";

import { useContext, useMemo } from "react";
import Section from "@/components/section/section";
import { LanguageContext } from "@/components/lang/language-provider";
import { skills as skillsZh } from "@/content/zh/skills";
import { skills as skillsJa } from "@/content/ja/skills";
import { skills as skillsFr } from "@/content/fr/skills";
import Label from "../labels/label";
import { useJobType } from "@/components/job/job-type-provider";
import { getJobStackKeywords } from "@/lib/job-stack-keywords";
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
    zh: { data: skillsZh, title: "技能" },
    ja: { data: skillsJa, title: "スキル" },
    fr: { data: skillsFr, title: "Compétences" },
  }, language);

  // 基于 jobType 关键词过滤 skills
  // 策略：先用中文技能数据过滤获取索引，再用索引过滤当前语言的技能
  const filteredSkills = useMemo(() => {
    // 如果没有关键词，返回所有技能
    if (!keywords || keywords.length === 0) {
      return skills;
    }
    
    // 第一步：用中文数据过滤，获取匹配的技能索引/ID
    const matchedIndices = skillsZh
      .map((skill, index) => ({ skill, index }))
      .filter(({ skill }) => 
        skill.skills.some(skillName => hasKeywordMatches(skillName, keywords))
      )
      .map(({ index }) => index);
    
    // 第二步：用索引过滤当前语言的技能数据
    // 假设各语言技能数组顺序一致
    return skills.filter((_, index) => matchedIndices.includes(index));
  }, [skills, keywords]);

  const style = usage === "live" ? "font-bold whitespace-nowrap text-sm" : "font-bold whitespace-nowrap text-[11px]";
  const descStyle = usage === "live" ? "ml-8 text-sm" : "ml-8 text-[11px]";

  return (
    <Section title={title} usage={usage}>
      <div className="break-inside-avoid page-break-inside-avoid break-before-auto">
        <div className="grid grid-cols-1 grid-cols-[max-content,1fr] items-start">
          {filteredSkills.map((skill, index) => [
            <div key={`${skill.id}-label`} className={style} style={{ color: 'var(--color-text-primary)' }}>
              {skill.name}
            </div>,
            <div key={`${skill.id}-desc`} className={descStyle} style={{ color: 'var(--color-text-primary)' }}>
              {skill.skills.join("、")}
            </div>
          ]).flat()}
        </div>
      </div>
    </Section>
  );
}
