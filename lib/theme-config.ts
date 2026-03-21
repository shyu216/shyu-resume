// ==========================================
// 简历应用 - 主题配置
// ==========================================

export type FontFamilyType = 'inter' | 'jetbrains-mono' | 'system-ui' | 'monospace' | 'serif';

export type ColorPalette = 'blue' | 'red' | 'purple' | 'green' | 'orange' | 'pink' | 'teal' | 'indigo';

// ==========================================
// 字体配置
// ==========================================

export const fontFamilies: Record<FontFamilyType, { name: string; fontStack: string[] }> = {
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
// 颜色选项 (供 ColorSwitcher 使用)
// ==========================================

export const colorPalettes: Record<ColorPalette, { light: string; dark: string }> = {
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
