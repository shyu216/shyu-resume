"use client";

import { Icons } from "@/components/icons";
import { SocialLink } from "@/components/social-link";
import Link from "next/link";
import ActionButton from "@/components/action-button";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { LanguageContext } from "../lang/language-provider";

type Props = {
  usage: "live" | "pdf";
};

export default function HeaderSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4 my-1">YU Si Hong</h2>
          <SocialLink
            href="https://github.com/shyu216"
            platform="github"
            aria-label="My GitHub"
            className="mx-1 h-4 w-4"
          />
          {/* <SocialLink
            href="https://www.linkedin.com/"
            platform="linkedin"
            aria-label="My LinkedIn"
            className="mx-1 h-4 w-4"
          /> */}
        </div>
        <ActionButton
          text={usage === "live" ?
            (language === "en" ? "Download Resume" : "下载简历")
            :
            (language === "en" ? "View Live Resume" : "查看在线简历")}
          usage={usage}
          className={cn(usage === "live" && "hidden sm:block")}
        />
      </div>
      <div className="flex flex-wrap gap-4 gap-y-1 text-sm">
        <Link
          href="mailto:shyu0@qq.com"
          className="group flex gap-2 items-center text-zinc-400 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <Icons.Mail size={12} className="group-hover:animate-shake" />
          shyu0@qq.com
        </Link>
        <Link
          href="tel:+8613697555391"
          className="group flex gap-2 items-center text-zinc-400 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <Icons.PhoneCall size={12} className="group-hover:animate-shake" />
          (+86) 13697555391
        </Link>
      </div>
    </section>
  );
}
