"use client";

import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import ActionButton from "@/components/ui/action-button";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { siteConfig } from "@/content/config";

type Props = {
  usage: "live" | "pdf";
};

export default function HeaderSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const { name, contact } = siteConfig.personal;

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

  const renderName = () => {
    const nameData = name[language as keyof typeof name];
    if (language === 'en') {
      return (
        <div>
          {nameData.first} <span className="text-rose-600">{nameData.last}</span>
        </div>
      );
    } else {
      return (
        <div>
          <span className="text-rose-600">{nameData.last}</span>
          {nameData.first}
        </div>
      );
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-wrap">
          <h2 className="text-2xl font-bold mr-4">{renderName()}</h2>
          
          <Link
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className={contactItemClass}
            aria-label="LinkedIn"
          >
            <Icons.Linkedin size={16} className="group-hover:animate-shake" />
          </Link>

          <Link
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className={contactItemClass}
            aria-label="GitHub"
          >
            <Icons.Github size={16} className="group-hover:animate-shake" />
          </Link>

          <Link
            href={`mailto:${contact.email}`}
            className={contactItemClass}
          >
            <Icons.Mail size={16} className="group-hover:animate-shake" />
            <span>{contact.email}</span>
          </Link>
          
          <Link href={`tel:${contact.phone.replace(/\s/g, '')}`} className={contactItemClass}>
            <Icons.PhoneCall size={16} className="group-hover:animate-shake" />
            <span>{contact.phone}</span>
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
