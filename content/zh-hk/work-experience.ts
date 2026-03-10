import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
	{
		id: "recube",
		position: "全棧開發工程師（技術負責人）",
		company: "ReCube（香港）",
		companyLink: "https://www.re3.world",
		companyImage: "./images/recube.png",
		dateRange: "2023年4月 - 2024年2月",
		techStack: "Next.js, AWS",  //  , DynamoDB, Stripe, Firebase, Cloudflare",
		bullets: [
			"帶領3人敏捷團隊；使用Next.js SSR PWA和AWS雲端基礎設施交付80+生產功能，涵蓋消費者/餐廳應用，實現100% UAT通過率。",
			"構建全棧容器租賃平台，包含Next.js前端、AWS DynamoDB後端和RESTful API集成，實現獨特餐具ID和借還追蹤。",
			"在AWS上架構可擴展後端系統（DynamoDB、EventBridge、SES、Lambda），處理支付工作流和通知管道，支持自動化事件調度。",
			"集成Stripe支付處理，支持押金預授權和Firebase Auth（郵箱/SMS）認證，確保安全的用戶認證和訪問控制。",
			"使用AWS CDK/Amplify設計CI/CD管道，支持分支隔離和環境一致性，消除合併衝突，減少90%部署工作量。",
			"管理Cloudflare DNS/路由，覆蓋開發/測試/生產環境；實現i18n國際化，支持英文/繁體中文切換，使用可復用React鉤子。",
			"構建事件驅動通知系統，使用AWS EventBridge/SES和可定制HTML模板，通過自動化提醒提高按時借還率。",
			"製作並部署 App 內教學影片，降低使用門檻，提升留存與上手效率。"
		]
	}
];
