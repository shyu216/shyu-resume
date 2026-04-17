// ==========================================
// 统一 LocalStorage 管理系统
// 支持版本控制、数据迁移、类型安全
// ==========================================

import { jobOptions, type JobType } from "@/content/config";
import { copy } from "@/content/copy";
import type { LanguageType } from "@/content/copy";
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
  language: LanguageType;
  jobType: JobType;
}

const validLanguages = Object.keys(copy) as LanguageType[];
const defaultLanguage = validLanguages[0];
const defaultJobType = jobOptions[0]?.value;

// 数据格式版本（当数据结构变化时递增）
const DATA_VERSION = "1";

// 默认值
export const DEFAULT_SETTINGS: AppSettings = {
  buildVersion: getBuildVersion(),
  dataVersion: DATA_VERSION,
  language: defaultLanguage,
  jobType: defaultJobType,
};

// 验证职位值是否有效
const validJobTypes = jobOptions.map((option) => option.value) as readonly JobType[];

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
      language: validLanguages.includes(parsed.language) ? parsed.language : DEFAULT_SETTINGS.language,
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
      if (oldData.language && validLanguages.includes(oldData.language)) {
        settings.language = oldData.language;
      }
      if (oldData.jobType && validJobTypes.includes(oldData.jobType)) {
        settings.jobType = oldData.jobType;
      }
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
    language: settings.language,
    jobType: settings.jobType,
    setLanguage: useCallback((language: LanguageType) => updateSettings({ language }), [updateSettings]),
    setJobType: useCallback((jobType: AppSettings['jobType']) => updateSettings({ jobType }), [updateSettings]),
  };
}
