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
		jobTypes: ["FULLSTACK", "SOFTWARE", "DEVOPS", "ML_RESEARCHER"],
		bullets: [
			"带领3人敏捷团队在混合办公环境下工作；使用**Next.js SSR PWA**和**AWS**云基础设施交付80+生产功能，涵盖消费者/餐厅应用，实现100% UAT通过率",
			"构建云原生全栈容器租赁平台，包含**Next.js**前端、**AWS DynamoDB**后端和**RESTful API**集成，实现独特餐具ID和借还追踪，简化员工从QR扫描到餐具追踪的工作流程",
			"在**AWS**上架构事件驱动后端系统（**DynamoDB**、**EventBridge**、**SES**、**Lambda**），处理支付工作流和通知流水线，支持自动化事件调度",
			"集成**Stripe**支付处理，支持押金预授权和**Firebase Auth**（邮箱/SMS）认证，遵循**AWS**安全最佳实践（最小**IAM**权限），确保安全的用户认证和访问控制",
			"使用**AWS CDK/Amplify**设计**CI/CD**流水线和基础设施即代码（**IaC**），实现分支隔离和环境一致性，将部署时间从数小时缩短至5分钟，消除手动配置混乱",
			"管理多环境基础设施，使用**Cloudflare** DNS/路由覆盖开发/测试/生产环境；实现**i18n**国际化，支持英文/繁体中文切换，使用可复用**React Hooks**",
			"构建事件驱动通知系统，使用**AWS EventBridge/SES**和可定制HTML模板，自动化借还提醒和支付通知",
			"制作并部署应用内教程视频，降低新用户和餐厅员工的上手门槛",
			"通过Asana/WhatsApp与CEO和业务利益相关者协作，进行需求收集、冲刺规划和交付时间线管理；为其他开发者提供项目结构和包设置建议"
		]
	}
];
