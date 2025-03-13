"use client";

import Section from "@/components/section";
import Experience from "@/components/experience";
import LabelWithGraphic from "@/components/label-with-graphic";
import { Icons } from "@/components/icons";
import LabelWithLink from "@/components/label-with-link";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { projects as projectsEn } from "@/data/projects_en";
import { projects as projectsZh } from "@/data/projects_zh";

type Props = {
  usage: "live" | "pdf";
};

export default function ProjectSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  const projects = language === "en" ? projectsEn : projectsZh;
  const title = language === "en" ? "PROJECT" : "项目经历";

  return (
    <Section title={title} usage={usage}>
      <div className="flex flex-col gap-y-1">
        {projects.map((project, index) => (
          <Experience
            key={index}
            head1={project.head1}
            head2={<LabelWithLink title={project.head2.title} icon={Icons.Code} link={project.head2.link} />}
            head3={<LabelWithGraphic icon={Icons.Stack} content={project.head3} />}
            head4={project.head4}
            bulletPoints={project.bulletPoints}
            usage={usage}
          />
        ))}
      </div>
    </Section>
  );
}