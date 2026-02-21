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
			"Technical lead, led a 3-person team, shipped 80+ features and passed user acceptance.",
			"Led the container rental platform from zero to one; used AWS DynamoDB for unique utensil IDs and borrow/return tracking, adding commitment-consistency nudges to raise return compliance.",
			"Built Next.js SSR PWA with AWS CDK/Amplify CI/CD to enable rapid iteration and deployment.",
			"Integrated Stripe credit card payments with deposit pre-authorization and refunds, leveraging loss-aversion framing to increase return intent.",
			"Integrated Firebase Auth (email/SMS) for authentication and permissions management.",
			"Developed an AWS EventBridge/SNS notification system for transactional and marketing messages, reinforcing timely user actions.",
			"Managed Cloudflare domains and routing for development, testing, and production environments.",
			"Designed a reusable i18n hook for one-click English/Traditional Chinese switching; decoupled content from code so the CEO could localize copy independently.",
			"Produced and deployed in-app tutorial videos to reduce onboarding friction and improve retention."
		]
	}
];
