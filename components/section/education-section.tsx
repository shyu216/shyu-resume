"use client";

import Section from "./section";
import { Icons } from "@/components/icons";
import LabelWithGraphic from "@/components/label-with-graphic";
import { useContext } from "react";
import { LanguageContext } from "../lang/language-provider";

const education_en: EducationProps[] = [
  {
    title: "BSc. Computer Science",
    gpa: "GPA: 3.4/4.0, ELITE Stream", //, Honours, Second Class Upper Division
    org: {
      name: "The Chinese University of Hong Kong",
      logo: "/images/logos/cuhk.png",
    },
    time: "Sep 2019 - Jul 2023",
  },
  {
    title: "MSc. Computer Science",
    gpa: "NA",
    org: {
      name: "University of Melbourne",
      logo: "/",
    },
    time: "Feb 2024 - Mar 2026(Exp.)"
  }
];

const education_zh: EducationProps[] = [
  {
    title: "计算机科学学士",
    gpa: "GPA: 3.4/4.0, ELITE 流", //, Honours, Second Class Upper Division
    org: {
      name: "香港中文大学",
      logo: "/images/logos/cuhk.png",
    },
    time: "2019年9月 - 2023年7月",
  },
  {
    title: "计算机科学硕士",
    gpa: "NA",
    org: {
      name: "墨尔本大学",
      logo: "/",
    },
    time: "2024年2月 - 2026年3月（预计）"
  }
];

function Education({ title, gpa, org, time }: EducationProps) {
  return (
    <section className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
      <div className="hidden md:block">
        <div className="text-sm font-semibold flex flex-wrap justify-between text-zinc-700 dark:text-zinc-300">
          <div className="flex gap-x-4 flex-wrap">
            <span className="font-bold text-black dark:text-white">
              {title}
            </span>
            <LabelWithGraphic icon={Icons.GraduationCap} content={gpa} />
          </div>
          <span>{time}</span>
        </div>
        <LabelWithGraphic icon={Icons.School2} content={org.name} />
      </div>
      <div className="text-sm font-semibold md:hidden text-zinc-700 dark:text-zinc-300 mb-1">
        <div className="flex gap-x-4 flex-wrap justify-between">
          <div className="font-bold text-black dark:text-white">{title}</div>
          <LabelWithGraphic icon={Icons.GraduationCap} content={gpa} />
        </div>
        <div className="flex gap-x-4 flex-wrap justify-between">
          <LabelWithGraphic icon={Icons.School2} content={org.name} />
          <span className="text-right flex-1">{time}</span>
        </div>
      </div>
    </section>
  );
}

export default function EducationSection() {
  const { language } = useContext(LanguageContext);
  const education = language === "en" ? education_en : education_zh;
  const title = language === "en" ? "Education" : "教育经历";

  return (
    <Section title={title}>
      <div className="flex flex-col gap-y-1">
        {education.map((e, index) => (
          <Education key={index} {...e} />
        ))}
      </div>
    </Section>
  );
}
