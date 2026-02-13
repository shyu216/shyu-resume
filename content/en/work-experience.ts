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
			"Led development of a reusable container rental platform for consumers and restaurant managers.",
			"Delivered Next.js SSR PWA with AWS Amplify/CDK CI/CD for rapid releases.",
			"Built QR code system for container tracking and mobile camera integration.",
			"Implemented multi-channel authentication (Google, Facebook, email, SMS) to streamline onboarding.",
			"Developed scalable notification system (AWS EventBridge, SES/SNS) for transactional and newsletter messaging.",
			"Produced and deployed in-app tutorial videos (https://app.recube.hk/account/in_app_tut) to improve user experience.",
			"Provided a multilingual support class for teammates to optimize UI copy and user experience.",
			"Technical lead for a 3-person team, delivering 80+ features with user acceptance testing."
		]
	}
];
