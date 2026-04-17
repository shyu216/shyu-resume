import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
	{
		id: "recube",
		position: "全棧開發工程師（技術負責人）",
		company: "ReCube（香港）",
		companyLink: "https://www.re3.world",
		companyImage: "./images/recube.png",
		dateRange: "2023 年 4 月 - 2024 年 2 月",
		techStack: "Next.js, AWS",  //  , DynamoDB, Stripe, Firebase, Cloudflare",
		jobTypes: ["FULLSTACK", "SOFTWARE", "DEVOPS", "ML_RESEARCHER"],
		bullets: [
			"帶領 3 人敏捷團隊在混合辦公環境下工作；使用 **Next.js SSR PWA** 和 **AWS** 雲端基礎設施交付 80+ 生產功能，涵蓋消費者/餐廳應用，實現 100% UAT 通過率",
			"構建雲端原生全棧容器租賃平台，包含 **Next.js** 前端、**AWS DynamoDB** 後端和 **RESTful API** 集成，實現獨特餐具 ID 和借還追蹤，簡化員工從 QR 掃描到餐具追蹤的工作流程",
			"在 **AWS** 上架構事件驅動後端系統（**DynamoDB**、**EventBridge**、**SES**、**Lambda**），處理支付工作流和通知流水線，支持自動化事件調度",
			"集成 **Stripe** 支付處理，支持押金預授權和 **Firebase Auth**（電郵/SMS）認證，遵循 **AWS** 安全最佳實踐（最小 **IAM** 權限），確保安全的用戶認證和訪問控制",
			"使用 **AWS CDK/Amplify** 設計 **CI/CD** 流水線和基礎設施即代碼（**IaC**），實現分支隔離和環境一致性，將部署時間從數小時縮短至 5 分鐘，消除手動配置混亂",
			"管理多環境基礎設施，使用 **Cloudflare** DNS/路由覆蓋開發/測試/生產環境；實現 **i18n** 國際化，支持英文/繁體中文切換，使用可複用 **React Hooks**",
			"構建事件驅動通知系統，使用 **AWS EventBridge/SES** 和可定制 HTML 模板，自動化借還提醒和支付通知",
			"製作並部署應用程式內教程影片，降低新用戶和餐廳員工的上手門檻",
			"透過 Asana/WhatsApp 與 CEO 和業務持份者協作，進行需求收集、衝刺規劃和交付時間線管理；為其他開發者提供專案結構和包設置建議"
		]
	}
];
