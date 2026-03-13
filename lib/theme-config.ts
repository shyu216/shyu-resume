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
  layout: {
    grid: ThemeColorPair;
    glow: ThemeColorPair;
    page: ThemeColorPair;
  };
}

export type FontFamilyType = 'inter' | 'jetbrains-mono' | 'system-ui' | 'monospace' | 'serif';

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
  // 布局背景色
  layout: {
    grid: {
      light: '#d6d3d1', // stone-300
      dark: '#57534e',  // stone-700
    },
    glow: {
      light: 'rgba(34,197,94,0.5)',  // green
      dark: 'rgba(59,130,246,0.5)', // blue
    },
    page: {
      light: '#fafaf9',  // stone-50
      dark: '#1c1917',   // stone-900
    },
  },
};

// ==========================================
// 3. 字体配置
// ==========================================

export const fontFamilies: DesignSystem['fontFamilies'] = {
  'inter': {
    name: 'Inter',
    fontStack: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
  },
  'jetbrains-mono': {
    name: 'JetBrains Mono',
    fontStack: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  },
  'system-ui': {
    name: 'System UI',
    fontStack: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
  },
  'monospace': {
    name: 'Monospace',
    fontStack: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  },
  'serif': {
    name: 'Serif',
    fontStack: ['Charter', 'Bitstream Charter', 'Sitka Text', 'Cambria', 'serif'],
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
          layout: {
            grid: {
              DEFAULT: themeColors.layout.grid.light,
              light: themeColors.layout.grid.light,
              dark: themeColors.layout.grid.dark,
            },
            glow: {
              DEFAULT: themeColors.layout.glow.light,
              light: themeColors.layout.glow.light,
              dark: themeColors.layout.glow.dark,
            },
            page: {
              DEFAULT: themeColors.layout.page.light,
              light: themeColors.layout.page.light,
              dark: themeColors.layout.page.dark,
            },
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
