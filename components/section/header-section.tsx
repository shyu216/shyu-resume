"use client";

import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import ActionButton from "@/components/ui/action-button";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";

type Props = {
  usage: "live" | "pdf";
};

export default function HeaderSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  const nameMap = {
    en: (
      <div>
        Sihong <span className="text-rose-600">Yu</span>
      </div>
    ),
    zh: (
      <div>
        <span className="text-rose-600">余</span>
        思宏
      </div>
    ),
    "zh-hk": (
      <div>
        <span className="text-rose-600">余</span>
        思宏
      </div>
    ),
  };

  const buttonTextMap = {
    live: {
      en: "Save PDF",
      zh: "保存PDF",
      "zh-hk": "儲存PDF",
    },
    pdf: {
      en: "Open",
      zh: "前往",
      "zh-hk": "打開",
    },
  };

  const contactItemClass =
    "group mx-1 text-xs inline-flex gap-1 items-center text-stone-600 transition hover:text-stone-900 dark:hover:text-stone-300";

  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-wrap">
          <h2 className="text-2xl font-bold mr-4">{nameMap[language]}</h2>
          
          <Link
            href="https://www.linkedin.com/in/sihong-yu/"
            target="_blank"
            rel="noreferrer"
            className={contactItemClass}
            aria-label="LinkedIn"
          >
            <Icons.Linkedin size={16} className="group-hover:animate-shake" />
          </Link>

          <Link
            href="https://github.com/shyu216"
            target="_blank"
            rel="noreferrer"
            className={contactItemClass}
            aria-label="GitHub"
          >
            <Icons.Github size={16} className="group-hover:animate-shake" />
          </Link>

          <Link
            href="mailto:yusihong073@gmail.com"
            className={contactItemClass}
          >
            <Icons.Mail size={16} className="group-hover:animate-shake" />
            <span>yusihong073@gmail.com</span>
          </Link>
          
          <Link href="tel:+61431083127" className={contactItemClass}>
            <Icons.PhoneCall size={16} className="group-hover:animate-shake" />
            <span>+61 431 083 127</span>
          </Link>
        </div>
        <ActionButton
          usage={usage}
          className={cn("bg-stone-800", usage === "live" && "hidden sm:block")}
        />
      </div>
    </section>
  );
}
