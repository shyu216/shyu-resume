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
            head1={<Label content={e.head1} />}
            head4={<LabelWithLink content={<LabelWithGraphic image={e.head2.image} content={e.head2.title} />} link={e.head2.link} />}
            head5={<LabelWithGraphic icon={Icons.GraduationCap} content={e.head3} />}
            head6={e.head4}
            bulletPointsShort={e.bulletPoints}
            usage={usage}
          />
        ))}
      </div>
    </Section>
  );
}