// Experience Component - Server Component
// Displays work/project/education experience entries

import { cn } from "@/lib/utils";
import { KeywordHighlighter } from "@/components/job/keyword-highlighter";

interface ExperienceProps {
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
}

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
}: ExperienceProps) {
  const textSize = usage === "live" ? "text-sm" : "text-[11px]";
  const bodyLineHeight = usage === "live" ? "leading-normal" : "leading-[13px]";

  return (
    <section
      className={cn(textSize, "break-inside-avoid page-break-inside-avoid break-before-auto")}
      style={{ color: 'var(--color-text-primary)' }}
    >
      <div>
        <div className="flex font-semibold gap-x-4 flex-wrap justify-between">
          <div className="flex gap-x-4 flex-wrap">
            {head1 && <div>{head1}</div>}
            {head2 && <div>{head2}</div>}
            {head3 && <div>{head3}</div>}
          </div>
          {head4 && <div style={{ color: 'var(--color-text-primary)' }}>{head4}</div>}
        </div>
        <div className="flex font-semibold gap-x-4 flex-wrap justify-between">
          {head5 && <div>{head5}</div>}
          {head6 && <div style={{ color: 'var(--color-text-primary)' }}>{head6}</div>}
        </div>
      </div>

      {bulletPointsShort && bulletPointsShort.length > 0 && (
        <ul className="flex gap-x-8 items-center flex-wrap ml-4 list-disc">
          {bulletPointsShort.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}

      {bulletPoints && bulletPoints.length > 0 && (
        <ul className={cn("list-disc ml-4 mt-1", bodyLineHeight)}>
          {bulletPoints?.map((point, index) => (
            <li key={index}>
              <KeywordHighlighter text={point} keywords={keywords || []} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
