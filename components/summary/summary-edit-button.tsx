"use client";

import { motion } from "framer-motion";
import { Pencil, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { useLanguageMap } from "@/lib/utils";

interface SummaryEditButtonProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export function SummaryEditButton({
  isEditing,
  onToggleEdit,
  onSave,
  onCancel,
}: SummaryEditButtonProps) {
  const { language } = useContext(LanguageContext);

  const tooltipMap = useLanguageMap({
    en: { edit: "Edit Summary", save: "Save", cancel: "Cancel" },
    zh: { edit: "编辑简介", save: "保存", cancel: "取消" },
    'zh-hk': { edit: "編輯簡介", save: "儲存", cancel: "取消" },
  }, language);

  if (isEditing) {
    return (
      <div className="flex gap-1">
        <ElegantTooltip content={tooltipMap.save} side="bottom">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSave}
            className={cn(
              "rounded-full px-3 py-2 bg-gradient-to-b font-bold ring-1 transition-all duration-200 backdrop-blur"
            )}
            style={{
              boxShadow: 'var(--shadow-soft)',
              borderColor: 'var(--color-border-default)',
              background: `linear-gradient(to bottom, color-mix(in srgb, var(--header-color) 90%, transparent), color-mix(in srgb, var(--header-color) 70%, transparent))`,
              color: 'var(--color-white)',
            }}
          >
            <Check className="h-6 w-6 p-0.5" />
          </motion.button>
        </ElegantTooltip>
        <ElegantTooltip content={tooltipMap.cancel} side="bottom">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className={cn(
              "rounded-full px-3 py-2 bg-gradient-to-b font-bold ring-1 transition-all duration-200 backdrop-blur"
            )}
            style={{
              boxShadow: 'var(--shadow-soft)',
              borderColor: 'var(--color-border-default)',
              background: `linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 80%, transparent), color-mix(in srgb, var(--color-surface) 95%, transparent))`,
              color: 'var(--color-text-primary)',
            }}
          >
            <X className="h-6 w-6 p-0.5" />
          </motion.button>
        </ElegantTooltip>
      </div>
    );
  }

  return (
    <ElegantTooltip content={tooltipMap.edit} side="bottom">
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleEdit}
        className={cn(
          "group rounded-full bg-gradient-to-b px-3 py-2 ring-1 backdrop-blur transition-all duration-200"
        )}
        style={{
          boxShadow: 'var(--shadow-soft)',
          borderColor: 'var(--color-border-default)',
          background: `linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 80%, transparent), color-mix(in srgb, var(--color-surface) 95%, transparent))`,
        }}
      >
        <Pencil className="h-6 w-6 p-0.5 transition-all duration-200 group-hover:rotate-12" style={{ color: 'var(--color-text-primary)' }} />
      </motion.button>
    </ElegantTooltip>
  );
}
