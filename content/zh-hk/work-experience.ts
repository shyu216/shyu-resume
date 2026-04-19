import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
  {
    id: "recube",
    position: "全棧開發工程師（技術負責人）",
    company: "ReCube（香港）",
    companyLink: "https://www.re3.world",
    companyImage: "./images/recube.png",
    dateRange: "2023年4月 - 2024年2月",
    techStack: "Next.js, AWS", //  , DynamoDB, Stripe, Firebase, Cloudflare",
    jobTypes: ["SWE", "SRE", "AIMR"],
    bullets: [
      "帶領3人敏捷團隊搭建重用餐盒借還平台，使用**Next.js SSR PWA**和**AWS**雲基礎設施交付80+生產功能實現100% UAT通過率",
      "通過Asana/WhatsApp與業務利益相關者協作，進行需求收集、衝刺規劃和交付時間線管理；同時為其他開發者提供項目建議",
      "構建雲原生全棧容器租賃平台，包含**Next.js**前端、**NoSQL**後端，實現餐具借還追蹤，簡化員工從QR掃描到餐具追蹤的工作流",
      "使用**AWS CDK**設計**CI/CD**流水線和基礎設施即代碼（**IaC**），實現分支環境隔離，將部署時間從數小時縮短至5分鐘",
      "管理多環境基礎設施，使用**Cloudflare** DNS/路由，覆蓋開發/測試/生產環境",
      "在**AWS**上架構事件驅動後端系統，處理支付工作流和通知流水線，支持自動化事件調度",
      "構建事件驅動通知系統，定製HTML郵件模板，自動化借還提醒和支付通知",
      "集成**Stripe**支付處理，完善郵箱/SMS帳號系統，確保安全的用戶操作和認證",
      "製作並部署應用內教程視頻，降低新用戶和餐廳員工的上手門檻",
    ],
  },
];
