"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SummaryHistoryItem,
  getSummaryHistoryByContext,
  removeSummaryFromHistory,
  clearSummaryHistory,
} from "@/lib/summary-storage";
import { X, History, Sparkles, MousePointerClick, Trash2, HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryBubblesProps {
  isOpen: boolean;
  onClose: () => void;
  jobType: string;
  language: string;
  onSelectSummary: (content: string) => void;
  currentContent: string;
}

const translations = {
  en: {
    history: "History",
    noHistory: "No history yet",
    noHistoryHint: "Edit and save to create history",
    clickToRestore: "Click to restore",
    localStorage: "Stored locally in browser",
    clearAll: "Clear all",
    confirmClear: "Clear all history?",
  },
  zh: {
    history: "历史版本",
    noHistory: "暂无历史记录",
    noHistoryHint: "编辑并保存以创建历史版本",
    clickToRestore: "点击恢复此版本",
    localStorage: "数据仅存储在本地浏览器中",
    clearAll: "清空全部",
    confirmClear: "确定清空所有历史记录？",
  },
  "zh-hk": {
    history: "歷史版本",
    noHistory: "暫無歷史記錄",
    noHistoryHint: "編輯並儲存以建立歷史版本",
    clickToRestore: "點擊恢復此版本",
    localStorage: "數據僅儲存在本地瀏覽器中",
    clearAll: "清空全部",
    confirmClear: "確定清空所有歷史記錄？",
  },
};

export function SummaryBubbles({
  isOpen,
  jobType,
  language,
  onSelectSummary,
}: SummaryBubblesProps) {
  const [historyItems, setHistoryItems] = useState<SummaryHistoryItem[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const t = translations[language as keyof typeof translations] || translations.en;

  useEffect(() => {
    if (isOpen) {
      const items = getSummaryHistoryByContext(jobType, language);
      setHistoryItems(items);
      setShowClearConfirm(false);
    }
  }, [isOpen, jobType, language]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeSummaryFromHistory(id);
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    if (showClearConfirm) {
      clearSummaryHistory();
      setHistoryItems([]);
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 3000);
    }
  };

  const handleSelect = (content: string) => {
    onSelectSummary(content);
  };

  const getBubbleColor = (index: number) => {
    const colors = [
      "bg-rose-400",
      "bg-purple-400",
      "bg-blue-400",
      "bg-teal-400",
      "bg-emerald-400",
      "bg-amber-400",
      "bg-orange-400",
    ];
    return colors[index % colors.length];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3 max-h-[80vh] py-2"
        >
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-1 px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm"
            style={{
              background: `linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 95%, transparent), color-mix(in srgb, var(--color-surface) 90%, transparent))`,
              boxShadow: 'var(--shadow-soft)',
              border: `1px solid var(--color-border-default)`,
            }}
          >
            <History className="w-3.5 h-3.5" style={{ color: 'var(--header-color)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {t.history}
            </span>
          </motion.div>

          {/* 历史记录列表 */}
          <div className="flex flex-col items-end gap-2 overflow-visible">
            {historyItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 px-4 py-6 rounded-xl shadow-md backdrop-blur-sm max-w-[160px]"
                style={{
                  background: `linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 90%, transparent), color-mix(in srgb, var(--color-surface) 85%, transparent))`,
                  boxShadow: 'var(--shadow-soft)',
                  border: `1px solid var(--color-border-default)`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--header-color) 20%, transparent)' }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: 'var(--header-color)' }} />
                </div>
                <p
                  className="text-xs text-center font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {t.noHistory}
                </p>
                <p
                  className="text-[10px] text-center leading-relaxed"
                  style={{ color: 'var(--color-text-primary)', opacity: 0.6 }}
                >
                  {t.noHistoryHint}
                </p>
              </motion.div>
            ) : (
              <>
                {historyItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{
                      delay: index * 0.03,
                      type: "spring",
                      damping: 20,
                      stiffness: 150,
                    }}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleSelect(item.content)}
                    className={cn(
                      "group relative cursor-pointer",
                      "flex items-center gap-2"
                    )}
                  >
                    {/* 预览卡片（悬停时显示在左侧） */}
                    <AnimatePresence>
                      {hoveredId === item.id && (
                        <motion.div
                          initial={{ opacity: 0, x: 8, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 8, scale: 0.95 }}
                          className="absolute right-full mr-3 px-3 py-2.5 rounded-lg shadow-lg z-50 min-w-[200px] max-w-[280px]"
                          style={{
                            background: `linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 98%, transparent), color-mix(in srgb, var(--color-surface) 95%, transparent))`,
                            boxShadow: 'var(--shadow-soft)',
                            border: `1px solid var(--color-border-default)`,
                          }}
                        >
                          <p
                            className="text-xs leading-relaxed line-clamp-3"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {item.preview}
                          </p>
                          <div
                            className="flex items-center gap-1.5 mt-2 pt-2"
                            style={{
                              borderTop: `1px solid var(--color-border-default)`,
                              opacity: 0.5,
                            }}
                          >
                            <MousePointerClick className="w-3 h-3" style={{ color: 'var(--header-color)' }} />
                            <span className="text-[10px]" style={{ color: 'var(--color-text-primary)' }}>
                              {t.clickToRestore}
                            </span>
                          </div>
                          <p
                            className="text-[10px] mt-1"
                            style={{ color: 'var(--color-text-primary)', opacity: 0.5 }}
                          >
                            {new Date(item.createdAt).toLocaleString(
                              language === "en" ? "en-US" : "zh-CN",
                              {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 气泡 */}
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "relative w-9 h-9 rounded-full shadow-md",
                        "flex items-center justify-center",
                        "cursor-pointer hover:shadow-lg transition-shadow",
                        getBubbleColor(index)
                      )}
                    >
                      <span className="text-white text-xs font-medium">
                        {index + 1}
                      </span>

                      {/* 删除按钮 */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: hoveredId === item.id ? 1 : 0,
                          scale: hoveredId === item.id ? 1 : 0,
                        }}
                        whileHover={{ scale: 1.15 }}
                        onClick={(e) => handleDelete(e, item.id)}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-sm"
                      >
                        <X className="w-2.5 h-2.5 text-white" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ))}

                {/* 清空全部按钮 */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={handleClearAll}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-medium transition-colors mt-1"
                  style={{
                    backgroundColor: showClearConfirm
                      ? "var(--color-danger-bg)"
                      : 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
                    color: showClearConfirm ? 'var(--color-danger)' : 'var(--color-text-primary)',
                    opacity: 0.7,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.7";
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                  {showClearConfirm ? t.confirmClear : t.clearAll}
                </motion.button>
              </>
            )}
          </div>

          {/* 本地存储说明 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md mt-1"
            style={{ opacity: 0.5 }}
          >
            <HardDrive className="w-3 h-3" style={{ color: 'var(--color-text-primary)' }} />
            <span className="text-[10px]" style={{ color: 'var(--color-text-primary)' }}>
              {t.localStorage}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
