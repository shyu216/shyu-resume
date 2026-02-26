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
      "技术负责人，带领 3 人团队，完成 80+ 功能开发，通过 UAT 并上线，涵盖顾客与餐厅双端系统",
      "搭建 Next.js SSR PWA + AWS CDK/Amplify CI/CD 工作流，加速迭代",
      "从 0 到 1 主导餐盒租借平台开发，基于 AWS DynamoDB 实现餐具唯一标识与借还追踪核心流程",
      "集成 Stripe 信用卡支付，支持押金预授权与退款，结合行为设计提升用户归还意愿",
      "集成 Firebase Auth 邮箱/SMS 认证，完成用户身份认证与权限管理",
      "开发基于 AWS EventBridge/SES 的事件通知系统，推送订单与提醒消息，引导用户按时借还",
      "管理 Cloudflare 开发/测试/生产环境域名及路由分配",
      "设计并实现通用 i18n 语言钩子，支持英文 / 繁体中文一键切换，实现语料与代码解耦",
      "制作并部署 App 内教程视频，降低用户使用门槛，提升用户留存与上手效率",
    ],
  },
];
