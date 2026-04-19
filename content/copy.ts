import type { ReactNode } from "react";

export type LanguageType = "en" | "zh" | "zhhk";
export type JobType =
  | "SWE"
  | "SRE"
  | "AIMR"
  | "NONE";
export const jobOptions = [
  {
    value: "SWE",
    label: "SWE",
    tooltipEn: "Software Engineer — Cross-platform Software Development",
    tooltipZh: "软件工程师 — 多平台软件开发",
    tooltipZhHk: "軟件工程師 — 多平臺軟件開發",
  },
  {
    value: "SRE",
    label: "SRE",
    tooltipEn: "Site Reliability Engineer — Cloud, DevOps and Big Data",
    tooltipZh: "站点可靠性工程师 — 云计算、DevOps与大数据",
    tooltipZhHk: "站点可靠性工程師 — 雲計算、DevOps與大數據",
  },
  {
    value: "AIMR",
    label: "AI/MR",
    tooltipEn: "AI/MR Engineer — Artificial Intelligence & Mixed Reality",
    tooltipZh: "AI/MR 工程师 — 人工智能与混合现实",
    tooltipZhHk: "AI/MR 工程師 — 人工智能與混合現實",
  },
] as const;

export interface LanguageProviderProps {
  children: ReactNode;
}

type JobOptionCopy = {
  label: string;
  tooltip: string;
};

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
        options: Record<JobType, JobOptionCopy>;
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

function buildJobOptionsMap(lang: LanguageType) {
  const map = {} as Record<JobType, JobOptionCopy>;
  jobOptions.forEach((o) => {
    const tooltip =
      lang === "en" ? o.tooltipEn : lang === "zh" ? o.tooltipZh : o.tooltipZhHk;
    map[o.value as JobType] = { label: o.label, tooltip };
  });
  // add NONE default
  map["NONE"] = {
    label: lang === "en" ? "NONE" : lang === "zh" ? "默认" : "默認",
    tooltip:
      lang === "en"
        ? "Default — Show all experiences"
        : lang === "zh"
        ? "默认 — 显示所有经历"
        : "默認 — 顯示全部經歷",
  };
  return map as Record<JobType, JobOptionCopy>;
}

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
        zhhk: "繁",
      },
      language: {
        en: "English",
        zh: "简体中文",
        zhhk: "繁體中文",
      },
      jobType: {
        showAllExperiences: "Show all experiences",
        options: buildJobOptionsMap("en"),
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
        zhhk: "繁",
      },
      language: {
        en: "English",
        zh: "简体中文",
        zhhk: "繁體中文",
      },
      jobType: {
        showAllExperiences: "显示全部经历",
        options: buildJobOptionsMap("zh"),
      },
    },
  },
  zhhk: {
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
        zhhk: "繁",
      },
      language: {
        en: "English",
        zh: "簡體中文",
        zhhk: "繁體中文",
      },
      jobType: {
        showAllExperiences: "顯示全部經歷",
        options: buildJobOptionsMap("zhhk"),
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
