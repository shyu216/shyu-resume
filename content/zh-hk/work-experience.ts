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
			"技術負責人，帶領 3 人團隊，累計上線 80+ 功能，通過用戶驗收測試。",
			"從 0 到 1 主導餐盒租借平台開發，實現掃碼借還、餐具追蹤核心流程。",
			"搭建 Next.js SSR PWA + AWS CDK/Amplify CI/CD，支持快速迭代。",
			"集成 Stripe 信用卡支付，支持預授權與退款。",
			"集成 Firebase Auth（郵箱 / SMS）認證，認證與 AWS 業務層分離。",
			"開發基於 AWS EventBridge/SNS 的事件通知系統，支持事務及營銷推送。",
			"管理 Cloudflare 開發 / 測試 / 生產環境域名及路由分配。",
			"設計 i18n 語言鉤子，實現英文 / 繁體中文切換；文案由 CEO 本地化潤色，語料與代碼解耦。",
			"製作並部署 App 內教程視頻，提升用戶上手效率。"
		]
	}
];
