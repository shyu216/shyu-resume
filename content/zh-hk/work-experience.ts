import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
	{
		id: "recube",
		position: "全棧開發工程師（技術負責人）",
		company: "ReCube（香港）",
		companyLink: "https://www.re3.world",
		companyImage: "./images/recube.png",
		dateRange: "2023年4月 - 2024年2月",
		techStack: "Next.js, AWS",
		bullets: [
			"技術負責人，帶領 3 人團隊完成 80+ 功能開發，通過 UAT 並上線，覆蓋顧客與餐廳雙端",
			"搭建 Next.js SSR PWA + AWS CDK/Amplify CI/CD 工作流，加速迭代",
			"從零主導餐盒租借平台，基於 AWS DynamoDB 實現餐具唯一標識與借還追蹤核心流程",
			"集成 Stripe 信用卡支付，支持押金預授權與退款，配合行為設計提升歸還意願",
			"集成 Firebase Auth 郵箱/SMS 認證，完成用戶身份驗證與權限管理",
			"開發基於 AWS EventBridge/SES 的事件通知系統，推送訂單及提醒訊息，引導準時借還",
			"管理 Cloudflare 開發/測試/生產環境域名與路由配置",
			"設計並實現通用 i18n 語言 Hook，支援英文/繁體中文一鍵切換，實現語料與代碼解耦",
			"製作並部署 App 內教學影片，降低使用門檻，提升留存與上手效率"
		]
	}
];
