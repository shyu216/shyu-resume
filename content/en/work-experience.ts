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
			"Technical lead, managed a 3-person team, delivered 80+ features and passed user acceptance testing.",
			"Led end-to-end development of a reusable container rental platform, implementing core flows for QR code-based borrowing/return and container tracking.",
			"Built Next.js SSR PWA and AWS CDK/Amplify CI/CD pipelines to enable rapid iteration and deployment.",
			"Integrated Stripe for credit card payments, supporting pre-authorization and refunds.",
			"Integrated Firebase Auth (email/SMS) for authentication, decoupled from AWS business logic.",
			"Developed an event-driven notification system using AWS EventBridge and SNS, supporting both transactional and marketing messages.",
			"Managed Cloudflare domains and routing for development, testing, and production environments.",
			"Designed i18n language hooks for seamless English/Traditional Chinese switching; collaborated with CEO for copy localization and decoupled content from codebase.",
			"Produced and deployed in-app tutorial videos to improve user onboarding efficiency."
		]
	}
];
