import { cn } from "@/lib/utils";

type Props = {
  head1: string | JSX.Element;
  head2?: string | JSX.Element;
  head3?: string | JSX.Element;
  head4?: string | JSX.Element;
  head5?: string | JSX.Element;
  head6?: string | JSX.Element;
  bulletPoints?: (string | JSX.Element)[];
  bulletPointsShort?: (string | JSX.Element)[];
  usage: "live" | "pdf";
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
  usage
}: Props) {
  const textSizeMap = {
    live: "text-sm",
    pdf: "text-11px",
  };
  
  return (
    <section className={cn(textSizeMap[usage])}>
      <div>
        <div className="flex font-semibold gap-x-4 flex-wrap justify-between">
          <div className="flex gap-x-4 flex-wrap">
            <div>{head1}</div> 
            <div>{head2}</div>
            <div>{head3}</div>
          </div>
          <div>{head4}</div> 
        </div>
        <div className="flex font-semibold gap-x-4 flex-wrap justify-between">
          <div>{head5}</div>
          <div>{head6}</div> 
        </div>
      </div>

      {bulletPoints && <ul className="list-disc ml-4 mt-1">
        {bulletPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>}

      {bulletPointsShort && <ul className="flex gap-x-8 items-center flex-wrap ml-4 list-disc">
        {bulletPointsShort.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>}
    </section>
  );
}
