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
      "技术负责人，带领 3 人团队，累计上线 80+ 功能，通过用户验收",
      "从 0 到 1 主导餐盒租借平台开发，基于 AWS DynamoDB 实现餐具唯一标识与借还追踪核心流程，融入承诺一致性行为设计以提升用户履约率",
      "搭建 Next.js SSR PWA + AWS CDK/Amplify CI/CD，支撑快速迭代",
      "集成 Stripe 信用卡支付，支持押金预授权与退款，运用损失厌恶机制提升用户归还意愿",
      "集成 Firebase Auth 邮箱/SMS 认证，完成用户身份认证与权限管理",
      "开发基于 AWS EventBridge/SNS 的事件通知系统，支持事务及营销推送，强化用户行为提醒",
      "管理 Cloudflare 开发/测试/生产环境域名及路由分配",
      "设计并实现通用 i18n 语言钩子，支持英文 / 繁体中文一键切换，实现语料与代码解耦，支持 CEO 本地化文案独立润色",
      "制作并部署 App 内教程视频，降低用户使用门槛，提升用户留存与上手效率",
    ],
  },
];
