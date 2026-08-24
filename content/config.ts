import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { summary as summaryEn } from "@/content/en/summary";
import { summary as summaryZh } from "@/content/zh/summary";
import { workExperience as workExperienceEn } from "@/content/en/work-experience";
import { workExperience as workExperienceZh } from "@/content/zh/work-experience";
import { projects as projectsEn } from "@/content/en/projects";
import { projects as projectsZh } from "@/content/zh/projects";
import { skills as skillsEn } from "@/content/en/skills";
import { skills as skillsZh } from "@/content/zh/skills";
import { education as educationEn } from "@/content/en/education";
import { education as educationZh } from "@/content/zh/education";
import { copy, JobType, LanguageType } from "@/content/copy";


export type ExperienceJobType = Exclude<JobType, "NONE">;

interface ContactInfo {
  linkedin: string;
  github: string;
  website: string;
  email: string;
  phone: string;
  wechat?: string;
  cnEmail?: string;
  cnPhone?: string;
}
interface Name {
  first: string;
  last: string;
}
export interface JobSwitcherProps {
  jobType: JobType;
  onJobTypeChange: (jobType: JobType) => void;
}
type NamePart = keyof Name;
type NameRenderSegment = { text: string; highlighted: boolean };

const profileOrder: readonly JobType[] = [
  "SWE",
  "SRE",
  "AIMR",
  "NONE",
];

export function getColor() {
  return { light: "#dc2626", dark: "#fca5a5" };
}

const localizedSectionData = {
  summary: { en: summaryEn, zh: summaryZh },
  workExperience: {
    en: workExperienceEn,
    zh: workExperienceZh,
  },
  project: { en: projectsEn, zh: projectsZh },
  skills: { en: skillsEn, zh: skillsZh },
  education: { en: educationEn, zh: educationZh },
} as const;

export function cn(...classNames: ClassValue[]): string {
  return twMerge(clsx(classNames));
}
export function useUsageMap<T>(
  map: Record<"live" | "pdf", T>,
  usage: "live" | "pdf",
): T {
  return map[usage];
}
export function pickLanguage<T>(
  language: LanguageType,
  map: Record<LanguageType, T>,
): T {
  return map[language];
}

export function getNameRenderConfig(
  language: LanguageType,
  name: Name,
): { separator: string; segments: NameRenderSegment[] } {
  const languageCopy = copy[language];
  const order: NamePart[] = languageCopy.nameLayout.firstNameFirst
    ? ["first", "last"]
    : ["last", "first"];
  const separator = languageCopy.nameLayout.hasSpace ? " " : "";
  return {
    separator,
    segments: order.map((part) => ({
      text: name[part],
      highlighted: part === "last",
    })),
  };
}

export function getJobTooltip(
  option: { tooltipEn: string; tooltipZh: string },
  language: LanguageType,
): string {
  const tooltipByLanguage: Record<LanguageType, string> = {
    en: option.tooltipEn,
    zh: option.tooltipZh,
  };
  return tooltipByLanguage[language];
}

export function formatFooterLastUpdated(
  language: LanguageType,
  lastUpdate: string,
): string {
  const date = new Date(lastUpdate);
  if (isNaN(date.getTime())) return lastUpdate;
  if (language === "en") {
    const monthNames = copy.en.footer.monthNames;
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

export function getHeaderContactInfo(
  language: LanguageType,
  contact: ContactInfo,
): { email: string; phone: string; phoneHref: string; wechat?: string } {
  const { contactLayout } = copy[language];
  const useCnContact = contactLayout.useCnContact;
  const phone = useCnContact
    ? (contact.cnPhone ?? contact.phone)
    : contact.phone;
  const email = useCnContact
    ? (contact.cnEmail ?? contact.email)
    : contact.email;
  return {
    email,
    phone,
    phoneHref: `sms:${phone.replace(/\s/g, "")}`,
    wechat: contactLayout.showWechat ? contact.wechat : undefined,
  };
}

export function getUrlDisplayText(
  url: string,
  mode: "path" | "host-path" = "path",
): string {
  try {
    const parsed = new URL(url);
    const normalizedPath = parsed.pathname.replace(/^\/+|\/+$/g, "");
    if (mode === "host-path")
      return normalizedPath ? `${parsed.host}/${normalizedPath}` : parsed.host;
    return normalizedPath || parsed.host;
  } catch {
    return url;
  }
}

export function getLocalizedSection(
  language: LanguageType,
  sectionKey: keyof typeof localizedSectionData,
  jobType?: JobType,
) {
  const title = copy[language].sections[sectionKey];
  const data = localizedSectionData[sectionKey][language];

  if (sectionKey === "summary") {
    if (jobType && typeof data === "object") {
      return { data: (data as Record<JobType, unknown>)[jobType], title };
    }
    // fallback: return the full summary object when no jobType provided
    return { data, title };
  }

  return { data, title };
}

export function filterExperience<T extends { jobTypes: ExperienceJobType[] }>(
  items: T[],
  profile: JobType,
): T[] {
  if (profile === "NONE") return items;
  return items.filter((item) => item.jobTypes.includes(profile));
}

export const siteConfig = {
  title: "ShYu Resume",
  description: "A Resume",
  keywords: ["YUSIHONG", "SIHONG", "Resume", "CV", "Portfolio", "余思宏"],
  personal: {
    name: {
      en: { first: "Sihong", last: "Yu" },
      zh: { first: "思宏", last: "余" },
    },
    shortName: { en: "Dale", zh: "余" },
    contact: {
      linkedin: "https://www.linkedin.com/in/sihong-yu/",
      github: "https://github.com/shyu216",
      website: "https://shyu216.dpdns.org",
      email: "yusihong073@gmail.com",
      phone: "0431083127",
      wechat: "seinbaulio",
      cnEmail: "shyu0@qq.com",
      cnPhone: "13697555391",
    },
  },
};
