"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { usePrint } from "@/components/print-provider";

type Props = {
  text: string;
  className?: string;
  usage: "live" | "pdf";
  title?: string;
};

export default function ActionButton({ text, className, usage, title }: Props) {
  const { handlePrint } = usePrint();
  return usage === "live" ? (
    <Button onClick={handlePrint} className={className} title={title}>
      {text}
    </Button>
  ) : (
    <Button className={className} href="https://shyu216.github.io/shyu-resume/">
      {text}
      <Icons.OpenLink className="h-4 w-4 stroke-stone-300 transition group-active:stroke-stone-700 dark:group-hover:stroke-stone-50 dark:group-active:stroke-stone-50" />
    </Button>
  );
}
