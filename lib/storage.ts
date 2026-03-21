// ==========================================
// 统一 LocalStorage 管理系统
// 支持版本控制、数据迁移、类型安全
// ==========================================

import type { LanguageType } from "@/components/lang/language-provider";
import type { FontFamilyType, ColorPalette } from "@/lib/theme-config";
import buildInfo from "@/app/build-info.json";

// 存储版本号，用于数据迁移（使用构建版本）
const getBuildVersion = (): string => {
  return buildInfo?.version || "1";
};

const STORAGE_KEY = "resume-settings";

// 所有可存储的设置项
export interface AppSettings {
  buildVersion: string;
  dataVersion: string;
  color: ColorPalette;
  language: LanguageType;
  fontFamily: FontFamilyType;
  jobType: 'FULLSTACK' | 'SOFTWARE' | 'DEVOPS' | 'ML_RESEARCHER';
}

// 数据格式版本（当数据结构变化时递增）
const DATA_VERSION = "1";

// 默认值
export const DEFAULT_SETTINGS: AppSettings = {
  buildVersion: getBuildVersion(),
  dataVersion: DATA_VERSION,
  color: "red",
  language: "en",
  fontFamily: "inter",
  jobType: "FULLSTACK",
};

// 验证颜色值是否有效
const validColors: ColorPalette[] = [
  'blue', 'red', 'purple', 'green', 'orange', 'pink', 'teal', 'indigo'
];

// 验证语言值是否有效
const validLanguages: LanguageType[] = ['en', 'zh', 'zh-hk'];

// 验证字体值是否有效
const validFonts: FontFamilyType[] = [
  'inter', 'jetbrains-mono', 'system-ui', 'monospace', 'serif'
];

// 验证职位值是否有效
const validJobTypes = ['FULLSTACK', 'SOFTWARE', 'DEVOPS', 'ML_RESEARCHER'] as const;

/**
 * 从 localStorage 读取所有设置
 * 自动处理版本迁移和默认值填充
 */
export function loadSettings(): AppSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    
    // 如果没有存储，尝试迁移旧数据
    if (!raw) {
      return migrateFromOldStorage();
    }

    const parsed = JSON.parse(raw);
    const currentBuildVersion = getBuildVersion();
    
    // 版本检查：构建版本或数据版本不匹配都需要迁移
    const buildVersionMismatch = parsed.buildVersion !== currentBuildVersion;
    const dataVersionMismatch = parsed.dataVersion !== DATA_VERSION;
    
    if (buildVersionMismatch || dataVersionMismatch) {
      console.log('[Storage] Version mismatch, migrating...', {
        stored: { build: parsed.buildVersion, data: parsed.dataVersion },
        current: { build: currentBuildVersion, data: DATA_VERSION }
      });
      return migrateFromOldStorage(parsed);
    }

    // 验证并填充默认值
    return {
      buildVersion: currentBuildVersion,
      dataVersion: DATA_VERSION,
      color: validColors.includes(parsed.color) ? parsed.color : DEFAULT_SETTINGS.color,
      language: validLanguages.includes(parsed.language) ? parsed.language : DEFAULT_SETTINGS.language,
      fontFamily: validFonts.includes(parsed.fontFamily) ? parsed.fontFamily : DEFAULT_SETTINGS.fontFamily,
      jobType: validJobTypes.includes(parsed.jobType) ? parsed.jobType : DEFAULT_SETTINGS.jobType,
    };
  } catch (e) {
    console.error('[Storage] Failed to load settings:', e);
    return DEFAULT_SETTINGS;
  }
}

/**
 * 保存所有设置到 localStorage
 */
export function saveSettings(settings: Partial<AppSettings>): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const current = loadSettings();
    const merged: AppSettings = {
      ...current,
      ...settings,
      buildVersion: getBuildVersion(),
      dataVersion: DATA_VERSION,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (e) {
    console.error('[Storage] Failed to save settings:', e);
  }
}

/**
 * 迁移旧版独立存储的数据
 * 从旧格式或独立 key 迁移，保留用户设置
 */
function migrateFromOldStorage(oldData?: any): AppSettings {
  const settings: AppSettings = { ...DEFAULT_SETTINGS };

  if (typeof window === 'undefined') {
    return settings;
  }

  try {
    // 如果有旧数据，优先使用旧数据中的有效值
    if (oldData) {
      if (oldData.color && validColors.includes(oldData.color)) {
        settings.color = oldData.color;
      }
      if (oldData.language && validLanguages.includes(oldData.language)) {
        settings.language = oldData.language;
      }
      if (oldData.fontFamily && validFonts.includes(oldData.fontFamily)) {
        settings.fontFamily = oldData.fontFamily;
      }
      if (oldData.jobType && validJobTypes.includes(oldData.jobType)) {
        settings.jobType = oldData.jobType;
      }
    }

    // 回退：迁移旧版独立存储的数据
    const oldColor = localStorage.getItem("headerColor");
    if (oldColor && validColors.includes(oldColor as ColorPalette)) {
      settings.color = oldColor as ColorPalette;
    }

    const oldFont = localStorage.getItem("fontFamily");
    if (oldFont && validFonts.includes(oldFont as FontFamilyType)) {
      settings.fontFamily = oldFont as FontFamilyType;
    }

    const oldLang = localStorage.getItem("resume-language");
    if (oldLang && validLanguages.includes(oldLang as LanguageType)) {
      settings.language = oldLang as LanguageType;
    }

    // 保存到新格式（使用新版本号）
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    console.log('[Storage] Migrated settings:', settings);
    return settings;
  } catch (e) {
    console.error('[Storage] Migration failed:', e);
    return DEFAULT_SETTINGS;
  }
}

/**
 * 清除所有设置（调试用）
 */
export function clearSettings(): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("headerColor");
  localStorage.removeItem("fontFamily");
  localStorage.removeItem("resume-language");
}

// ==========================================
// React Hook - 用于组件中订阅设置变化
// ==========================================

import { useState, useEffect, useCallback } from 'react';

export function useAppSettings() {
  const [settings, setSettingsState] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化加载
  useEffect(() => {
    const loaded = loadSettings();
    setSettingsState(loaded);
    setIsInitialized(true);
  }, []);

  // 更新设置的辅助函数
  const updateSettings = useCallback((partial: Partial<AppSettings>) => {
    setSettingsState(prev => {
      const merged = { ...prev, ...partial };
      saveSettings(partial);
      return merged;
    });
  }, []);

  return {
    settings,
    isInitialized,
    updateSettings,
    // 便捷访问
    color: settings.color,
    language: settings.language,
    fontFamily: settings.fontFamily,
    jobType: settings.jobType,
    // 便捷更新
    setColor: useCallback((color: ColorPalette) => updateSettings({ color }), [updateSettings]),
    setLanguage: useCallback((language: LanguageType) => updateSettings({ language }), [updateSettings]),
    setFontFamily: useCallback((fontFamily: FontFamilyType) => updateSettings({ fontFamily }), [updateSettings]),
    setJobType: useCallback((jobType: AppSettings['jobType']) => updateSettings({ jobType }), [updateSettings]),
  };
}
