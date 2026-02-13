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
import { type Project } from "@/types/project";

type Props = {
  usage: "live" | "pdf";
};

export default function ProjectSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  const contentMap = {
    en: { data: projectsEn, title: "PROJECT" },
    zh: { data: projectsZh, title: "项目经历" },
    "zh-hk": { data: projectsZhHk, title: "項目經歷" },
  };
  
  const { data: projects, title } = contentMap[language];


  const filteredProjects = useMemo(
    () => projects.filter((project: Project) => (usage === "pdf" ? project.rank === 1 : true)),
    [projects, usage]
  );

  return (
    <Section title={title} usage={usage}>
      <div className="flex flex-col gap-y-1">
        {filteredProjects.map((project) => (
          <Experience
            key={project.id}
            head1={<LabelWithLink content={<Label content={project.name} />} link={project.link} />}
            head2={
              project.subtitle
                ? <LabelWithGraphic icon={project.subtitleIcon ?? Icons.FileBadge} content={project.subtitle} />
                : undefined
            }
            head3={<LabelWithGraphic icon={Icons.Stack} content={project.techStack} />}
            head4={project.dateRange}
            bulletPoints={project.bullets}
            usage={usage}
          />
            ))}
      </div>
    </Section>
  );
}