"use client";

import Section from "@/components/section/section";
import Experience from "@/components/section/experience";
import LabelWithGraphic from "@/components/labels/label-with-graphic";
import { Icons } from "@/components/ui/icons";
import LabelWithLink from "@/components/labels/label-with-link";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { workExperience as workExperienceEn } from "@/content/en/work_experience";
import { workExperience as workExperienceZh } from "@/content/zh/work_experience";
import { workExperience as workExperienceZhHk } from "@/content/zh-hk/work_experience";
import Label from "@/components/labels/label";

type Props = {
  usage: "live" | "pdf";
};

export default function WorkSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  let workExperience, title;
  if (language === "en") {
    workExperience = workExperienceEn;
    title = "WORK EXPERIENCE";
  } else if (language === "zh") {
    workExperience = workExperienceZh;
    title = "工作经历";
  } else {
    workExperience = workExperienceZhHk;
    title = "工作經歷";
  }

  return (
    <Section title={title} usage={usage}>
      <div className="flex flex-col gap-y-1">
        {workExperience.map((e, index) => (
          <Experience
            key={index}
            head1={<Label content={e.head1} />}
            head2={<LabelWithLink content={<LabelWithGraphic image={e.head2.image} content={e.head2.title} />} link={e.head2.link} />}
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