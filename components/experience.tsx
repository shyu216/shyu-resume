import { cn } from "@/lib/utils";

type Props = {
  head1: string | JSX.Element;
  head2?: string | JSX.Element;
  head3?: string | JSX.Element;
  head4?: string | JSX.Element;
  bulletPoints?: (string | JSX.Element)[];
  bulletPointsShort?: (string | JSX.Element)[];
  usage: "live" | "pdf";
};

export default function Experience({
  head1,
  head2,
  head3,
  head4,
  bulletPoints,
  bulletPointsShort,
  usage
}: Props) {
  return (
    <section className={cn(usage === "live" ? "text-sm" : "text-11px")}>
      <div className="text-mygray-700 dark:text-mygray-300 mb-1">
        <div className="flex font-semibold gap-x-4 flex-wrap justify-between">
          <div className="font-bold text-red dark:text-white">{head1}</div>
          <div>{head2}</div>
        </div>
        <div className="flex gap-x-4 flex-wrap justify-between">
          <div>{head3}</div>
          <div>{head4}</div>
        </div>
      </div>

      {bulletPoints && <ul className="list-disc ml-4 text-mygray-600 dark:text-mygray-400">
        {bulletPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>}

      {bulletPointsShort && <ul className="list-disc ml-4 text-mygray-600 dark:text-mygray-400 flex flex-wrap">
        {bulletPointsShort.map((point, index) => (
          <li key={index} className="w-1/2 md:w-1/3 lg:w-1/4">{point}</li>
        ))}
      </ul>}
    </section>
  );
}
