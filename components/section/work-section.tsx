"use client";

import Section from "@/components/section/section";
import Experience from "@/components/section/experience";
import LabelWithGraphic from "@/components/labels/label-with-graphic";
import { Icons } from "@/components/ui/icons";
import LabelWithLink from "@/components/labels/label-with-link";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { workExperience as workExperienceEn } from "@/content/en/work-experience";
import { workExperience as workExperienceZh } from "@/content/zh/work-experience";
import { workExperience as workExperienceZhHk } from "@/content/zh-hk/work-experience";
import Label from "@/components/labels/label";
import { type WorkExperience } from "@/types/work-experience";
import { useJobType } from "@/components/job/job-type-provider";
import { getJobStackKeywords } from "@/components/job/job-stack-keywords";
import { useLanguageMap } from "@/lib/utils";

type Props = {
  usage: "live" | "pdf";
};

export default function WorkSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const { jobType } = useJobType();
  const keywords = getJobStackKeywords(jobType);

  const { data: workExperience, title } = useLanguageMap({
    en: { data: workExperienceEn, title: "WORK EXPERIENCE" },
    zh: { data: workExperienceZh, title: "工作经历" },
    "zh-hk": { data: workExperienceZhHk, title: "工作經歷" },
  }, language);

  return (
    <Section title={title} usage={usage}>
      <div className="flex flex-col gap-y-1">
        {workExperience.map((e, index) => (
          <Experience
            key={index}
            head1={<Label content={e.position} usage={usage} />}
            head2={
              e.companyLink ? (
                <LabelWithLink
                  content={<LabelWithGraphic image={e.companyImage} content={e.company} />}
                  link={e.companyLink}
                  usage={usage}
                />
              ) : (
                <LabelWithGraphic image={e.companyImage} content={e.company} />
              )
            }
            head3={<LabelWithGraphic icon={Icons.Stack} content={e.techStack} />}
            head4={e.dateRange}
            bulletPoints={e.bullets}
            usage={usage}
            keywords={keywords}
          />
        ))}
      </div>
    </Section>
  );
}