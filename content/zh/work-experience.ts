import { type WorkExperience } from "@/types/work-experience";

export const workExperience: WorkExperience[] = [
  {
    id: "recube",
    position: "全栈开发工程师（技术负责人）",
    company: "ReCube（香港）",
    companyLink: "https://www.re3.world",
    companyImage: "./images/recube.png",
    dateRange: "2023年4月 - 2024年2月",
    techStack: "Next.js, AWS",  //  , DynamoDB, Stripe, Firebase, Cloudflare",
    bullets: [
      "带领3人敏捷团队；使用Next.js SSR PWA和AWS云基础设施交付80+生产功能，涵盖消费者/餐厅应用，实现100% UAT通过率。",
      "构建全栈容器租赁平台，包含Next.js前端、AWS DynamoDB后端和RESTful API集成，实现独特餐具ID和借还追踪。",
      "在AWS上架构可扩展后端系统（DynamoDB、EventBridge、SES、Lambda），处理支付工作流和通知管道，支持自动化事件调度。",
      "集成Stripe支付处理，支持押金预授权和Firebase Auth（邮箱/SMS）认证，确保安全的用户认证和访问控制。",
      "使用AWS CDK/Amplify设计CI/CD管道，支持分支隔离和环境一致性，消除合并冲突，减少90%部署工作量。",
      "管理Cloudflare DNS/路由，覆盖开发/测试/生产环境；实现i18n国际化，支持英文/繁体中文切换，使用可复用React钩子。",
      "构建事件驱动通知系统，使用AWS EventBridge/SES和可定制HTML模板，通过自动化提醒提高按时借还率。",
      "制作并部署 App 内教程视频，降低用户使用门槛，提升用户留存与上手效率。"
    ],
  },
];
