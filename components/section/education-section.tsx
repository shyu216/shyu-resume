"use client";

import Section from "@/components/section/section";
import { Icons } from "@/components/ui/icons";
import LabelWithGraphic from "@/components/labels/label-with-graphic";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import Experience from "@/components/section/experience";
import LabelWithLink from "@/components/labels/label-with-link";
import { education as educationEn } from "@/content/education_en";
import { education as educationZh } from "@/content/education_zh";
import Label from "@/components/labels/label";

type Props = {
  usage: "live" | "pdf";
};

export default function EducationSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const education = language === "en" ? educationEn : educationZh;
  const title = language === "en" ? "EDUCATION" : "教育经历";

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