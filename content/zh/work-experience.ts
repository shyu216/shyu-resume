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
      "从 0 到 1 主导餐盒租借平台开发，实现扫码借还、餐具追踪核心流程",
      "搭建 Next.js SSR PWA + AWS CDK/Amplify CI/CD，支撑快速迭代",
      "集成 Stripe 信用卡支付，支持押金预授权与退款",
      "集成 Firebase Auth 邮箱/SMS 认证，认证与 AWS 业务层分离",
      "开发基于 AWS EventBridge/SNS 的事件通知系统，支持事务及营销推送",
      "管理 Cloudflare 开发/测试/生产环境域名及路由分配",
      "设计 i18n 语言钩子，实现英文/繁体中文切换；文案由 CEO 本地化润色，语料与代码解耦",
      "协助制作并部署 App 内教程视频，提升用户上手效率",
    ],
  },
];
