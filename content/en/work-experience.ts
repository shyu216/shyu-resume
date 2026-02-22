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
			"Technical lead; led a 3-person team, delivered 80+ features across consumer and merchant apps, passed UAT, and launched.",
			"Built a Next.js SSR PWA with AWS CDK/Amplify CI/CD to support rapid iteration.",
			"Took the container rental platform from zero to one; used AWS DynamoDB for unique utensil IDs and borrow/return tracking.",
			"Integrated Stripe credit card payments with deposit pre-authorization and refunds; paired with behavioral design to raise return intent.",
			"Integrated Firebase Auth (email/SMS) for authentication and authorization.",
			"Developed an AWS EventBridge/SES notification system for orders and reminders to guide on-time returns.",
			"Managed Cloudflare domains and routing for development, testing, and production environments.",
			"Designed a reusable i18n hook for one-click English/Traditional Chinese switching, decoupling content from code.",
			"Produced and deployed in-app tutorial videos to lower onboarding friction and improve retention."
		]
	}
];
