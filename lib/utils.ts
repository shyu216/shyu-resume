import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  map: Record<"en" | "zh" | "zh-hk", T>,
  language: "en" | "zh" | "zh-hk"
): T {
  return map[language];
}
