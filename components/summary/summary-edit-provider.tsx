"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useJobType } from "@/components/job/job-type-provider";
import { useContext as useLanguageContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { summary as summaryZh } from "@/content/zh/summary";
import { summary as summaryJa } from "@/content/ja/summary";
import { summary as summaryFr } from "@/content/fr/summary";
import { addSummaryToHistory } from "@/lib/summary-storage";

interface SummaryEditContextType {
  isEditing: boolean;
  editedContent: string;
  originalContent: string;
  toggleEdit: () => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  updateContent: (content: string) => void;
  setContentFromHistory: (content: string) => void;
  getCurrentContent: () => string;
}

const SummaryEditContext = createContext<SummaryEditContextType | undefined>(undefined);

export function SummaryEditProvider({ children }: { children: React.ReactNode }) {
  const { jobType } = useJobType();
  const { language } = useLanguageContext(LanguageContext);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");

  // 获取当前应该显示的summary内容
  const getSummaryContent = useCallback(() => {
    // yunjin分支：JobType是'PERFORMER' | 'COMPOSER' | 'DIRECTOR'
    // zh使用 Yunjin 的 performer/composer/director
    // ja/fr 也使用 performer/composer/director
    switch (jobType) {
      case "PERFORMER":
        return language === "zh" ? summaryZh.performer :
               language === "ja" ? summaryJa.performer :
               summaryFr.performer;
      case "COMPOSER":
        return language === "zh" ? summaryZh.composer :
               language === "ja" ? summaryJa.composer :
               summaryFr.composer;
      case "DIRECTOR":
        return language === "zh" ? summaryZh.director :
               language === "ja" ? summaryJa.director :
               summaryFr.director;
      default:
        return language === "zh" ? summaryZh.performer :
               language === "ja" ? summaryJa.performer :
               summaryFr.performer;
    }
  }, [jobType, language]);

  // 当jobType或language变化时，更新原始内容
  useEffect(() => {
    const content = getSummaryContent();
    setOriginalContent(content);
    setEditedContent(content);
  }, [getSummaryContent]);

  const toggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const saveEdit = useCallback(() => {
    // 保存当前内容到历史记录
    if (editedContent !== originalContent) {
      addSummaryToHistory(editedContent, jobType, language);
    }
    setOriginalContent(editedContent);
    setIsEditing(false);
  }, [editedContent, originalContent, jobType, language]);

  const cancelEdit = useCallback(() => {
    setEditedContent(originalContent);
    setIsEditing(false);
  }, [originalContent]);

  const updateContent = useCallback((content: string) => {
    setEditedContent(content);
  }, []);

  const setContentFromHistory = useCallback((content: string) => {
    setEditedContent(content);
    setOriginalContent(content);
    // 也保存到历史记录
    addSummaryToHistory(content, jobType, language);
  }, [jobType, language]);

  const getCurrentContent = useCallback(() => {
    return isEditing ? editedContent : originalContent;
  }, [isEditing, editedContent, originalContent]);

  return (
    <SummaryEditContext.Provider
      value={{
        isEditing,
        editedContent,
        originalContent,
        toggleEdit,
        saveEdit,
        cancelEdit,
        updateContent,
        setContentFromHistory,
        getCurrentContent,
      }}
    >
      {children}
    </SummaryEditContext.Provider>
  );
}

export function useSummaryEdit() {
  const context = useContext(SummaryEditContext);
  if (context === undefined) {
    throw new Error("useSummaryEdit must be used within a SummaryEditProvider");
  }
  return context;
}
