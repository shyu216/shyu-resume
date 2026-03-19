"use client";

import { useContext } from "react";
import Section from "@/components/section/section";
import { LanguageContext } from "@/components/lang/language-provider";
import { useJobType } from "@/components/job/job-type-provider";
import { useTextColor } from "@/lib/theme-utils";
import { useSummaryEdit } from "@/components/summary/summary-edit-provider";
import { cn } from "@/lib/utils";

type Props = {
  usage: "live" | "pdf";
};

export default function SummarySection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const { jobType } = useJobType();
  const textSecondary = useTextColor(usage);
  const { isEditing, editedContent, updateContent, getCurrentContent } = useSummaryEdit();
  
  const fontSize = usage === "live" ? "text-sm" : "text-[11px]";
  const bodyLineHeight = usage === "live" ? "leading-normal" : "leading-[13px]";

  const title = language === "en" ? "SUMMARY" : language === "zh" ? "个人简介" : "個人簡介";
  
  const currentContent = getCurrentContent();

  // PDF模式下始终使用静态内容
  const displayContent = usage === "pdf" ? currentContent : currentContent;

  return (
    <Section title={title} usage={usage}>
      {isEditing && usage === "live" ? (
        <textarea
          value={editedContent}
          onChange={(e) => updateContent(e.target.value)}
          className={cn(
            "w-full min-h-[120px] p-3 rounded-lg resize-y",
            "bg-white dark:bg-stone-800",
            "border-2 border-stone-300 dark:border-stone-600",
            "focus:border-blue-500 dark:focus:border-blue-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            "transition-all duration-200",
            fontSize,
            bodyLineHeight
          )}
          style={{ color: textSecondary }}
          placeholder="请输入个人简介..."
        />
      ) : (
        <div 
          className={`${fontSize} ${bodyLineHeight}`} 
          style={{ color: textSecondary }}
        >
          {displayContent}
        </div>
      )}
    </Section>
  );
}
