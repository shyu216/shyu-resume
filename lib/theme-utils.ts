// ==========================================
// 主题工具函数 - Theme Utilities (简化版)
// ==========================================

import { useTheme } from "next-themes";
import { themeColors, colorPalettes, fontFamilies, type FontFamilyType } from "@/lib/theme-config";

// ==========================================
// 颜色获取工具
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
  
  // 优先从 CSS 变量获取动态颜色
  if (typeof document !== "undefined") {
    const cssVar = getComputedStyle(document.documentElement)
      .getPropertyValue(`--header-color-${theme}`)
      .trim();
    if (cssVar) return cssVar;
  }
  
  return themeColors.header[theme];
}

/**
 * 获取当前主题下的主色调
 */
export function usePrimaryColor(usage: "live" | "pdf" = "live"): string {
  return useThemeColor("primary", undefined, usage);
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
// 阴影获取工具
// ==========================================

const shadows = {
  soft: {
    light: '0 2px 8px rgba(0, 0, 0, 0.06)',
    dark: '0 2px 8px rgba(0, 0, 0, 0.3)',
  },
  accent: {
    light: '0 4px 12px rgba(30, 64, 175, 0.15)',
    dark: '0 4px 12px rgba(59, 130, 246, 0.2)',
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
// 主题检测工具
// ==========================================

/**
 * 检查是否为深色主题
 */
export function useIsDarkTheme(): boolean {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark";
}

/**
 * 根据主题条件返回值
 */
export function useThemeValue<T>(lightValue: T, darkValue: T): T {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark" ? darkValue : lightValue;
}

// ==========================================
// 字体获取工具
// ==========================================

/**
 * 获取字体家族字符串
 */
export function useFontFamilyType(family: "sans" | "mono" = "sans"): string {
  return fontFamilies[family === "mono" ? "jetbrains-mono" : "inter"].fontStack.join(", ");
}

/**
 * 获取指定字体的字体栈
 */
export function getFontStack(fontFamily: FontFamilyType): string {
  return fontFamilies[fontFamily]?.fontStack.join(", ") || fontFamilies.inter.fontStack.join(", ");
}

// ==========================================
// 颜色调色板工具 (供 ColorSwitcher 使用)
// ==========================================

/**
 * 获取颜色调色板
 */
export function getColorPalettes(): typeof colorPalettes {
  return colorPalettes;
}

/**
 * 获取指定颜色的调色板
 */
export function getColorPalette(color: string): { light: string; dark: string } | undefined {
  return colorPalettes[color];
}
