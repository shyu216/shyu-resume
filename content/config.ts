// Central configuration for customizable content

export interface ContactInfo {
  linkedin: string;
  github: string;
  email: string;
  phone: string;
}

export interface Name {
  first: string;
  last: string;
}

export interface PersonalInfo {
  name: {
    zh: Name;
    ja: Name;
    fr: Name;
  };
  shortName: {
    zh: string;
    ja: string;
    fr: string;
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
  title: "云堇 Resume",
  description: "璃月戏曲名角 · 云翰社当家 · 虹章座",
  keywords: ["云堇", "Yunjin", "云翰社", "戏曲", "京剧", "神女劈观", "虹章座", "红毹婵娟"],
  personal: {
    name: {
      zh: {
        first: "堇",
        last: "云"
      },
      ja: {
        first: "Yun",
        last: "Jin"
      },
      fr: {
        first: "Yun",
        last: "Jin"
      }
    },
    shortName: {
      zh: "云堇",
      ja: "雲菫",
      fr: "Yunjin"
    },
    contact: {
      linkedin: "https://www.linkedin.com/in/yunjin-yunhanshe/",
      github: "https://github.com/yunjin-yunhanshe",
      email: "yunjin@yunhanshe.liyue",
      phone: "+86 138-8888-5210"
    }
  }
};
