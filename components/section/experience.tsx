import { cn } from "@/lib/utils";
import { useUsageMap } from "@/lib/utils";
import { useTextColor } from "@/lib/theme-utils";
import { KeywordHighlighter } from "@/components/job/keyword-highlighter";

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
  const textSize = useUsageMap({
    live: "text-sm",
    pdf: "text-[11px]",
  }, usage);
  
  const textColor = useTextColor(usage);
  const secondaryTextColor = useTextColor(usage);

  return (
    <section className={cn(textSize, "break-inside-avoid page-break-inside-avoid break-before-auto")} style={{ color: textColor }}>
      <div>
        <div className="flex font-semibold gap-x-4 flex-wrap justify-between">
          <div className="flex gap-x-4 flex-wrap">
            {head1 && <div>{head1}</div>}
            {head2 && <div>{head2}</div>}
            {head3 && <div>{head3}</div>}
          </div>
          {head4 && <div style={{ color: secondaryTextColor }}>{head4}</div>}
        </div>
        <div className="flex font-semibold gap-x-4 flex-wrap justify-between">
          {head5 && <div>{head5}</div>}
          {head6 && <div style={{ color: secondaryTextColor }}>{head6}</div>}
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
        <ul className="list-disc ml-4 mt-1">
          {bulletPoints?.map((point, index) => (
            <li key={index}><KeywordHighlighter text={point} keywords={keywords || []} /></li>
          ))}
        </ul>)}
    </section>
  );
}