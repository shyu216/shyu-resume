// Central configuration for customizable content

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { copy } from "@/content/copy";
import { summary as summaryEn } from "@/content/en/summary";
import { summary as summaryZh } from "@/content/zh/summary";
import { summary as summaryZhHk } from "@/content/zh-hk/summary";
import { workExperience as workExperienceEn } from "@/content/en/work-experience";
import { workExperience as workExperienceZh } from "@/content/zh/work-experience";
import { workExperience as workExperienceZhHk } from "@/content/zh-hk/work-experience";
import { projects as projectsEn } from "@/content/en/projects";
import { projects as projectsZh } from "@/content/zh/projects";
import { projects as projectsZhHk } from "@/content/zh-hk/projects";
import { skills as skillsEn } from "@/content/en/skills";
import { skills as skillsZh } from "@/content/zh/skills";
import { skills as skillsZhHk } from "@/content/zh-hk/skills";
import { education as educationEn } from "@/content/en/education";
import { education as educationZh } from "@/content/zh/education";
import { education as educationZhHk } from "@/content/zh-hk/education";

export { copy };

export interface ContactInfo {
  linkedin: string;
  github: string;
  website: string;
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

export type ResumeLanguage = "en" | "zh" | "zh-hk";
export type ResumeJobType = "FULLSTACK" | "SOFTWARE" | "DEVOPS" | "ML_RESEARCHER" | "NONE";
export type ExperienceJobType = Exclude<ResumeJobType, "NONE">;
export type JobType = ResumeJobType;

export interface JobSwitcherProps {
  jobType: JobType;
  onJobTypeChange: (jobType: JobType) => void;
}

export type FontFamilyType = "monospace" | "songti";
export type ColorPalette = "blue" | "red" | "purple" | "green" | "orange" | "pink" | "teal" | "indigo";
export type PdfStyleId = "accent" | "cards" | "blueprint" | "editorial" | "ribbon";
export type BgStyleId = "default-grid" | "triangle-prism" | "lumen-beams" | "orbit-mesh" | "dot-matrix";
export type VisualBindingMode = "asconfig" | "aslist" | "random" | "consistent";

const profileOrder: readonly ResumeJobType[] = ["FULLSTACK", "SOFTWARE", "DEVOPS", "ML_RESEARCHER", "NONE"];
const colorList: readonly ColorPalette[] = ["red", "indigo", "green", "purple", "teal", "blue", "orange", "pink"];
const bgStyleList: readonly BgStyleId[] = ["default-grid", "triangle-prism", "lumen-beams", "orbit-mesh", "dot-matrix"];
const pdfStyleList: readonly PdfStyleId[] = ["accent", "cards", "blueprint", "editorial", "ribbon"];

const visualConsistentCache = {
  color: new Map<ResumeJobType, ColorPalette>(),
  bgStyle: new Map<ResumeJobType, BgStyleId>(),
  pdfStyle: new Map<ResumeJobType, PdfStyleId>(),
};

export const visualBinding = {
  colorMode: "asconfig" as VisualBindingMode,
  bgStyleMode: "asconfig" as VisualBindingMode,
  pdfStyleMode: "asconfig" as VisualBindingMode,
} as const;

export const visualPresetDefaults = {
  color: "red" as ColorPalette,
  bgStyle: "default-grid" as BgStyleId,
  pdfStyle: "ribbon" as PdfStyleId,
};

export const visualPresetByJob: Record<ResumeJobType, {
  color: ColorPalette;
  bgStyle: BgStyleId;
  pdfStyle: PdfStyleId;
}> = {
  FULLSTACK: { color: "red", bgStyle: "default-grid", pdfStyle: "accent" },
  SOFTWARE: { color: "indigo", bgStyle: "triangle-prism", pdfStyle: "cards" },
  DEVOPS: { color: "green", bgStyle: "lumen-beams", pdfStyle: "blueprint" },
  ML_RESEARCHER: { color: "purple", bgStyle: "orbit-mesh", pdfStyle: "editorial" },
  NONE: { color: "teal", bgStyle: "dot-matrix", pdfStyle: "ribbon" },
};

export const fontFamilies: Record<FontFamilyType, { name: string; fontStack: string[] }> = {
  monospace: {
    name: "Monospace",
    fontStack: [
      "JetBrains Mono",
      "Fira Code",
      "ui-monospace",
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      "Liberation Mono",
      "Courier New",
      "monospace",
    ],
  },
  songti: {
    name: "Songti",
    fontStack: [
      "Songti SC",
      "SimSun",
      "NSimSun",
      "STSong",
      "PMingLiU",
      "serif",
    ],
  },
};

export const colorPalettes: Record<ColorPalette, { light: string; dark: string }> = {
  blue: { light: "#1e40af", dark: "#60a5fa" },
  red: { light: "#dc2626", dark: "#fca5a5" },
  purple: { light: "#7e22ce", dark: "#d8b4fe" },
  green: { light: "#059669", dark: "#6ee7b7" },
  orange: { light: "#ea580c", dark: "#fdba74" },
  pink: { light: "#db2777", dark: "#f9a8d4" },
  teal: { light: "#0d9488", dark: "#5eead4" },
  indigo: { light: "#4338ca", dark: "#a5b4fc" },
};

export const jobOptions = [
  {
    value: "FULLSTACK",
    label: "Full Stack",
    tooltipEn: "Full Stack Engineer — End-to-end development",
    tooltipZh: "全栈工程师 — 端到端开发",
    tooltipZhHk: "全棧工程師 — 端到端開發",
  },
  {
    value: "SOFTWARE",
    label: "SWE",
    tooltipEn: "Software Engineer — System & architecture",
    tooltipZh: "软件工程师 — 系统与架构",
    tooltipZhHk: "軟件工程師 — 系統與架構",
  },
  {
    value: "DEVOPS",
    label: "DevOps",
    tooltipEn: "Cloud/DevOps/SRE — Infrastructure & CI/CD",
    tooltipZh: "云/DevOps 工程师 — 基础设施与 CI/CD",
    tooltipZhHk: "雲/DevOps 工程師 — 基礎設施與 CI/CD",
  },
  {
    value: "ML_RESEARCHER",
    label: "ML",
    tooltipEn: "ML Researcher — AI & algorithms",
    tooltipZh: "机器学习研究员 — AI 与算法",
    tooltipZhHk: "機器學習研究員 — AI 與算法",
  },
] as const;

export type JobOption = (typeof jobOptions)[number];

type ThemeOverride = {
  color?: ColorPalette;
  font?: FontFamilyType;
};

const resumeTheme = {
  default: { color: "red", font: "monospace" } as Required<ThemeOverride>,
  byJob: {
    FULLSTACK: { color: "red", font: "monospace" },
    SOFTWARE: { color: "indigo", font: "monospace" },
    DEVOPS: { color: "green", font: "monospace" },
    ML_RESEARCHER: { color: "purple", font: "monospace" },
    NONE: { color: "teal", font: "monospace" },
  } as Partial<Record<ResumeJobType, ThemeOverride>>,
  byLanguage: {
    zh: { font: "songti" },
    "zh-hk": { font: "songti" },
  } as Partial<Record<ResumeLanguage, ThemeOverride>>,
  byJobLanguage: {
    // 预留：按岗位+语言做精细化覆盖
  } as Partial<Record<ResumeJobType, Partial<Record<ResumeLanguage, ThemeOverride>>>>,
};

const pdfStyleTheme = {
  default: "ribbon" as PdfStyleId,
  byJob: {
    FULLSTACK: "accent",
    SOFTWARE: "cards",
    DEVOPS: "blueprint",
    ML_RESEARCHER: "editorial",
    NONE: "ribbon",
  } as Record<ResumeJobType, PdfStyleId>,
};

function resolveTheme(profile: ResumeJobType, language: ResumeLanguage): Required<ThemeOverride> {
  const byJob = resumeTheme.byJob[profile] ?? {};
  const byLanguage = resumeTheme.byLanguage[language] ?? {};
  const byJobLanguage = resumeTheme.byJobLanguage[profile]?.[language] ?? {};

  return {
    color: resolveVisualValue("color", visualBinding.colorMode, profile),
    font: byJobLanguage.font ?? byLanguage.font ?? byJob.font ?? resumeTheme.default.font,
  };
}

export function getColor(profile: ResumeJobType, language: ResumeLanguage) {
  const { color } = resolveTheme(profile, language);
  return colorPalettes[color];
}

export function getFont(profile: ResumeJobType, language: ResumeLanguage) {
  const { font } = resolveTheme(profile, language);
  return fontFamilies[font];
}

export function getPdfStyle(profile: ResumeJobType): PdfStyleId {
  return resolveVisualValue("pdfStyle", visualBinding.pdfStyleMode, profile);
}

export function isColorModeDynamic() {
  return visualBinding.colorMode !== "asconfig";
}

export function isBgStyleModeDynamic() {
  return visualBinding.bgStyleMode !== "asconfig";
}

export function isPdfStyleModeDynamic() {
  return visualBinding.pdfStyleMode !== "asconfig";
}

export function getColorBindingMode(): VisualBindingMode {
  return visualBinding.colorMode;
}

export function getBgStyleBindingMode(): VisualBindingMode {
  return visualBinding.bgStyleMode;
}

export function getPdfStyleBindingMode(): VisualBindingMode {
  return visualBinding.pdfStyleMode;
}

export function getBgStyle(profile: ResumeJobType): BgStyleId {
  return resolveVisualValue("bgStyle", visualBinding.bgStyleMode, profile);
}

function getProfileIndex(profile: ResumeJobType): number {
  const index = profileOrder.indexOf(profile);
  return index === -1 ? 0 : index;
}

function getRandomItem<T>(list: readonly T[], fallback: T): T {
  if (list.length === 0) {
    return fallback;
  }

  return list[Math.floor(Math.random() * list.length)] ?? fallback;
}

function getConsistentItem<T>(
  cache: Map<ResumeJobType, T>,
  profile: ResumeJobType,
  list: readonly T[],
  fallback: T
): T {
  const cached = cache.get(profile);
  if (cached) {
    return cached;
  }

  const next = getRandomItem(list, fallback);
  cache.set(profile, next);
  return next;
}

function resolveVisualValue(
  kind: "color",
  mode: VisualBindingMode,
  profile: ResumeJobType
): ColorPalette;
function resolveVisualValue(
  kind: "bgStyle",
  mode: VisualBindingMode,
  profile: ResumeJobType
): BgStyleId;
function resolveVisualValue(
  kind: "pdfStyle",
  mode: VisualBindingMode,
  profile: ResumeJobType
): PdfStyleId;
function resolveVisualValue(
  kind: "color" | "bgStyle" | "pdfStyle",
  mode: VisualBindingMode,
  profile: ResumeJobType
) {
  const fallbackByKind = {
    color: visualPresetDefaults.color,
    bgStyle: visualPresetDefaults.bgStyle,
    pdfStyle: visualPresetDefaults.pdfStyle,
  } as const;

  const listByKind = {
    color: colorList,
    bgStyle: bgStyleList,
    pdfStyle: pdfStyleList,
  } as const;

  const configValueByKind = {
    color:
      visualPresetByJob[profile]?.color
      ?? resumeTheme.byJob[profile]?.color
      ?? resumeTheme.default.color,
    bgStyle: visualPresetByJob[profile]?.bgStyle,
    pdfStyle:
      visualPresetByJob[profile]?.pdfStyle
      ?? pdfStyleTheme.byJob[profile]
      ?? pdfStyleTheme.default,
  } as const;

  const fallback = fallbackByKind[kind];
  const list = listByKind[kind];

  if (mode === "asconfig") {
    return configValueByKind[kind] ?? fallback;
  }

  if (mode === "aslist") {
    const index = getProfileIndex(profile) % list.length;
    return list[index] ?? fallback;
  }

  if (mode === "random") {
    return getRandomItem(list, fallback);
  }

  return getConsistentItem(visualConsistentCache[kind], profile, list, fallback);
}

export function cn(...classNames: ClassValue[]): string {
  return twMerge(clsx(classNames));
}

export function useUsageMap<T>(
  map: Record<"live" | "pdf", T>,
  usage: "live" | "pdf"
): T {
  return map[usage];
}

export function useLanguageMap<T>(
  map: Record<ResumeLanguage, T>,
  language: ResumeLanguage
): T {
  return map[language];
}

export function pickLanguage<T>(
  language: ResumeLanguage,
  map: Record<ResumeLanguage, T>
): T {
  return map[language];
}

type NamePart = keyof Name;

type NameRenderSegment = {
  text: string;
  highlighted: boolean;
};

export function getNameRenderConfig(language: ResumeLanguage, name: Name): {
  separator: string;
  segments: NameRenderSegment[];
} {
  const languageCopy = copy[language];
  const order: NamePart[] = languageCopy.nameLayout.firstNameFirst ? ["first", "last"] : ["last", "first"];
  const separator = languageCopy.nameLayout.hasSpace ? " " : "";

  return {
    separator,
    segments: order.map((part) => ({
      text: name[part],
      highlighted: part === "last",
    })),
  };
}

export function getJobTooltip(option: JobOption, language: ResumeLanguage): string {
  const tooltipByLanguage: Record<ResumeLanguage, string> = {
    en: option.tooltipEn,
    zh: option.tooltipZh,
    "zh-hk": option.tooltipZhHk,
  };

  return tooltipByLanguage[language];
}

export function formatFooterLastUpdated(language: ResumeLanguage, lastUpdate: string): string {
  const date = new Date(lastUpdate);

  if (isNaN(date.getTime())) {
    return lastUpdate;
  }

  if (language === "en") {
    const monthNames = copy.en.footer.monthNames;
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

export function getHeaderContactInfo(language: ResumeLanguage, contact: ContactInfo): {
  email: string;
  phone: string;
  phoneHref: string;
  wechat?: string;
} {
  const { contactLayout } = copy[language];
  const useCnContact = contactLayout.useCnContact;
  const phone = useCnContact ? contact.cnPhone ?? contact.phone : contact.phone;
  const email = useCnContact ? contact.cnEmail ?? contact.email : contact.email;

  return {
    email,
    phone,
    phoneHref: `sms:${phone.replace(/\s/g, "")}`,
    wechat: contactLayout.showWechat ? contact.wechat : undefined,
  };
}

export function getUrlDisplayText(
  url: string,
  mode: "path" | "host-path" = "path"
): string {
  try {
    const parsed = new URL(url);
    const normalizedPath = parsed.pathname.replace(/^\/+|\/+$/g, "");
    if (mode === "host-path") {
      return normalizedPath ? `${parsed.host}/${normalizedPath}` : parsed.host;
    }
    return normalizedPath || parsed.host;
  } catch {
    return url;
  }
}

const localizedSectionData = {
  summary: {
    en: summaryEn,
    zh: summaryZh,
    "zh-hk": summaryZhHk,
  },
  workExperience: {
    en: workExperienceEn,
    zh: workExperienceZh,
    "zh-hk": workExperienceZhHk,
  },
  project: {
    en: projectsEn,
    zh: projectsZh,
    "zh-hk": projectsZhHk,
  },
  skills: {
    en: skillsEn,
    zh: skillsZh,
    "zh-hk": skillsZhHk,
  },
  education: {
    en: educationEn,
    zh: educationZh,
    "zh-hk": educationZhHk,
  },
} as const;

export function getLocalizedSection<T extends keyof typeof localizedSectionData>(
  language: ResumeLanguage,
  sectionKey: T
): {
  data: (typeof localizedSectionData)[T][ResumeLanguage];
  title: string;
} {
  return {
    data: localizedSectionData[sectionKey][language],
    title: copy[language].sections[sectionKey],
  };
}

export function filterExperience<T extends { jobTypes: ExperienceJobType[] }>(
  items: T[],
  profile: ResumeJobType
): T[] {
  if (profile === "NONE") {
    return items;
  }
  return items.filter((item) => item.jobTypes.includes(profile));
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
      website: "https://shyu216.dpdns.org/shyu-resume/",
      email: "yusihong073@gmail.com",
      phone: "0431083127",
      wechat: "seinbaulio",
      cnEmail: "shyu0@qq.com",
      cnPhone: "13697555391"
    }
  },
};
