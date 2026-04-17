import type { ReactNode } from "react";

export type LanguageType = "en" | "zh" | "zh-hk";

export interface LanguageProviderProps {
  children: ReactNode;
}

type JobOptionCopy = {
  label: string;
  tooltip: string;
};

type JobTypeValue = "FULLSTACK" | "SOFTWARE" | "DEVOPS" | "ML_RESEARCHER";

type LanguageCopy = {
  app: {
    title: string;
    description: string;
  };
  nameLayout: {
    hasSpace: boolean;
    firstNameFirst: boolean;
  };
  contactLayout: {
    useCnContact: boolean;
    showWechat: boolean;
  };
  header: {
    linkedin: string;
    github: string;
    wechat: string;
    website: string;
  };
  footer: {
    lastUpdatedLabel: string;
    monthNames: readonly string[];
  };
  nav: {
    language: string;
    jobType: string;
    print: string;
    exportPdf: string;
  };
  sections: {
    summary: string;
    workExperience: string;
    project: string;
    skills: string;
    education: string;
  };
  switcher: {
    languageButtons: Record<LanguageType, string>;
    language: Record<LanguageType, string>;
    jobType: {
      showAllExperiences: string;
        options: Record<JobTypeValue, JobOptionCopy>;
    };
  };
  actionButton: {
    liveText: string;
    pdfText: string;
    tooltip: string;
    ariaLabel: string;
  };
  themeSwitcher: {
    ariaLabel: string;
    tooltip: {
      light: string;
      dark: string;
    };
  };
  labelWithLink: {
    openPrefix: string;
    copyPrefix: string;
    copiedPrefix: string;
  };
};

export const copy = {
  en: {
    app: {
      title: "ShYu Resume",
      description: "A bilingual resume with job-aware content.",
    },
    nameLayout: {
      hasSpace: true,
      firstNameFirst: true,
    },
    contactLayout: {
      useCnContact: false,
      showWechat: false,
    },
    header: {
      linkedin: "LinkedIn",
      github: "GitHub",
      wechat: "WeChat",
      website: "Website",
    },
    footer: {
      lastUpdatedLabel: "Last updated: ",
      monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    actionButton: {
      liveText: "Save PDF",
      pdfText: "Open",
      tooltip: "Recommended to use Chrome to print PDF for best pagination and link support",
      ariaLabel: "Print resume",
    },
    themeSwitcher: {
      ariaLabel: "Change theme",
      tooltip: {
        light: "Switch to Dark",
        dark: "Switch to Light",
      },
    },
    labelWithLink: {
      openPrefix: "Open link: ",
      copyPrefix: "Click to copy: ",
      copiedPrefix: "Copied: ",
    },
    nav: {
      language: "Language",
      jobType: "Job Type",
      print: "Print",
      exportPdf: "Export PDF",
    },
    sections: {
      summary: "SUMMARY",
      workExperience: "WORK EXPERIENCE",
      project: "PROJECT",
      skills: "SKILLS",
      education: "EDUCATION",
    },
    switcher: {
      languageButtons: {
        en: "ENG",
        zh: "简",
        "zh-hk": "繁",
      },
      language: {
        en: "English",
        zh: "简体中文",
        "zh-hk": "繁體中文",
      },
      jobType: {
        showAllExperiences: "Show all experiences",
        options: {
          FULLSTACK: { label: "Full Stack", tooltip: "Full Stack Engineer — End-to-end development" },
          SOFTWARE: { label: "SWE", tooltip: "Software Engineer — System & architecture" },
          DEVOPS: { label: "DevOps", tooltip: "Cloud/DevOps/SRE — Infrastructure & CI/CD" },
          ML_RESEARCHER: { label: "ML", tooltip: "ML Researcher — AI & algorithms" },
        },
      },
    },
  },
  zh: {
    app: {
      title: "ShYu 简历",
      description: "支持双语和职位定制的简历。",
    },
    nameLayout: {
      hasSpace: false,
      firstNameFirst: false,
    },
    contactLayout: {
      useCnContact: true,
      showWechat: true,
    },
    header: {
      linkedin: "领英",
      github: "GitHub",
      wechat: "微信",
      website: "个人网站",
    },
    footer: {
      lastUpdatedLabel: "最近更新：",
      monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    },
    actionButton: {
      liveText: "保存PDF",
      pdfText: "前往",
      tooltip: "建议在 Chrome 浏览器打印，确保最佳排版和链接完整",
      ariaLabel: "打印简历",
    },
    themeSwitcher: {
      ariaLabel: "切换主题",
      tooltip: {
        light: "切换至深色",
        dark: "切换至浅色",
      },
    },
    labelWithLink: {
      openPrefix: "点击查看：",
      copyPrefix: "点击复制：",
      copiedPrefix: "已复制：",
    },
    nav: {
      language: "语言",
      jobType: "职位类型",
      print: "打印",
      exportPdf: "导出 PDF",
    },
    sections: {
      summary: "个人简介",
      workExperience: "工作经历",
      project: "项目经历",
      skills: "技能树",
      education: "教育经历",
    },
    switcher: {
      languageButtons: {
        en: "ENG",
        zh: "简",
        "zh-hk": "繁",
      },
      language: {
        en: "English",
        zh: "简体中文",
        "zh-hk": "繁體中文",
      },
      jobType: {
        showAllExperiences: "显示全部经历",
        options: {
          FULLSTACK: { label: "全栈", tooltip: "全栈工程师 — 端到端开发" },
          SOFTWARE: { label: "SWE", tooltip: "软件工程师 — 系统与架构" },
          DEVOPS: { label: "DevOps", tooltip: "云/DevOps 工程师 — 基础设施与 CI/CD" },
          ML_RESEARCHER: { label: "ML", tooltip: "机器学习研究员 — AI 与算法" },
        },
      },
    },
  },
  "zh-hk": {
    app: {
      title: "ShYu 履歷",
      description: "支援雙語與職位定製的履歷。",
    },
    nameLayout: {
      hasSpace: false,
      firstNameFirst: false,
    },
    contactLayout: {
      useCnContact: true,
      showWechat: true,
    },
    header: {
      linkedin: "領英",
      github: "GitHub",
      wechat: "微信",
      website: "线上简历",
    },
    footer: {
      lastUpdatedLabel: "最後更新：",
      monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    },
    actionButton: {
      liveText: "儲存PDF",
      pdfText: "打開",
      tooltip: "建議在 Chrome 瀏覽器列印，以確保最佳排版和連結完整",
      ariaLabel: "列印履歷",
    },
    themeSwitcher: {
      ariaLabel: "切換主題",
      tooltip: {
        light: "切換至深色",
        dark: "切換至淺色",
      },
    },
    labelWithLink: {
      openPrefix: "點擊查看：",
      copyPrefix: "點擊複製：",
      copiedPrefix: "已複製：",
    },
    nav: {
      language: "語言",
      jobType: "職位類型",
      print: "列印",
      exportPdf: "導出 PDF",
    },
    sections: {
      summary: "個人簡介",
      workExperience: "工作經歷",
      project: "項目經歷",
      skills: "技能樹",
      education: "教育經歷",
    },
    switcher: {
      languageButtons: {
        en: "ENG",
        zh: "簡",
        "zh-hk": "繁",
      },
      language: {
        en: "English",
        zh: "簡體中文",
        "zh-hk": "繁體中文",
      },
      jobType: {
        showAllExperiences: "顯示全部經歷",
        options: {
          FULLSTACK: { label: "全棧", tooltip: "全棧工程師 — 端到端開發" },
          SOFTWARE: { label: "SWE", tooltip: "軟件工程師 — 系統與架構" },
          DEVOPS: { label: "DevOps", tooltip: "雲/DevOps 工程師 — 基礎設施與 CI/CD" },
          ML_RESEARCHER: { label: "ML", tooltip: "機器學習研究員 — AI 與算法" },
        },
      },
    },
  },
} as const satisfies Record<LanguageType, LanguageCopy>;

export const languageOptions = (Object.keys(copy) as LanguageType[]).map((language) => ({
  value: language,
  label: copy[language].switcher.languageButtons[language],
  name: copy[language].switcher.language[language],
}));

export function getCopy(language: LanguageType): LanguageCopy {
  return copy[language];
}
