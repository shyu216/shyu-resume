"use client";

import Section from "@/components/section/section";
import Experience from "@/components/section/experience";
import LabelWithGraphic from "@/components/labels/label-with-graphic";
import { Icons } from "@/components/ui/icons";
import LabelWithLink from "@/components/labels/label-with-link";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import Label from "@/components/labels/label";
import { useJobType } from "@/components/job/job-type-provider";
import { filterExperience, getLocalizedSection } from "@/content/config";

type Props = {
  usage: "live" | "pdf";
};

export default function WorkSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const { jobType } = useJobType();

  const { data: workExperience, title } = getLocalizedSection(language, "workExperience");

  const filteredWorkExperience = filterExperience(workExperience, jobType);

  return (
    <Section title={title} usage={usage}>
      <div className="flex flex-col gap-y-0">
        {filteredWorkExperience.map((e, index) => (
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
          />
        ))}
      </div>
    </Section>
  );
}
