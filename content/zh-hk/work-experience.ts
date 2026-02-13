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
			"主導開發面向消費者與餐廳管理員的餐盒租借平台，支持用戶通過手機攝像頭掃碼二維碼，完成餐盒借還操作，並構建餐具追蹤系統。",
			"交付Next.js SSR PWA，結合AWS Amplify、CDK與GitHub Actions實現高效CI/CD，推動產品快速迭代上線。",
			"實現多渠道認證（Google、Facebook、郵箱、短信），優化用戶註冊流程與安全性，提升整體用戶體驗。",
			"開發基於AWS EventBridge與SES/SNS的高可擴展通知系統，支持事務型與Newsletter消息推送，滿足多樣化業務場景。",
			"協作拍攝並部署App內使用教學視頻（https://app.recube.hk/account/in_app_tut），提升產品易用性。",
			"設計並提供多語言支持類，助力團隊優化界面文案與本地化體驗，實現繁體中文與英語雙語切換。",
			"擔任技術負責人，帶領3人團隊敏捷交付，累計上線80餘項功能並通過用戶驗收測試，保障項目高質量落地。"
		]
	}
];
