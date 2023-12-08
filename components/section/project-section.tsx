"use client";

import Section from "./section";
import Experience from "@/components/experience";
import LabelWithGraphic from "@/components/label-with-graphic";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { type ImageProps } from "next/image";
// import { headers } from "next/headers";
import { type Icon } from "@/components/icons";
import { useContext } from "react";
import { LanguageContext } from "../lang/language-provider";

type ProjectTitleProps = {
  image?: ImageProps["src"];
  icon?: Icon;
  title: string;
  link: string;
};

// async function getStarNumber(owner: string, repo: string) {
//   const host = headers().get("host");
//   const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
//   const queryParams = new URLSearchParams({ owner, repo }).toString();
//   const res = await fetch(
//     `${protocol}://${host}/api/github/star?${queryParams}`,
//     {
//       cache: "no-cache",
//     }
//   );
//   const { starNumber } = await res.json();
//   return starNumber;
// }

function ProjectTitle({ icon, image, title, link }: ProjectTitleProps) {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex items-center gap-x-1 group"
    >
      {icon && <LabelWithGraphic icon={icon} content={title} />}
      {image && <LabelWithGraphic image={image} content={title} />}
      <Icons.Link
        size={12}
        className="text-zinc-400 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200 group-hover:animate-shake"
      />
    </Link>
  );
}

export default function ProjectSection() {
  const { language } = useContext(LanguageContext);

  const exp_en: ExperienceProps[] = [
    // {
    //   head1: (
    //     <ProjectTitle
    //       image="/images/logos/nextjs.png"
    //       title="Next.js"
    //       link="https://nextjs.org/"
    //     />
    //   ),
    //   head2: (
    //     <LabelWithGraphic icon={Icons.Stack} content="TypeScript, React, SSG" />
    //   ),
    //   head3: (
    //     <LabelWithGraphic
    //       icon={Icons.Star}
    //       content={`# Github Stars: ${await getStarNumber(
    //         "vercel",
    //         "next.js"
    //       )}`}
    //     />
    //   ),
    //   head4: "Sep 2023 - Pres.",
    //   bulletPoints: [
    //     "Id ex et adipisicing proident excepteur.",
    //     "Dolore ex commodo non et qui. Reprehenderit exercitation irure culpa sint nisi eiusmod amet ad occaecat quis.",
    //     "Veniam esse enim adipisicing incididunt tempor minim irure occaecat cupidatat duis consectetur dolor.",
    //     "Qui cupidatat adipisicing adipisicing aliqua irure id esse aute pariatur laborum non.",
    //   ],
    // },
    // {
    //   head1: (
    //     <ProjectTitle
    //       image="/images/logos/tailwind.webp"
    //       title="Tailwind CSS"
    //       link="https://tailwindcss.com/"
    //     />
    //   ),
    //   head2: <LabelWithGraphic icon={Icons.Stack} content="HTML, CSS" />,
    //   head3: <LabelWithGraphic icon={Icons.Star} content={`# Users: 412343`} />,
    //   head4: "Sep 2023 - Pres.",
    //   bulletPoints: [
    //     "Supported user to create their resume with React, and easily export it as pdf (like this resume)",
    //     "Enhanced resume with React, featuring responsive/interactive design, dark mode, showing real-time API data, and even integrating GPT etc.",
    //   ],
    // },

    {  head1: (<ProjectTitle title="Poetry Card" icon={Icons.SmartPhone} link="https://github.com/shyu216/ShiYin-Poem-RN" />),
    head2: <LabelWithGraphic content="GitHub Repo." />,
    head3: <LabelWithGraphic icon={Icons.Stack} content="React Native, SQLite" />,
    head4: "Dec 2023 - Pres.",
    bulletPoints: [ 
      "Situation: The goal was to create a user-friendly way for people to access and appreciate Chinese classical poetry.", 
      "Task: Design and implement the application's user interface, integrate the chinese-poetry database.", 
      "Action: Developed this application using React Native and SQLite, and implemented features such as poetry display, random refresh, and history rollback.", 
      "Result: Published the source code on GitHub and released a downloadable Android application.", ] },
    {
      head1: (<ProjectTitle title="3D Object Detection" icon={Icons.Code} link="https://github.com/shyu216/DPC" />),
      head2: <LabelWithGraphic content="Final Year Project" />,
      head3: <LabelWithGraphic icon={Icons.Stack} content="Python, Pytorch, Open3D" />,
      head4: "Sep 2022 - May 2023",
      bulletPoints: [
        "Situation: Existing 3D object detection methods struggled to predict accurate bounding boxes for objects with fewer points, limiting current detectors' performance.",
        "Task: To enhance 3D detectors by integrating densified point clouds generated through depth completion methods using a two-branch neural network architecture.",
        "Action: Conducted extensive research, implemented the neural network, and collaborated with my advisor and peers to validate the approach.",
        "Result: Improved detection accuracy by 5.70% for cars, 11.38% for pedestrians, and 0.41% for cyclists compared to the baseline method.",
      ],
    },
    {
      head1: (<ProjectTitle title="Draw & Guess Game" icon={Icons.LayoutTemplate} link="https://github.com/easyDG" />),
      head2: <LabelWithGraphic content="Software Engineering Project" />,
      head3: <LabelWithGraphic icon={Icons.Stack} content="MySQL, NodeJS, ExpressJS" />,
      head4: "Jan 2022 - May 2022",
      bulletPoints: [
        `Situation: As part of a team working on the "Draw & Guess Game" project, aimed to create an engaging and interactive web application.`,
        "Task: To contribute to the design and development of the application, including the database, user login and profile interfaces, and routing system.",
        "Action: Collaborated with the team to write a thorough specification document, designed and implemented user-friendly interfaces, and developed a robust routing system using NodeJS and ExpressJS.",
        `Result: Deployed to  AWS EC2, and successfully launched a demo of the "Draw & Guess Game" application among 4 computers.`,
      ]
    }
  ];

  const exp_zh: ExperienceProps[] = [
    {
      head1: (<ProjectTitle title="诗词卡片应用" icon={Icons.SmartPhone} link="https://github.com/shyu216/ShiYin-Poem-RN" />),
      head2: <LabelWithGraphic content="GitHub 项目" />,
      head3: <LabelWithGraphic icon={Icons.Stack} content="React Native, SQLite" />,
      head4: "2023年12月 - 现在",
      bulletPoints: [
        `情况：目标是创建一个用户友好的方式让人们能够接触和欣赏中国古典诗词。`,
        "任务：设计和实现应用的用户界面，集成 chinese-poetry 数据库。",
        "行动：使用 React Native 和 SQLite 开发了这个应用，并实现了诗词的展示、随机刷新和历史回滚等功能。",
        "结果：在 GitHub 上发布了源代码，并发布了一个可供下载的 Android 应用。",
      ]
    },
    {
      head1: (<ProjectTitle title="3D物体检测" icon={Icons.Code} link="https://github.com/shyu216/DPC" />),
      head2: <LabelWithGraphic content="毕业设计项目" />,
      head3: <LabelWithGraphic icon={Icons.Stack} content="Python, Pytorch, Open3D" />,
      head4: "2022年9月 - 2023年5月",
      bulletPoints: [
        "情况：现有的3D物体检测方法在预测点较少的物体的边界框时，精度较低，限制了当前检测器的性能。",
        "任务：通过使用两分支神经网络架构，整合通过深度完成方法生成的密集点云，以提高3D检测器的性能。",
        "行动：进行了广泛的研究，实现了神经网络，并与我的导师和同伴合作验证了这种方法。",
        "结果：与基线方法相比，提高了汽车的检测精度5.70%，行人11.38%，自行车0.41%。",
      ],
    },
    {
      head1: (<ProjectTitle title="画图猜词游戏" icon={Icons.LayoutTemplate} link="https://github.com/easyDG" />),
      head2: <LabelWithGraphic content="软件工程项目" />,
      head3: <LabelWithGraphic icon={Icons.Stack} content="MySQL, NodeJS, ExpressJS" />,
      head4: "2022年1月 - 2022年5月",
      bulletPoints: [
        `情况：作为"画图猜词游戏"项目的团队一员，目标是创建一个引人入胜、互动性强的网络应用程序。`,
        "任务：贡献应用程序的设计和开发，包括数据库、用户登录和个人资料界面以及路由系统。",
        "行动：与团队合作编写了详尽的规格文档，设计和实现了用户友好的界面，并使用NodeJS和ExpressJS开发了健壮的路由系统。",
        `结果：在 AWS EC2 上部署，并成功在4台计算机之间启动了一个演示游戏。`,
      ]
    },
  ];

  const exp = language === "en" ? exp_en : exp_zh;
  const title = language === "en" ? "PROJECT" : "项目经历";

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
