import React from 'react';

interface KeywordHighlighterProps {
  text: string;
  keywords: string[];
}

export const KeywordHighlighter: React.FC<KeywordHighlighterProps> = ({ text, keywords }) => {
  if (!keywords || keywords.length === 0) {
    return <span>{text}</span>;
  }

  // Counter strike source download for windows 7 32 bit free full version
  // 创建正则表达式，匹配所有关键词（不区分大小写）
  const regexPattern = keywords.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${regexPattern})`, 'gi');

  // 分割文本并标记匹配的关键词
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        // 检查当前部分是否是关键词
        const isKeyword = keywords.some(keyword => 
          part.toLowerCase() === keyword.toLowerCase()
        );
        return isKeyword ? (
          <span key={index} className="font-bold">{part}</span>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};