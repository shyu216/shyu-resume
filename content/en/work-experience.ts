import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
	{
		id: "recube",
		position: "Full Stack Developer (Tech Lead)",
		company: "ReCube, Hong Kong",
		companyLink: "https://www.re3.world",
		companyImage: "./images/recube.png",
		dateRange: "Apr 2023 - Feb 2024",
		techStack: "Next.js, AWS, DynamoDB, Stripe, Firebase, Cloudflare",
		bullets: [
			"Led a 3-person agile squad; shipped 80+ production features across consumer/restaurant apps using Next.js SSR PWA and AWS cloud infrastructure, achieving 100% UAT pass.",
			"Built full-stack container rental platform with Next.js frontend, AWS DynamoDB backend, and RESTful API integrations for unique utensil IDs and borrow/return tracking.",
			"Architected scalable backend systems on AWS (DynamoDB, EventBridge, SES, Lambda) handling payment workflows and notification pipelines with automated event scheduling.",
			"Integrated Stripe payment processing with deposit pre-authorization and Firebase Auth (email/SMS) for secure user authentication and access control.",
			"Designed CI/CD pipelines using AWS CDK/Amplify with branch isolation and environment parity to eliminate merge conflicts and reduce deployment effort by 90%.",
			"Managed Cloudflare DNS/routing across dev/test/prod environments; implemented i18n internationalization supporting English/Traditional Chinese with reusable React hooks.",
			"Built event-driven notification system with AWS EventBridge/SES and customizable HTML templates, driving on-time borrow/return rates through automated reminders.",
			"Produced and deployed in-app tutorial videos to lower onboarding friction and improve retention."
		]
	}
];
