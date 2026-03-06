import React, { useMemo } from 'react';

interface KeywordHighlighterProps {
  index: number;
  text: string;
  keywords: string[];
}

export const KeywordHighlighter: React.FC<KeywordHighlighterProps> = ({ index, text, keywords }) => {
  const processedContent = useMemo(() => {
    if (!text || !text.trim() || !keywords || keywords.length === 0) {
      return null;
    }

    const regexPattern = keywords
      .map(keyword => {
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return `\\b${escapedKeyword}\\b`;
      })
      .join('|');

    const keywordRegex = new RegExp(`(${regexPattern})`, 'gi');
    const parts = text.split(keywordRegex);

    if (parts.length <= 1) {
      return null;
    }

    const keywordSet = new Set(keywords.map(keyword => keyword.toLowerCase()));
    
    return parts.map((part, partIndex) => {
      const isKeyword = keywordSet.has(part.toLowerCase());
      return (
        <span key={partIndex} className={isKeyword ? "font-bold" : undefined}>
          {part}
        </span>
      );
    });
  }, [text, keywords]);

  if (!processedContent) {
    return null;
  }

  return <li key={index}><span>{processedContent}</span></li>;
};