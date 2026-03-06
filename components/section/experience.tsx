import { cn } from "@/lib/utils";
import { KeywordHighlighter } from "@/components/job/keyword-highlighter";
import { useMemo } from "react";

type Props = {
  head1: string | JSX.Element;
  head2?: string | JSX.Element;
  head3?: string | JSX.Element;
  head4?: string | JSX.Element;
  head5?: string | JSX.Element;
  head6?: string | JSX.Element;
  bulletPoints?: string[];
  bulletPointsShort?: string[];
  usage: "live" | "pdf";
  keywords?: string[];
};

const hasKeywordMatches = (text: string, keywords: string[]): boolean => {
  if (!text || !text.trim() || !keywords || keywords.length === 0) {
    return false;
  }

  const regexPattern = keywords
    .map(keyword => {
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return `\\b${escapedKeyword}\\b`;
    })
    .join('|');

  const keywordRegex = new RegExp(`(${regexPattern})`, 'gi');
  return keywordRegex.test(text);
};

export default function Experience({
  head1,
  head2,
  head3,
  head4,
  head5,
  head6,
  bulletPoints,
  bulletPointsShort,
  usage,
  keywords
}: Props) {
  const textSizeMap = {
    live: "text-sm",
    pdf: "text-11px",
  };

  const hasMatches = useMemo(() => {
    if (head6) {
      return true;
    }
    return bulletPoints?.some(point => hasKeywordMatches(point, keywords || [])) || false;
  }, [bulletPoints, keywords, head6]);

  const filteredBulletPoints = useMemo(() => {
    return bulletPoints?.map((point, index) => (
      <KeywordHighlighter index={index} text={point} keywords={keywords || []} />
    )).filter(Boolean) || [];
  }, [bulletPoints, keywords]);

  return (
    <section className={hasMatches ? cn(textSizeMap[usage], "break-inside-avoid page-break-inside-avoid break-before-auto") : "hidden"}>
      <div>
        <div className="flex font-semibold gap-x-4 flex-wrap justify-between">
          <div className="flex gap-x-4 flex-wrap">
            {head1 && <div>{head1}</div>}
            {head2 && <div>{head2}</div>}
            {head3 && <div>{head3}</div>}
          </div>
          {head4 && <div>{head4}</div>}
        </div>
        <div className="flex font-semibold gap-x-4 flex-wrap justify-between">
          {head5 && <div>{head5}</div>}
          {head6 && <div>{head6}</div>}
        </div>
      </div>

      {bulletPointsShort && bulletPointsShort.length > 0 && (
        <ul className="flex gap-x-8 items-center flex-wrap ml-4 list-disc">
          {bulletPointsShort.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}

      {filteredBulletPoints.length > 0 && (
        <ul className="list-disc ml-4 mt-1">
          {filteredBulletPoints}
        </ul>)}
    </section>
  );
}
