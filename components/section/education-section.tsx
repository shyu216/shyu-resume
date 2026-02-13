"use client";

import Section from "@/components/section/section";
import { Icons } from "@/components/ui/icons";
import LabelWithGraphic from "@/components/labels/label-with-graphic";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import Experience from "@/components/section/experience";
import LabelWithLink from "@/components/labels/label-with-link";
import { education as educationEn } from "@/content/en/education";
import { education as educationZh } from "@/content/zh/education";
import { education as educationZhHk } from "@/content/zh-hk/education";
import Label from "@/components/labels/label";
import { type Education } from "@/types/education";

type Props = {
  usage: "live" | "pdf";
};

export default function EducationSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  
  const contentMap = {
    en: { data: educationEn, title: "EDUCATION" },
    zh: { data: educationZh, title: "教育经历" },
    "zh-hk": { data: educationZhHk, title: "教育經歷" },
  };
  
  const { data: education, title } = contentMap[language];

  return (
    <Section title={title} usage={usage}>
      <div className="flex flex-col gap-y-1">
        {education.map((e, index) => (
          <Experience
            key={index}
            head1={<Label content={e.degree + (e.withDistinction ? " (with Distinction)" : "")} />}
            head4={
              e.institutionLink ? (
                <LabelWithLink
                  content={<LabelWithGraphic image={e.institutionImage} content={e.institution} />}
                  link={e.institutionLink}
                />
              ) : (
                <LabelWithGraphic image={e.institutionImage} content={e.institution} />
              )
            }
            head5={e.gpa ? <LabelWithGraphic icon={Icons.GraduationCap} content={e.gpa} /> : undefined}
            head6={e.dateRange}
            bulletPointsShort={e.honors}
            usage={usage}
          />
        ))}
      </div>
    </Section>
  );
}