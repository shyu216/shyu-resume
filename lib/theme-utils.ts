// ==========================================
// 主题工具函数 - Theme Utilities
// ==========================================

import { useTheme } from "next-themes";
import { themeColors, colorPalettes, fontFamilies, type FontFamilyType } from "@/lib/theme-config";
import { useColor } from "@/components/color/color-provider";

// ==========================================
// CSS Variable Constants (for SSR)
// ==========================================

export const CSS_VARS = {
  headerColor: 'var(--header-color)',
  textPrimary: 'var(--color-text-primary)',
  borderDefault: 'var(--color-border-default)',
  surfaceColor: 'var(--color-surface)',
  cardColor: 'var(--color-card-default)',
  shadowSoft: 'var(--shadow-soft)',
  shadowAccent: 'var(--shadow-accent)',
  shadowMd: 'var(--shadow-md)',
  fontFamily: 'var(--font-family)',
} as const;

// ==========================================
// Color Hooks (Client-side only)
// ==========================================

/**
 * 获取当前主题下的颜色值
 */
export function useThemeColor(
  key: keyof typeof themeColors,
  subKey?: string,
  usage: "live" | "pdf" = "live"
): string {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // PDF模式下强制使用明亮主题的颜色
  const theme = usage === "pdf" ? "light" : (isDark ? "dark" : "light");

  const colorConfig = themeColors[key];

  // 处理嵌套结构
  if (subKey && typeof colorConfig === "object" && colorConfig !== null) {
    const subConfig = (colorConfig as any)[subKey];
    if (subConfig && typeof subConfig === "object" && "light" in subConfig) {
      return subConfig[theme];
    }
    if (typeof subConfig === "string") {
      return subConfig;
    }
  }

  // 处理直接的 ThemeColorPair
  if (colorConfig && typeof colorConfig === "object" && "light" in colorConfig) {
    return (colorConfig as { light: string; dark: string })[theme];
  }

  return String(colorConfig);
}

/**
 * 获取当前主题下的文本颜色
 */
export function useTextColor(usage: "live" | "pdf" = "live"): string {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // PDF模式下强制使用纯黑色文本
  if (usage === "pdf") {
    return "#000000";
  }

  return themeColors.text.primary[isDark ? "dark" : "light"];
}

/**
 * 获取当前主题下的头部颜色
 */
export function useHeaderColor(usage: "live" | "pdf" = "live"): string {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const theme = usage === "pdf" ? "light" : (isDark ? "dark" : "light");

  const { headerColor } = useColor();

  return colorPalettes[headerColor]?.[theme] || colorPalettes.red[theme];
}

/**
 * 获取当前主题下的边框颜色
 */
export function useBorderColor(usage: "live" | "pdf" = "live"): string {
  return useThemeColor("border", "default", usage);
}

/**
 * 获取当前主题下的表面色
 */
export function useSurfaceColor(usage: "live" | "pdf" = "live"): string {
  return useThemeColor("surface", undefined, usage);
}

/**
 * 获取当前主题下的卡片颜色
 */
export function useCardColor(usage: "live" | "pdf" = "live"): string {
  return useThemeColor("card", "default", usage);
}

// ==========================================
// Shadow Hooks
// ==========================================

const shadows = {
  soft: {
    light: '0 2px 8px rgba(0, 0, 0, 0.06)',
    dark: '0 2px 8px rgba(0, 0, 0, 0.3)',
  },
  accent: {
    light: '0 4px 11px rgba(30, 64, 175, 0.15)',
    dark: '0 4px 11px rgba(59, 130, 246, 0.2)',
  },
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
};

/**
 * 获取主题相关的柔和阴影
 */
export function useSoftShadow(): string {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return shadows.soft[isDark ? "dark" : "light"];
}

/**
 * 获取主题相关的强调阴影
 */
export function useAccentShadow(): string {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return shadows.accent[isDark ? "dark" : "light"];
}

/**
 * 获取阴影值
 */
export function useShadow(): string {
  return shadows.md;
}

// ==========================================
// Theme Detection
// ==========================================

/**
 * 检查是否为深色主题
 */
export function useIsDarkTheme(): boolean {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark";
}

// ==========================================
// Font Utilities
// ==========================================

/**
 * 获取字体栈
 */
export function getFontStack(fontFamily: FontFamilyType): string {
  return fontFamilies[fontFamily]?.fontStack.join(", ") || fontFamilies.inter.fontStack.join(", ");
}
