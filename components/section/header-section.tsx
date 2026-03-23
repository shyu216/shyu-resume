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

  const contactItemClass =
    "group mx-1 text-xs inline-flex gap-1 items-center transition";

  const renderName = () => {
    const nameData = name[language as keyof typeof name];
    // yunjin 使用 zh/ja/fr，都是"姓在前"的格式
    return (
      <div>
        <span className="text-[var(--header-color)]">{nameData.last}</span>
        {nameData.first}
      </div>
    );
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
            className={cn(contactItemClass, "text-[var(--color-text-primary)]")}
            aria-label="LinkedIn"
          >
            <Icons.Linkedin size={16} className="group-hover:animate-shake" />
          </Link>

          <Link
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className={cn(contactItemClass, "text-[var(--color-text-primary)]")}
            aria-label="GitHub"
          >
            <Icons.Github size={16} className="group-hover:animate-shake" />
          </Link>

          <Link
            href={`mailto:${contact.email}`}
            className={cn(contactItemClass, "text-[var(--color-text-primary)]")}
          >
            <Icons.Mail size={16} className="group-hover:animate-shake" />
            <span>{contact.email}</span>
          </Link>

          <Link
            href={`sms:${contact.phone}`}
            className={cn(contactItemClass, "text-[var(--color-text-primary)]")}
          >
            <Icons.PhoneCall size={16} className="group-hover:animate-shake" />
            <span>{contact.phone}</span>
          </Link>
        </div>
        <ActionButton
          usage={usage}
          className={cn(usage === "live" && "hidden md:block")}
        />
      </div>
    </section>
  );
}
