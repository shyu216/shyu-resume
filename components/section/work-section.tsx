"use client";

import Section from "@/components/section";
import Experience from "@/components/experience";
import LabelWithGraphic from "@/components/label-with-graphic";
import { Icons } from "@/components/icons";
import LabelWithLink from "@/components/label-with-link";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { workExperience as workExperienceEn } from "@/data/work_experience_en";
import { workExperience as workExperienceZh } from "@/data/work_experience_zh";

type Props = {
  usage: "live" | "pdf";
};

export default function WorkSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  const workExperience = language === "en" ? workExperienceEn : workExperienceZh;
  const title = language === "en" ? "WORK EXPERIENCE" : "工作经历";

  return (
    <Section title={title} usage={usage}>
      <div className="flex flex-col gap-y-1">
        {workExperience.map((e, index) => (
          <Experience
            key={index}
            head1={e.head1}
            head2={<LabelWithLink title={e.head2.title} icon={Icons.Building} link={e.head2.link} />}
            head3={<LabelWithGraphic icon={Icons.Stack} content={e.head3} />}
            head4={e.head4}
            bulletPoints={e.bulletPoints}
            usage={usage}
          />
        ))}
      </div>
    </Section>
  );
}