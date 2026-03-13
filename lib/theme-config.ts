// ==========================================
// 简历应用 - 简化视觉设计系统
// Simplified Resume Design System
// ==========================================

// ==========================================
// 1. 类型定义
// ==========================================

export interface ThemeColorPair {
  light: string;
  dark: string;
}

export interface ThemeColors {
  primary: ThemeColorPair;
  background: ThemeColorPair;
  surface: ThemeColorPair;
  text: {
    primary: ThemeColorPair;
  };
  border: {
    default: ThemeColorPair;
  };
  card: {
    default: ThemeColorPair;
  };
  button: {
    primary: ThemeColorPair;
  };
  header: ThemeColorPair;
}

export type FontFamilyType = 'inter' | 'jetbrains-mono' | 'monospace' | 'sans-serif' | 'serif';

export interface DesignSystem {
  colors: ThemeColors;
  fontFamilies: {
    [key in FontFamilyType]: {
      name: string;
      fontStack: string[];
    };
  };
}

// ==========================================
// 2. 配色方案 - 简化版
// ==========================================

export const themeColors: ThemeColors = {
  // 主色调
  primary: {
    light: '#1e40af',
    dark: '#60a5fa',
  },
  // 背景色
  background: {
    light: '#fafafa',
    dark: '#0f172a',
  },
  // 表面色
  surface: {
    light: '#ffffff',
    dark: '#1e293b',
  },
  // 文本色
  text: {
    primary: {
      light: '#0f172a',
      dark: '#f1f5f9',
    },
  },
  // 边框色
  border: {
    default: {
      light: '#e2e8f0',
      dark: '#334155',
    },
  },
  // 卡片色
  card: {
    default: {
      light: '#ffffff',
      dark: '#1e293b',
    },
  },
  // 按钮色
  button: {
    primary: {
      light: '#1e40af',
      dark: '#3b82f6',
    },
  },
  // 头部颜色
  header: {
    light: '#1e40af',
    dark: '#3b82f6',
  },
};

// ==========================================
// 3. 字体配置
// ==========================================

export const fontFamilies: DesignSystem['fontFamilies'] = {
  'inter': {
    name: 'Inter',
    fontStack: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  },
  'jetbrains-mono': {
    name: 'JetBrains Mono',
    fontStack: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
  },
  'monospace': {
    name: 'Monospace',
    fontStack: ['monospace'],
  },
  'sans-serif': {
    name: 'Sans-serif',
    fontStack: ['sans-serif'],
  },
  'serif': {
    name: 'Custom Serif',
    fontStack: ['serif'],
  },
};

// ==========================================
// 4. 颜色选项 (供 ColorSwitcher 使用)
// ==========================================

export const colorPalettes: Record<string, { light: string; dark: string }> = {
  blue: {
    light: '#1e40af',
    dark: '#60a5fa',
  },
  red: {
    light: '#dc2626',
    dark: '#fca5a5',
  },
  purple: {
    light: '#7e22ce',
    dark: '#d8b4fe',
  },
  green: {
    light: '#059669',
    dark: '#6ee7b7',
  },
  orange: {
    light: '#ea580c',
    dark: '#fdba74',
  },
  pink: {
    light: '#db2777',
    dark: '#f9a8d4',
  },
  teal: {
    light: '#0d9488',
    dark: '#5eead4',
  },
  indigo: {
    light: '#4338ca',
    dark: '#a5b4fc',
  },
};

// ==========================================
// 5. 完整设计系统导出
// ==========================================

export const designSystem: DesignSystem = {
  colors: themeColors,
  fontFamilies,
};

// ==========================================
// 6. 生成 Tailwind 配置
// ==========================================

export function generateTailwindConfig() {
  return {
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: themeColors.primary.light,
            light: themeColors.primary.light,
            dark: themeColors.primary.dark,
          },
          background: {
            DEFAULT: themeColors.background.light,
            light: themeColors.background.light,
            dark: themeColors.background.dark,
          },
          surface: {
            DEFAULT: themeColors.surface.light,
            light: themeColors.surface.light,
            dark: themeColors.surface.dark,
          },
          text: {
            primary: {
              DEFAULT: themeColors.text.primary.light,
              light: themeColors.text.primary.light,
              dark: themeColors.text.primary.dark,
            },
          },
          border: {
            DEFAULT: themeColors.border.default.light,
            light: themeColors.border.default.light,
            dark: themeColors.border.default.dark,
          },
          card: {
            DEFAULT: themeColors.card.default.light,
            light: themeColors.card.default.light,
            dark: themeColors.card.default.dark,
          },
          button: {
            primary: {
              DEFAULT: themeColors.button.primary.light,
              light: themeColors.button.primary.light,
              dark: themeColors.button.primary.dark,
            },
          },
          header: {
            DEFAULT: themeColors.header.light,
            light: themeColors.header.light,
            dark: themeColors.header.dark,
          },
        },
        fontFamily: {
          sans: fontFamilies.inter.fontStack,
          mono: fontFamilies['jetbrains-mono'].fontStack,
        },
      },
    },
  };
}
