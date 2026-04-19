import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
	{
		id: "recube",
		position: "全栈开发工程师（技术负责人）",
		company: "ReCube（香港）",
		companyLink: "https://www.re3.world",
		companyImage: "./images/recube.png",
		dateRange: "2023年4月 - 2024年2月",
		techStack: "Next.js, AWS",  //  , DynamoDB, Stripe, Firebase, Cloudflare",
		jobTypes: ["SWE", "SRE", "AIMR"],
		bullets: [
			"带领3人敏捷团队搭建重用餐盒借还平台，使用**Next.js SSR PWA**和**AWS**云基础设施交付80+生产功能实现100% UAT通过率",
			"通过Asana/WhatsApp与业务利益相关者协作，进行需求收集、冲刺规划和交付时间线管理；同时为其他开发者提供项目建议",
			"构建云原生全栈容器租赁平台，包含**Next.js**前端、**NoSQL**后端，实现餐具借还追踪，简化员工从QR扫描到餐具追踪的工作流",
			"使用**AWS CDK**设计**CI/CD**流水线和基础设施即代码（**IaC**），实现分支环境隔离，将部署时间从数小时缩短至5分钟",
			"管理多环境基础设施，使用**Cloudflare** DNS/路由，覆盖开发/测试/生产环境",
			"在**AWS**上架构事件驱动后端系统，处理支付工作流和通知流水线，支持自动化事件调度",
			"构建事件驱动通知系统，定制HTML邮件模板，自动化借还提醒和支付通知",
			"集成**Stripe**支付处理，完善邮箱/SMS账号系统，确保安全的用户操作和认证",
			"制作并部署应用内教程视频，降低新用户和餐厅员工的上手门槛"
		]
	}
];
