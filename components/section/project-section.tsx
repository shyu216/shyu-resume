"use client";

import Section from "@/components/section/section";
import Experience from "@/components/section/experience";
import LabelWithGraphic from "@/components/labels/label-with-graphic";
import { Icons } from "@/components/ui/icons";
import LabelWithLink from "@/components/labels/label-with-link";
import { useContext, useMemo } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import Label from "@/components/labels/label";
import { useJobType } from "@/components/job/job-type-provider";
import { filterExperience, getLocalizedSection } from "@/content/config";
import type { Project } from "@/types/project";

type Props = {
  usage: "live" | "pdf";
};

export default function ProjectSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const { jobType } = useJobType();

  const { data: projects, title } = getLocalizedSection(language, "project") as { data: Project[]; title: string };

  const filteredProjects = useMemo(() => {
    return filterExperience(projects, jobType) as Project[];
  }, [projects, jobType]);

  return (
    <Section title={title} usage={usage}>
      <div className="flex flex-col gap-y-0">
        {filteredProjects.map((project: Project) => (
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
          />
        ))}
      </div>
    </Section>
  );
}
