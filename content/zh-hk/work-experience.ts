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
			"技術負責人，帶領 3 人團隊，累計上線 80+ 功能，通過用戶驗收。",
			"從 0 到 1 主導餐盒租借平台開發，基於 AWS DynamoDB 實現餐具唯一標識與借還追蹤核心流程，融入承諾一致性行為設計以提升用戶履約率。",
			"搭建 Next.js SSR PWA + AWS CDK/Amplify CI/CD，支撐快速迭代。",
			"集成 Stripe 信用卡支付，支持押金預授權與退款，運用損失厭惡機制提升用戶歸還意願。",
			"集成 Firebase Auth（郵箱 / SMS）認證，完成用戶身份認證與權限管理。",
			"開發基於 AWS EventBridge/SNS 的事件通知系統，支持事務及營銷推送，強化用戶行為提醒。",
			"管理 Cloudflare 開發 / 測試 / 生產環境域名及路由分配。",
			"設計並實現通用 i18n 語言鉤子，支持英文 / 繁體中文一鍵切換，實現語料與代碼解耦，支持 CEO 本地化文案獨立潤色。",
			"製作並部署 App 內教程視頻，降低用戶使用門檻，提升用戶留存與上手效率。"
		]
	}
];
