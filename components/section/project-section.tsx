"use client";

import Section from "@/components/section";
import Experience from "@/components/experience";
import LabelWithGraphic from "@/components/labels/label-with-graphic";
import { Icons } from "@/components/icons";
import LabelWithLink from "@/components/labels/label-with-link";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { projects as projectsEn } from "@/data/projects_en";
import { projects as projectsZh } from "@/data/projects_zh";
import Label from "@/components/labels/label";

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
            head1={<LabelWithLink content={<Label content={project.head1} />} link={project.link} />}
            head2={<LabelWithGraphic icon={Icons.Code} content={project.head2} />}
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