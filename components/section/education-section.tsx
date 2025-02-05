"use client";

import Section from "@/components/section";
import { Icons } from "@/components/icons";
import LabelWithGraphic from "@/components/label-with-graphic";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import Experience from "@/components/education";
import Title from "@/components/label-with-link";

const education_en: ExperienceProps[] = [
  {
    head1: "MSc. Computer Science",
    head2: <Title title="The University of Melbourne" icon={Icons.School} link="https://www.unimelb.edu.au" />,
    head3: <LabelWithGraphic icon={Icons.GraduationCap} content="WAM: 77.875" />,
    head4: "Feb 2024 - Mar 2026(Exp.)",
    bulletPoints: [

    ]
  },
  {
    head1: "BSc. Computer Science",
    head2: <Title title="The Chinese University of Hong Kong" icon={Icons.School} link="https://www.cuhk.edu.hk" />,
    head3: <LabelWithGraphic icon={Icons.GraduationCap} content="MGPA: 3.364" />,
    head4: "Sep 2019 - Jul 2023",
    bulletPoints: [
      "Honours at Entrance",
      "Dean's List, 2022-2023",
      "ELITE Stream"
    ]
  },
 
];

const education_zh: ExperienceProps[] = [
  {
    head1: "计算机科学硕士",
    head2: <Title title="墨尔本大学" icon={Icons.School} link="https://www.unimelb.edu.au" />,
    head3: <LabelWithGraphic icon={Icons.GraduationCap} content="WAM: 77.875" />,
    head4: "2024年2月 - 2026年3月（预计）",
    bulletPoints: [

    ]
  },
  {
    head1: "计算机科学学士",
    head2: <Title title="香港中文大学" icon={Icons.School} link="https://www.cuhk.edu.hk" />,
    head3: <LabelWithGraphic icon={Icons.GraduationCap} content="MGPA: 3.364" />,
    head4: "2019年9月 - 2023年7月",
    bulletPoints: [
      "入学荣誉",
      "2022-2023年度院长名单",
      "精英流"
    ]
  },
];

type Props = {
  usage: "live" | "pdf";
};

export default function EducationSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const education = language === "en" ? education_en : education_zh;
  const title = language === "en" ? "EDUCATION" : "教育经历";

  return (
    <Section title={title} usage={usage}>
      <div className="flex flex-col gap-y-1">
        {education.map((e, index) => (
          <Experience key={index} {...e} usage={usage} />
        ))}
      </div>
    </Section>
  );
}
