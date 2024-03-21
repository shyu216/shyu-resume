"use client";

import Section from "./section";
import Experience from "@/components/experience";
import LabelWithGraphic from "@/components/label-with-graphic";
import { Icon, Icons } from "@/components/icons";
import Title from "@/components/label-with-link";
import { useContext } from "react";
import { LanguageContext } from "../lang/language-provider";

const exp_en: ExperienceProps[] = [
  {
    head1: "Full Stack Developer, CTO",
    head2: <Title icon={Icons.Building} title="ReCube, Hong Kong" link="https://www.re3.world" />,
    head3: <LabelWithGraphic icon={Icons.Stack} content="Next.js, AWS" />,
    head4: "Apr 2023 - Feb 2024",
    bulletPoints: [
      "To collaborate with the CEO and COO on a reusable tableware borrowing program, aiding Hong Kong's environmental progress.",
      "Assist in the development and maintenance of the program's software applications and database.",
      "Worked closely with the team to define, design, and ship new features, and to identify and resolve bugs.",
      "Implemented and deployed critical features to enhance user experience, including user authentication, payment integration, camera scanning, and email notifications, ensuring application stability and maximizing user satisfaction.",
    ],
  },
];

const exp_zh: ExperienceProps[] = [
  {
    head1: "全栈开发工程师，CTO",
    head2: <Title icon={Icons.Building} title="ReCube, 香港" link="https://www.re3.world" />,
    head3: <LabelWithGraphic icon={Icons.Stack} content="Next.js, AWS" />,
    head4: "2023年4月 - 2024年2月",
    bulletPoints: [
      "与CEO和COO合作，开发一个重用餐具的租借程序，助力香港环保事业发展。",
      "协助开发和维护程序的软件应用和数据库。",
      "与团队紧密合作，定义、设计和发布新功能，识别和解决软件错误。",
      "实施并部署了关键功能以增强用户体验，包括用户认证、支付集成、相机扫描和电子邮件通知，确保应用程序的稳定性并最大化用户满意度。",
    ],
  },
];

export default function WorkSection() {
  const { language } = useContext(LanguageContext);
  const exp = language === "en" ? exp_en : exp_zh;
  const title = language === "en" ? "WORK EXPERIENCE" : "工作经历";

  return (
    <Section title={title}>
      <div className="flex flex-col gap-y-1">
        {exp.map((e, index) => (
          <Experience key={index} {...e} />
        ))}
      </div>
    </Section>
  );
}
