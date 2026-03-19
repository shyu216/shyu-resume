"use client";

import { useContext } from "react";
import Section from "@/components/section/section";
import { LanguageContext } from "@/components/lang/language-provider";
import { useJobType } from "@/components/job/job-type-provider";
import { useSummaryEdit } from "@/components/summary/summary-edit-provider";
import { cn } from "@/lib/utils";

type Props = {
  usage: "live" | "pdf";
};

const placeholders = {
  en: "What keywords are in the JD? Think about your soft skills & quantified achievements! Good luck! 🚀",
  zh: "JD里有什么关键词？想想你的软技能和量化成绩！祝你好运！🚀",
  "zh-hk": "JD有咩關鍵詞？諗下你嘅軟技能同量化成績！Good Luck！🚀",
};

export default function SummarySection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const { jobType } = useJobType();
  const { isEditing, editedContent, updateContent, getCurrentContent } = useSummaryEdit();

  const fontSize = usage === "live" ? "text-sm" : "text-[11px]";
  const bodyLineHeight = usage === "live" ? "leading-normal" : "leading-[13px]";

  const title = language === "en" ? "SUMMARY" : language === "zh" ? "个人简介" : "個人簡介";

  const currentContent = getCurrentContent();
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
          style={{ color: 'var(--color-text-primary)' }}
          placeholder={placeholders[language]}
        />
      ) : (
        <div
          className={`${fontSize} ${bodyLineHeight}`}
          style={{ color: 'var(--color-text-primary)' }}
        >
          {displayContent}
        </div>
      )}
    </Section>
  );
}
