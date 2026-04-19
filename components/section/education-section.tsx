"use client";

import Section from "@/components/section/section";
import { Icons } from "@/components/ui/icons";
import LabelWithGraphic from "@/components/labels/label-with-graphic";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import Experience from "@/components/section/experience";
import LabelWithLink from "@/components/labels/label-with-link";
import Label from "@/components/labels/label";
import { getLocalizedSection } from "@/content/config";
import type { Education } from "@/types/education";

type Props = {
  usage: "live" | "pdf";
};

export default function EducationSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  const { data: education, title } = getLocalizedSection(language, "education") as { data: Education[]; title: string };

  return (
    <Section title={title} usage={usage}>
      <div className="flex flex-col gap-y-0">
        {education.map((e: Education, index: number) => (
          <Experience
            key={index}
            head1={<Label content={e.degree} usage={usage} />}
            head4={
              e.institutionLink ? (
                <LabelWithLink
                  content={<LabelWithGraphic image={e.institutionImage} content={e.institution} />}
                  link={e.institutionLink}
                  usage={usage}
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
