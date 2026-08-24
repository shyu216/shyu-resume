import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
  {
    id: "unimelbra",
    position: "Research Assistant",
    company: "The University of Melbourne, Australia",
    companyLink: "https://www.unimelb.edu.au",
    companyImage: "./images/unimelb.png",
    dateRange: "Apr 2026 - Jul 2026",
    techStack: "OpenGL",
    jobTypes: ["SWE", "SRE", "AIMR"],
    bullets: [
      "Assisted in designing next-gen 3D glassless display systems targeting Turing-test-level 3D perception",
      "Built MR orthodontic guidance pipeline on HoloLens 2 with XFeat/LightGlue/PnP (22Hz, 80ms latency)",
      "Demonstrated HL2 system at University of Melbourne Open Day 2026",
    ],
  },
  {
    id: "recube",
    position: "Full Stack Developer",
    company: "ReCube, Hong Kong",
    companyLink: "https://www.re3.world",
    companyImage: "./images/recube.png",
    dateRange: "Apr 2023 - Feb 2024",
    techStack: "Next.js, AWS", //  , DynamoDB, Stripe, Firebase, Cloudflare",
    jobTypes: ["SWE", "SRE", "AIMR"],
    bullets: [
      "Led a 3-person agile team building a lunchbox platform, delivering 80+ production features (Next.js PWA, AWS, 100% UAT)",
      "Designed CI/CD pipelines and IaC with AWS CDK, cutting deployment time from hours to 5 minutes",
      "Architected event-driven backend on AWS for payment workflows and automated notification pipelines",
      "Built a cloud-native container rental platform with Next.js and DynamoDB, enabling QR-based cutlery tracking",
      "Integrated Stripe payment processing and email/SMS authentication for secure user operations",
      "Managed multi-environment infrastructure (dev/staging/prod) with Cloudflare DNS and routing",
    ],
  },
];
