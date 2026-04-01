// Central configuration for customizable content

export interface ContactInfo {
  linkedin: string;
  github: string;
  email: string;
  phone: string;
  wechat?: string;
  cnEmail?: string;
  cnPhone?: string;
}

export interface Name {
  first: string;
  last: string;
}

export interface PersonalInfo {
  name: {
    en: Name;
    zh: Name;
    'zh-hk': Name;
  };
  shortName: {
    en: string;
    zh: string;
    'zh-hk': string;
  };
  contact: ContactInfo;
}

export interface SiteConfig {
  title: string;
  description: string;
  keywords: string[];
  personal: PersonalInfo;
}

export const siteConfig: SiteConfig = {
  title: "ShYu Resume",
  description: "A Resume",
  keywords: ["YUSIHONG", "SIHONG", "Resume", "CV", "Portfolio", "余思宏"],
  personal: {
    name: {
      en: {
        first: "Sihong",
        last: "Yu"
      },
      zh: {
        first: "思宏",
        last: "余"
      },
      'zh-hk': {
        first: "思宏",
        last: "余"
      }
    },
    shortName: {
      en: "Dale",
      zh: "余",
      'zh-hk': "余"
    },
    contact: {
      linkedin: "https://www.linkedin.com/in/sihong-yu/",
      github: "https://github.com/shyu216",
      email: "yusihong073@gmail.com",
      phone: "0431083127",
      wechat: "seinbaulio",
      cnEmail: "shyu0@qq.com",
      cnPhone: "13697555391"
    }
  }
};
