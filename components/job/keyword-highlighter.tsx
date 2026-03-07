import React, { useMemo } from 'react';
import { buildKeywordRegexPattern } from '@/lib/keyword-utils';

interface KeywordHighlighterProps {
  text: string;
  keywords: string[];
}

export const KeywordHighlighter: React.FC<KeywordHighlighterProps> = ({ text, keywords }) => {
  const processedContent = useMemo(() => {
    // 基础校验：无文本或无关键词，直接返回原文
    if (!text?.trim() || !keywords?.length) {
      return <span>{text}</span>;
    }

    const pattern = buildKeywordRegexPattern(keywords);
    if (!pattern) return <span>{text}</span>;

    const keywordRegex = new RegExp(`(${pattern})`, 'gi');
    const parts = text.split(keywordRegex);

    // 无匹配：直接返回原文
    if (parts.length <= 1) {
      return <span>{text}</span>;
    }

    // 有匹配：遍历并加粗关键词
    const keywordSet = new Set(keywords.map(k => k.toLowerCase()));
    return parts.map((part, index) => (
      <span
        key={index}
        className={keywordSet.has(part.toLowerCase()) ? "font-bold" : undefined}
      >
        {part}
      </span>
    ));
  }, [text, keywords]);

  // 直接返回处理后的内容（原文或高亮版）
  return <>{processedContent}</>;
};