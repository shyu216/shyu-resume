"use client";

import Section from "./section";
import Experience from "@/components/experience";
import LabelWithGraphic from "@/components/label-with-graphic";
import { Icon, Icons } from "@/components/icons";
import { ImageProps } from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "../lang/language-provider";

type CompanyLabelProps = {
  icon?: Icon;
  image?: ImageProps["src"];
  content: string;
  link: string;
};

function CompanyLabel({ icon, image, content, link }: CompanyLabelProps) {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex items-center gap-x-1 group"
    >
      {icon && <LabelWithGraphic icon={icon} content={content} />}
      {image && <LabelWithGraphic image={image} content={content} />}
      <Icons.Link
        size={12}
        className="text-zinc-400 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200 group-hover:animate-shake"
      />
    </Link>
  );
}

const exp_en: ExperienceProps[] = [
  // {
  //   head1: "Software Engineer",
  //   head2: <LabelWithGraphic icon={Icons.Stack} content="JavaScript, AWS" />,
  //   head3: (
  //     <LabelWithGraphic
  //       image="/images/logos/starbucks.svg"
  //       content="Starbucks, San Francisco"
  //     />
  //   ),
  //   head4: "Sep 2023 - Pres.",
  //   bulletPoints: [
  //     "Aliquip exercitation ut sunt ullamco magna cillum eiusmod proident sunt pariatur minim mollit labore.",
  //     "Do laborum deserunt officia sit fugiat laborum est esse tempor commodo nisi magna sint.",
  //     "Qui enim pariatur ea ullamco laborum do ipsum sit laboris voluptate deserunt ut irure do.",
  //     "Amet culpa nostrud cillum ut pariatur enim velit.",
  //   ],
  // },
  // {
  //   head1: "Risk Analyst",
  //   head2: <LabelWithGraphic icon={Icons.Stack} content="Financial Modeling" />,
  //   head3: (
  //     <LabelWithGraphic
  //       image="/images/logos/bitcoin.png"
  //       content="Investment Bank, New York"
  //     />
  //   ),
  //   head4: "Jul 2020 - Sep 2022",
  //   bulletPoints: [
  //     "Sint fugiat eu magna irure eu incididunt est sint occaecat fugiat tempor.",
  //     "Ipsum culpa fugiat consectetur nulla enim consequat ea tempor fugiat. Reprehenderit ullamco cillum consectetur dolore tempor voluptate consectetur.",
  //     "Nostrud quis reprehenderit non officia ullamco magna. Magna Lorem minim nisi occaecat adipisicing.",
  //   ],
  // },
  // {
  //   head1: "KOL",
  //   head2: <LabelWithGraphic icon={Icons.Stack} content="Content Creation" />,
  //   head3: (
  //     <LabelWithGraphic
  //       image="/images/logos/tiktok.png"
  //       content="Tiktok, London"
  //     />
  //   ),
  //   head4: "Jun 2019 - Jul 2020",
  //   bulletPoints: [
  //     "Voluptate occaecat reprehenderit aliqua mollit do amet eiusmod minim velit et non deserunt ex.",
  //     "Anim laborum elit eiusmod ullamco deserunt aliqua id est.",
  //   ],
  // },
  {
    head1: "Full Stack Developer, CTO",
    head2: (
      <CompanyLabel icon={Icons.Building} content="ReCube, Hong Kong" link="https://www.re3.world" />
    ),
    head3: (
      <LabelWithGraphic icon={Icons.Stack} content="Next.js, AWS" />
    ),
    head4: "Apr 2023 - Feb 2024",
    bulletPoints: [
      "Situation: To collaborate with the CEO and COO on a reusable tableware borrowing program, aiding Hong Kong's environmental progress.",
      "Task: Assist in the development and maintenance of the program's software applications and database.",
      "Action: Worked closely with the team to define, design, and ship new features, and to identify and resolve bugs.",
      "Result: Implemented and deployed critical features to enhance user experience, including user authentication, payment integration, camera scanning, and email notifications, ensuring application stability and maximizing user satisfaction.",
    ],
  },
];

const exp_zh: ExperienceProps[] = [
  {
    head1: "全栈开发工程师，CTO",
    head2: (
      <CompanyLabel icon={Icons.Building} content="ReCube, 香港" link="https://www.re3.world" />
    ),
    head3: (
      <LabelWithGraphic icon={Icons.Stack} content="Next.js, AWS" />
    ),
    head4: "2023年4月 - 2024年2月",
    bulletPoints: [
      "情况：与CEO和COO合作，开发一个重用餐具的租借程序，助力香港环保事业发展。",
      "任务：协助开发和维护程序的软件应用和数据库。",
      "行动：与团队紧密合作，定义、设计和发布新功能，识别和解决软件错误。",
      "结果：实施并部署了关键功能以增强用户体验，包括用户认证、支付集成、相机扫描和电子邮件通知，确保应用程序的稳定性并最大化用户满意度。",
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
