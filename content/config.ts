import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
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
import { copy, JobType, LanguageType } from "@/content/copy";


export type ExperienceJobType = Exclude<JobType, "NONE">;
type FontFamilyType = "monospace" | "songti";
type ColorPalette =
  | "blue"
  | "red"
  | "purple"
  | "green"
  | "orange"
  | "pink"
  | "teal"
  | "indigo";
export type PdfStyleId =
  | "accent"
  | "cards"
  | "blueprint"
  | "editorial"
  | "ribbon";
type BgStyleId =
  | "default-grid"
  | "triangle-prism"
  | "lumen-beams"
  | "orbit-mesh"
  | "dot-matrix";
type VisualBindingMode = "asconfig" | "aslist" | "random" | "consistent";
type VisualPreset = {
  color: ColorPalette;
  bgStyle: BgStyleId;
  pdfStyle: PdfStyleId;
  font?: FontFamilyType;
};

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
type ThemeOverride = { color?: ColorPalette; font?: FontFamilyType };

const profileOrder: readonly JobType[] = [
  "SWE",
  "SRE",
  "AIMR",
  "NONE",
];
const colorList: readonly ColorPalette[] = [
  "red",
  "indigo",
  "green",
  "purple",
  "teal",
  "blue",
  "orange",
  "pink",
];
const bgStyleList: readonly BgStyleId[] = [
  "default-grid",
  "triangle-prism",
  "lumen-beams",
  "orbit-mesh",
  "dot-matrix",
];
const pdfStyleList: readonly PdfStyleId[] = [
  "accent",
  "cards",
  "blueprint",
  "editorial",
  "ribbon",
];

const visualConsistentCache: {
  color: Map<JobType, ColorPalette>;
  bgStyle: Map<JobType, BgStyleId>;
  pdfStyle: Map<JobType, PdfStyleId>;
} = { color: new Map(), bgStyle: new Map(), pdfStyle: new Map() };
const visualBinding = {
  colorMode: "asconfig" as VisualBindingMode,
  bgStyleMode: "asconfig" as VisualBindingMode,
  pdfStyleMode: "asconfig" as VisualBindingMode,
} as const;
const visualPresetDefaults = {
  color: "red" as ColorPalette,
  bgStyle: "default-grid" as BgStyleId,
  pdfStyle: "ribbon" as PdfStyleId,
};
const visualThemeDefaults: Required<VisualPreset> = {
  ...visualPresetDefaults,
  font: "monospace",
};

const visualThemeByJob: Record<JobType, VisualPreset> = {
  SWE: {
    color: "red",
    bgStyle: "orbit-mesh",
    pdfStyle: "editorial",
    font: "monospace",
  },
  SRE: {
    color: "purple",
    bgStyle: "triangle-prism",
    pdfStyle: "cards",
    font: "monospace",
  },
  AIMR: {
    color: "indigo",
    bgStyle: "lumen-beams",
    pdfStyle: "blueprint",
    font: "monospace",
  },
  NONE: {
    color: "teal",
    bgStyle: "dot-matrix",
    pdfStyle: "ribbon",
    font: "monospace",
  },
};

const visualThemeLanguageOverrides: Partial<
  Record<LanguageType, Partial<Record<JobType, Partial<VisualPreset>>>>
> = {
  zh: {
    SWE: { font: "songti" },
    SRE: { font: "songti" },
    AIMR: { font: "songti" },
    NONE: { font: "songti" },
  },
  zhhk: {
    SWE: { font: "songti" },
    SRE: { font: "songti" },
    AIMR: { font: "songti" },
    NONE: { font: "songti" },
  },
};

const fontFamilies: Record<
  FontFamilyType,
  { name: string; fontStack: string[] }
> = {
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

const colorPalettes: Record<ColorPalette, { light: string; dark: string }> = {
  blue: { light: "#1e40af", dark: "#60a5fa" },
  red: { light: "#dc2626", dark: "#fca5a5" },
  purple: { light: "#7e22ce", dark: "#d8b4fe" },
  green: { light: "#059669", dark: "#6ee7b7" },
  orange: { light: "#ea580c", dark: "#fdba74" },
  pink: { light: "#db2777", dark: "#f9a8d4" },
  teal: { light: "#0d9488", dark: "#5eead4" },
  indigo: { light: "#4338ca", dark: "#a5b4fc" },
};

const localizedSectionData = {
  summary: { en: summaryEn, zh: summaryZh, zhhk: summaryZhHk },
  workExperience: {
    en: workExperienceEn,
    zh: workExperienceZh,
    zhhk: workExperienceZhHk,
  },
  project: { en: projectsEn, zh: projectsZh, zhhk: projectsZhHk },
  skills: { en: skillsEn, zh: skillsZh, zhhk: skillsZhHk },
  education: { en: educationEn, zh: educationZh, zhhk: educationZhHk },
} as const;

function getVisualPreset(
  profile: JobType,
  language?: LanguageType,
): Required<VisualPreset> {
  const base = visualThemeByJob[profile] ?? visualThemeDefaults;
  const o = language
    ? visualThemeLanguageOverrides[language]?.[profile]
    : undefined;
  return {
    color: o?.color ?? base.color,
    bgStyle: o?.bgStyle ?? base.bgStyle,
    pdfStyle: o?.pdfStyle ?? base.pdfStyle,
    font: (o?.font ?? base.font) as FontFamilyType,
  };
}

function getProfileIndex(profile: JobType): number {
  const index = profileOrder.indexOf(profile);
  return index === -1 ? 0 : index;
}
function getRandomItem<T>(list: readonly T[], fallback: T): T {
  return list.length === 0
    ? fallback
    : (list[Math.floor(Math.random() * list.length)] ?? fallback);
}
function getConsistentItem<T>(
  cache: Map<JobType, T>,
  profile: JobType,
  list: readonly T[],
  fallback: T,
): T {
  const cached = cache.get(profile);
  if (cached) return cached;
  const next = getRandomItem(list, fallback);
  cache.set(profile, next);
  return next;
}

export function resolveVisualValue(kind: "color", mode: VisualBindingMode, profile: JobType, language?: LanguageType): ColorPalette;
export function resolveVisualValue(kind: "bgStyle", mode: VisualBindingMode, profile: JobType, language?: LanguageType): BgStyleId;
export function resolveVisualValue(kind: "pdfStyle", mode: VisualBindingMode, profile: JobType, language?: LanguageType): PdfStyleId;
export function resolveVisualValue(
  kind: "color" | "bgStyle" | "pdfStyle",
  mode: VisualBindingMode,
  profile: JobType,
  language?: LanguageType,
): ColorPalette | BgStyleId | PdfStyleId {
  const preset = getVisualPreset(profile, language);

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
    color: (preset.color ?? visualThemeDefaults.color) as ColorPalette,
    bgStyle: (preset.bgStyle ?? visualThemeDefaults.bgStyle) as BgStyleId,
    pdfStyle: (preset.pdfStyle ?? visualThemeDefaults.pdfStyle) as PdfStyleId,
  } as const;

  const fallback = fallbackByKind[kind];
  const list = listByKind[kind];

  if (mode === "asconfig") {
    if (kind === "color") return (configValueByKind.color ?? fallback) as ColorPalette;
    if (kind === "bgStyle") return (configValueByKind.bgStyle ?? fallback) as BgStyleId;
    return (configValueByKind.pdfStyle ?? fallback) as PdfStyleId;
  }

  if (mode === "aslist") {
    const index = getProfileIndex(profile) % list.length;
    if (kind === "color") return (list[index] ?? fallback) as ColorPalette;
    if (kind === "bgStyle") return (list[index] ?? fallback) as BgStyleId;
    return (list[index] ?? fallback) as PdfStyleId;
  }

  if (mode === "random") {
    const val = getRandomItem(list, fallback);
    if (kind === "color") return val as ColorPalette;
    if (kind === "bgStyle") return val as BgStyleId;
    return val as PdfStyleId;
  }

  const cache = visualConsistentCache[kind as keyof typeof visualConsistentCache] as Map<JobType, unknown>;
  const result = getConsistentItem(cache as Map<JobType, any>, profile, list, fallback);
  if (kind === "color") return result as ColorPalette;
  if (kind === "bgStyle") return result as BgStyleId;
  return result as PdfStyleId;
}

function resolveTheme(
  profile: JobType,
  language: LanguageType,
): Required<ThemeOverride> {
  const preset = getVisualPreset(profile, language);
  return {
    color: resolveVisualValue(
      "color",
      visualBinding.colorMode,
      profile,
      language,
    ),
    font: preset.font,
  };
}

export function getColor(profile: JobType, language: LanguageType) {
  const { color } = resolveTheme(profile, language);
  return colorPalettes[color];
}
export function getFont(profile: JobType, language: LanguageType) {
  const { font } = resolveTheme(profile, language);
  return fontFamilies[font];
}
export function getPdfStyle(profile: JobType): PdfStyleId {
  return resolveVisualValue("pdfStyle", visualBinding.pdfStyleMode, profile);
}
export function getBgStyleBindingMode(): VisualBindingMode {
  return visualBinding.bgStyleMode;
}
export function getBgStyle(profile: JobType): BgStyleId {
  return resolveVisualValue("bgStyle", visualBinding.bgStyleMode, profile);
}
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
  option: { tooltipEn: string; tooltipZh: string; tooltipZhHk: string },
  language: LanguageType,
): string {
  const tooltipByLanguage: Record<LanguageType, string> = {
    en: option.tooltipEn,
    zh: option.tooltipZh,
    zhhk: option.tooltipZhHk,
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
      zhhk: { first: "思宏", last: "余" },
    },
    shortName: { en: "Dale", zh: "余", zhhk: "余" },
    contact: {
      linkedin: "https://www.linkedin.com/in/sihong-yu/",
      github: "https://github.com/shyu216",
      website: "https://shyu216.dpdns.org/shyu-resume/",
      email: "yusihong073@gmail.com",
      phone: "0431083127",
      wechat: "seinbaulio",
      cnEmail: "shyu0@qq.com",
      cnPhone: "13697555391",
    },
  },
};
