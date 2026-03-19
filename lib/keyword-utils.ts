/**
 * 构建关键词正则模式字符串
 * @param keywords 关键词数组
 * @returns 正则模式字符串（未加 flags）
 */
export function buildKeywordRegexPattern(keywords: string[]): string {
  if (!keywords || keywords.length === 0) {
    return '';
  }

  return keywords
    .map(keyword => {
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // 判断是否包含中文字符
      const hasChinese = /[\u4e00-\u9fa5]/.test(keyword);

      if (hasChinese) {
        // 中文：使用前后瞻断言，确保前后不是汉字字符
        // (?<![\u4e00-\u9fa5]) 前面不是汉字
        // (?![\u4e00-\u9fa5]) 后面不是汉字
        return `(?<![\\u4e00-\\u9fa5])${escapedKeyword}(?![\\u4e00-\\u9fa5])`;
      } else {
        // 英文/数字：使用单词边界
        return `\\b${escapedKeyword}\\b`;
      }
    })
    .join('|');
}

/**
 * 检查文本是否包含任意关键词
 * @param text 待检查文本
 * @param keywords 关键词数组
 * @returns 是否匹配
 */
export function hasKeywordMatches(text: string, keywords: string[]): boolean {
  if (!text || !text.trim() || !keywords || keywords.length === 0) {
    return false;
  }

  const pattern = buildKeywordRegexPattern(keywords);
  if (!pattern) return false;

  const keywordRegex = new RegExp(`(${pattern})`, 'gi');
  return keywordRegex.test(text);
}
