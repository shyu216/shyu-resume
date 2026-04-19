import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
  {
    id: "recube",
    position: "Full Stack Developer (Tech Lead)",
    company: "ReCube, Hong Kong",
    companyLink: "https://www.re3.world",
    companyImage: "./images/recube.png",
    dateRange: "Apr 2023 - Feb 2024",
    techStack: "Next.js, AWS", //  , DynamoDB, Stripe, Firebase, Cloudflare",
    jobTypes: ["SWE", "SRE", "AIMR"],
    bullets: [
      "Led a 3-person agile team to build a reusable lunchbox borrowing/returning platform, delivering 80+ production features using **Next.js SSR PWA** and **AWS** cloud infrastructure, achieving 100% UAT pass rate",
      "Collaborated with business stakeholders via Asana/WhatsApp for requirements gathering, sprint planning, and delivery timeline management; also provided project guidance to other developers",
      "Built a cloud-native full-stack container rental platform with **Next.js** frontend and **AWS DynamoDB** backend, enabling cutlery tracking and streamlining staff workflow from QR scanning to item tracing",
      "Designed **CI/CD** pipelines and infrastructure as code (**IaC**) using **AWS CDK**, achieving branch environment isolation and reducing deployment time from hours to 5 minutes",
      "Managed multi-environment infrastructure with **Cloudflare** DNS/routing covering dev/test/prod environments",
      "Architected an event-driven backend system on **AWS** to handle payment workflows and notification pipelines, supporting automated event scheduling",
      "Built an event-driven notification system using **AWS EventBridge/SES** with customizable HTML templates to automate borrowing/return reminders and payment notifications",
      "Integrated **Stripe** payment processing and enhanced email/SMS account system, ensuring secure user actions and authentication",
      "Created and deployed in-app tutorial videos to reduce onboarding friction for new users and restaurant staff",
    ],
  },
];
