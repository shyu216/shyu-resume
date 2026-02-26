import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
	{
		id: "recube",
		position: "Full Stack Developer (Tech Lead)",
		company: "ReCube, Hong Kong",
		companyLink: "https://www.re3.world",
		companyImage: "./images/recube.png",
		dateRange: "Apr 2023 - Feb 2024",
		techStack: "Next.js, AWS",
		bullets: [
			"Technical lead; led a 3-person team to deliver 80+ features across consumer and restaurant apps, pass UAT, and launch.",
			"Built a Next.js SSR PWA with AWS CDK/Amplify CI/CD pipelines to accelerate iteration.",
			"Led the container rental platform from scratch, using AWS DynamoDB for unique utensil IDs and borrow/return tracking.",
			"Integrated Stripe card payments with deposit pre-authorization and refunds, applying behavioral design to boost return compliance.",
			"Integrated Firebase Auth email/SMS for user authentication and access control.",
			"Developed an AWS EventBridge/SES notification system to push orders and reminders, driving on-time borrow/return.",
			"Managed Cloudflare domains and routing for development, testing, and production environments.",
			"Designed a reusable i18n hook enabling one-click English/Traditional Chinese switching, decoupling content from code.",
			"Produced and deployed in-app tutorial videos to lower onboarding friction and improve retention."
		]
	}
];
