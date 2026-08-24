import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
	{
		id: "unimelbra",
		position: "研究助理",
		company: "墨尔本大学（澳大利亚）",
		companyLink: "https://www.unimelb.edu.au",
		companyImage: "./images/unimelb.png",
		dateRange: "2026年4月 - 2026年7月",
		techStack: "OpenGL",
		jobTypes: ["SWE", "SRE", "AIMR"],
		bullets: [
			"协助设计下一代3D无眼镜显示系统，目标通过3D感知图灵测试",
			"基于HoloLens 2构建MR正畸导航流水线，集成XFeat/LightGlue/PnP（22Hz，80ms延迟）",
			"在墨尔本大学Open Day 2026公开演示HL2系统",
		],
	},
	{
		id: "recube",
		position: "全栈开发工程师",
		company: "ReCube（香港）",
		companyLink: "https://www.re3.world",
		companyImage: "./images/recube.png",
		dateRange: "2023年4月 - 2024年2月",
		techStack: "Next.js, AWS",  //  , DynamoDB, Stripe, Firebase, Cloudflare",
		jobTypes: ["SWE", "SRE", "AIMR"],
		bullets: [
			"带领3人敏捷团队搭建重用餐盒借还平台，交付80+生产功能（Next.js PWA, AWS, 100% UAT通过率）",
			"使用AWS CDK设计CI/CD流水线和基础设施即代码，部署时间从数小时缩短至5分钟",
			"在AWS上构建事件驱动后端，处理支付工作流和自动化通知",
			"搭建云原生容器租赁平台（Next.js + DynamoDB），实现QR扫码餐具追踪",
			"集成Stripe支付和邮箱/SMS认证系统，保障用户操作安全",
			"管理Cloudflare多环境基础设施（开发/测试/生产）的DNS与路由",
		]
	}
];
