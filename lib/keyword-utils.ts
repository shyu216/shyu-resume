/**
 * 构建关键词正则模式字符串
 * @param keywords 关键词数组
 * @returns 正则模式字符串（未加 flags）
 */
export const buildKeywordRegexPattern = (keywords: string[]): string => {
  if (!keywords || keywords.length === 0) {
    return '';
  }

  return keywords
    .map(keyword => {
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return `\\b${escapedKeyword}\\b`;
    })
    .join('|');
};

/**
 * 检查文本是否包含任意关键词
 * @param text 待检查文本
 * @param keywords 关键词数组
 * @returns 是否匹配
 */
export const hasKeywordMatches = (text: string, keywords: string[]): boolean => {
  if (!text || !text.trim() || !keywords || keywords.length === 0) {
    return false;
  }

  const pattern = buildKeywordRegexPattern(keywords);
  if (!pattern) return false;

  const keywordRegex = new RegExp(`(${pattern})`, 'gi');
  return keywordRegex.test(text);
};