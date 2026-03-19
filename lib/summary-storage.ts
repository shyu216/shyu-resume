// ==========================================
// Summary 历史记录 LocalStorage 管理
// 支持保存、读取、删除历史summary
// ==========================================

const SUMMARY_HISTORY_KEY = "resume-summary-history";

export interface SummaryHistoryItem {
  id: string;
  content: string;
  jobType: string;
  language: string;
  createdAt: number;
  preview: string;
}

export interface SummaryHistory {
  items: SummaryHistoryItem[];
}

// 获取所有历史记录
export function getSummaryHistory(): SummaryHistory {
  if (typeof window === "undefined") {
    return { items: [] };
  }
  
  try {
    const data = localStorage.getItem(SUMMARY_HISTORY_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to load summary history:", error);
  }
  
  return { items: [] };
}

// 保存历史记录
export function saveSummaryHistory(history: SummaryHistory): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(SUMMARY_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save summary history:", error);
  }
}

// 添加新的summary到历史
export function addSummaryToHistory(
  content: string,
  jobType: string,
  language: string
): SummaryHistoryItem {
  const history = getSummaryHistory();
  
  const newItem: SummaryHistoryItem = {
    id: Date.now().toString(),
    content,
    jobType,
    language,
    createdAt: Date.now(),
    preview: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
  };
  
  // 添加到开头，限制最多保存20条
  history.items = [newItem, ...history.items].slice(0, 20);
  
  saveSummaryHistory(history);
  return newItem;
}

// 删除单条历史记录
export function removeSummaryFromHistory(id: string): void {
  const history = getSummaryHistory();
  history.items = history.items.filter((item) => item.id !== id);
  saveSummaryHistory(history);
}

// 清空所有历史记录
export function clearSummaryHistory(): void {
  saveSummaryHistory({ items: [] });
}

// 获取特定jobType和language的历史记录
export function getSummaryHistoryByContext(
  jobType: string,
  language: string
): SummaryHistoryItem[] {
  const history = getSummaryHistory();
  return history.items.filter(
    (item) => item.jobType === jobType && item.language === language
  );
}
