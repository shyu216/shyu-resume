"use client";

import Section from "@/components/section/section";
import Experience from "@/components/section/experience";
import LabelWithGraphic from "@/components/labels/label-with-graphic";
import { Icons } from "@/components/ui/icons";
import LabelWithLink from "@/components/labels/label-with-link";
import { useContext, useMemo } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { projects as projectsEn } from "@/content/en/projects";
import { projects as projectsZh } from "@/content/zh/projects";
import { projects as projectsZhHk } from "@/content/zh-hk/projects";
import Label from "@/components/labels/label";
import { useJobType } from "@/components/job/job-type-provider";
import { getJobStackKeywords } from "@/components/job/job-stack-keywords";
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
    en: { data: projectsEn, title: "PROJECT" },
    zh: { data: projectsZh, title: "项目经历" },
    "zh-hk": { data: projectsZhHk, title: "項目經歷" },
  }, language);

  // 基于 jobType 关键词过滤 projects
  const filteredProjects = useMemo(() => {
    // 如果是 NONE 或没有关键词，返回所有项目
    if (jobType === 'NONE' || !keywords || keywords.length === 0) {
      return projects;
    }
    // 过滤逻辑：检查项目的 bullet points 中是否有至少一个匹配关键词
    return projects.filter(project => 
      project.bullets?.some(bullet => hasKeywordMatches(bullet, keywords)) || false
    );
  }, [projects, keywords, jobType]);

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