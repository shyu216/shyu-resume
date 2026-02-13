import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
	{
		id: "recube",
		position: "全栈开发工程师（技术负责人）",
		company: "ReCube（香港）",
		companyLink: "https://www.re3.world",
		companyImage: "./images/recube.png",
		dateRange: "2023年4月 - 2024年2月",
		techStack: "Next.js, AWS",
		bullets: [
			"主导开发面向消费者与餐厅管理员的餐盒租借平台，支持用户通过手机摄像头扫码二维码，完成餐盒借还操作，并构建餐具追踪系统。",
			"交付Next.js SSR PWA，结合AWS Amplify、CDK与GitHub Actions实现高效CI/CD，推动产品快速迭代上线。",
			"实现多渠道认证（Google、Facebook、邮箱、短信），优化用户注册流程与安全性，提升整体用户体验。",
			"开发基于AWS EventBridge与SES/SNS的高可扩展通知系统，支持事务型与Newsletter消息推送，满足多样化业务场景。",
			"协作拍摄并部署App内使用教程视频（https://app.recube.hk/account/in_app_tut），提升产品易用性。",
			"设计并提供多语言支持类，助力团队优化界面文案与本地化体验，实现繁体中文与英语双语切换。",
			"担任技术负责人，带领3人团队敏捷交付，累计上线80余项功能并通过用户验收测试，保障项目高质量落地。"
		]
	}
];
