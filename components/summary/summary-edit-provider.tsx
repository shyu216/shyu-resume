"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useJobType } from "@/components/job/job-type-provider";
import { useContext as useLanguageContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { summary as summaryEn } from "@/content/en/summary";
import { summary as summaryZh } from "@/content/zh/summary";
import { summary as summaryZhHk } from "@/content/zh-hk/summary";
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
    const summary = language === "en" ? summaryEn : language === "zh" ? summaryZh : summaryZhHk;
    switch (jobType) {
      case "FULLSTACK":
        return summary.fullstack;
      case "SOFTWARE":
        return summary.software;
      case "ML_RESEARCHER":
        return summary.ml;
      default:
        return summary.fullstack;
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
