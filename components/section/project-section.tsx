import Section from "./section";
import Experience from "@/components/experience";
import LabelWithGraphic from "@/components/label-with-graphic";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { type ImageProps } from "next/image";
import { headers } from "next/headers";
import { type Icon } from "@/components/icons";

type ProjectTitleProps = {
  image?: ImageProps["src"];
  icon?: Icon;
  title: string;
  link: string;
};

async function getStarNumber(owner: string, repo: string) {
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const queryParams = new URLSearchParams({ owner, repo }).toString();
  const res = await fetch(
    `${protocol}://${host}/api/github/star?${queryParams}`,
    {
      cache: "no-cache",
    }
  );
  const { starNumber } = await res.json();
  return starNumber;
}

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

export default async function ProjectSection() {
  const exp: ExperienceProps[] = [
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
        "Action: Collaborated with the team to write a thorough specification document, designed and implemented user-friendly login and profile interfaces, and developed a robust routing system using NodeJS and ExpressJS.",
        `Result: Successfully launched a demo of the "Draw & Guess Game" application on AWS EC2.`,
      ]
    }
  ];

  return (
    <Section title="PROJECT">
      <div className="flex flex-col gap-y-1">
        {exp.map((e, index) => (
          <Experience key={index} {...e} />
        ))}
      </div>
    </Section>
  );
}
