"use client";

import Section from "@/components/section/section";
import Experience from "@/components/section/experience";
import LabelWithGraphic from "@/components/labels/label-with-graphic";
import { Icons } from "@/components/ui/icons";
import LabelWithLink from "@/components/labels/label-with-link";
import { useContext, useMemo } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { projects as projectsZh } from "@/content/zh/projects";
import { projects as projectsJa } from "@/content/ja/projects";
import { projects as projectsFr } from "@/content/fr/projects";
import Label from "@/components/labels/label";
import { useJobType } from "@/components/job/job-type-provider";
import { getJobStackKeywords } from "@/lib/job-stack-keywords";
import { hasKeywordMatches } from "@/lib/keyword-utils";
import { useLanguageMap } from "@/lib/utils";

type Props = {
  usage: "live" | "pdf";
};

export default function ProjectSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const { jobType } = useJobType();
  const keywords = getJobStackKeywords(jobType);

  const { data: projects, title } = useLanguageMap({
    zh: { data: projectsZh, title: "项目经历" },
    ja: { data: projectsJa, title: "プロジェクト" },
    fr: { data: projectsFr, title: "Projets" },
  }, language);

  // 基于 jobType 关键词过滤 projects
  // 跨语言匹配：检查所有语言版本的项目内容，只要任一语言版本匹配，就显示该项目
  const filteredProjects = useMemo(() => {
    // 如果没有关键词，返回所有项目
    if (!keywords || keywords.length === 0) {
      return projects;
    }
    
    // 获取所有语言的项目数据用于跨语言匹配
    const allLanguageProjects = {
      zh: projectsZh,
      ja: projectsJa,
      fr: projectsFr
    };
    
    // 过滤逻辑：检查当前语言的项目
    // 同时通过项目ID关联，检查其他语言版本的bullet points是否匹配关键词
    return projects.filter(project => {
      // 首先检查当前语言版本是否匹配
      const currentLangMatch = project.bullets?.some(bullet => hasKeywordMatches(bullet, keywords)) || false;
      if (currentLangMatch) return true;
      
      // 如果当前语言不匹配，检查其他语言版本
      // 通过项目ID找到对应的其他语言版本
      const projectId = project.id;
      for (const [lang, langProjects] of Object.entries(allLanguageProjects)) {
        if (lang === language) continue; // 跳过当前语言，已经检查过了
        
        const langProject = langProjects.find(p => p.id === projectId);
        if (langProject?.bullets?.some(bullet => hasKeywordMatches(bullet, keywords))) {
          return true;
        }
      }
      
      return false;
    });
  }, [projects, keywords, jobType, language]);

  return (
    <Section title={title} usage={usage}>
      <div className="flex flex-col gap-y-1">
        {/* 替换成 filteredProjects.map */}
        {filteredProjects.map((project) => (
          <Experience
            key={project.id}
            head1={<LabelWithLink content={<Label content={project.name} usage={usage} />} link={project.link} usage={usage} />}
            head2={
              project.subtitle
                ? <LabelWithGraphic icon={project.subtitleIcon ?? Icons.FileBadge} content={project.subtitle} />
                : undefined
            }
            head3={<LabelWithGraphic icon={Icons.Stack} content={project.techStack} />}
            head4={project.dateRange}
            bulletPoints={project.bullets}
            usage={usage}
            keywords={keywords}
          />
        ))}
      </div>
    </Section>
  );
}
