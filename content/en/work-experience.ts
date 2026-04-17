import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
	{
		id: "recube",
		position: "Full Stack Developer (Tech Lead)",
		company: "ReCube, Hong Kong",
		companyLink: "https://www.re3.world",
		companyImage: "./images/recube.png",
		dateRange: "Apr 2023 - Feb 2024",
		techStack: "Next.js, AWS",  //  , DynamoDB, Stripe, Firebase, Cloudflare",
		jobTypes: ["FULLSTACK", "SOFTWARE", "DEVOPS", "ML_RESEARCHER"],
		bullets: [
			"Led a 3-person agile squad in hybrid working environment; shipped 80+ production features across consumer/restaurant apps using **Next.js SSR PWA** and **AWS** cloud infrastructure, achieving 100% UAT pass.",
			"Built cloud-native full-stack container rental platform with **Next.js** frontend, **AWS DynamoDB** backend, and **RESTful API** integrations for unique tableware IDs and tracking, streamlining staff tableware borrow/return workflow.",
			"Architected event-driven backend systems on **AWS** (**DynamoDB**, **EventBridge**, **SES**, **Lambda**) handling payment workflows and notification pipelines with automated event scheduling.",
			"Integrated **Stripe** payment processing with deposit pre-authorization and **Firebase Auth** (email/SMS) for secure user authentication and access control, following **AWS** security best practices with minimal **IAM** permissions.",
			"Designed **CI/CD** pipelines and **Infrastructure as Code (IaC)** using **AWS CDK/Amplify** with branch isolation and environment parity, reducing deployment time from hours to 5 minutes and eliminating manual configuration chaos.",
			"Managed multi-environment infrastructure with **Cloudflare** DNS/routing; implemented **i18n** internationalization supporting English/Traditional Chinese with reusable **React hooks**.",
			"Built event-driven notification system with **AWS EventBridge/SES** and customizable HTML templates, automating borrow/return reminders and payment notifications.",
			"Produced and deployed in-app tutorial videos to lower onboarding friction for new users and restaurant staff.",
			"Collaborated with CEO and business stakeholders via Asana/WhatsApp for requirement gathering, sprint planning, and delivery timeline management; advised peer developers on project structure and package setup."
		]
	}
];
