"use client";

import Section from "./section";
import { Icons } from "@/components/icons";
import LabelWithGraphic from "@/components/label-with-graphic";
import { useContext } from "react";
import { LanguageContext } from "../lang/language-provider";
import Experience from "../experience";
import Title from "@/components/label-with-link";

const education_en: ExperienceProps[] = [
  {
    head1: "MSc. Computer Science",
    head2: <Title title="University of Melbourne" icon={Icons.School} link="https://www.unimelb.edu.au" />,
    head3: <LabelWithGraphic icon={Icons.GraduationCap} content="NA" />,
    head4: "Feb 2024 - Mar 2026(Exp.)",
    bulletPoints: []
  },
  {
    head1: "BSc. Computer Science",
    head2: <Title title="The Chinese University of Hong Kong" icon={Icons.School} link="https://www.cuhk.edu.hk" />,
    head3: <LabelWithGraphic icon={Icons.GraduationCap} content="GPA: 3.4/4.0, ELITE Stream" />,
    head4: "Sep 2019 - Jul 2023",
    bulletPoints: []
  },
 
];

const education_zh: ExperienceProps[] = [
  {
    head1: "计算机科学硕士",
    head2: <Title title="墨尔本大学" icon={Icons.School} link="https://www.unimelb.edu.au" />,
    head3: <LabelWithGraphic icon={Icons.GraduationCap} content="NA" />,
    head4: "2024年2月 - 2026年3月（预计）",
    bulletPoints: []
  },
  {
    head1: "计算机科学学士",
    head2: <Title title="香港中文大学" icon={Icons.School} link="https://www.cuhk.edu.hk" />,
    head3: <LabelWithGraphic icon={Icons.GraduationCap} content="GPA: 3.4/4.0, ELITE 流" />,
    head4: "2019年9月 - 2023年7月",
    bulletPoints: []
  },
];

export default function EducationSection() {
  const { language } = useContext(LanguageContext);
  const education = language === "en" ? education_en : education_zh;
  const title = language === "en" ? "Education" : "教育经历";

  return (
    <Section title={title}>
      <div className="flex flex-col gap-y-1">
        {education.map((e, index) => (
          <Experience key={index} {...e} />
        ))}
      </div>
    </Section>
  );
}
