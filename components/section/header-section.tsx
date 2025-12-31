"use client";

import { Icons } from "@/components/icons";
import { SocialLink } from "@/components/social-link";
import Link from "next/link";
import ActionButton from "@/components/action-button";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";

type Props = {
  usage: "live" | "pdf";
};

export default function HeaderSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4 my-1">{language === "en" ? (
            <div>
              <span className="text-myred-600 dark:text-myred-600">Dale </span>Sihong Yu
            </div>
          ) : (
            <div>
              <span className="text-myred-600 dark:text-myred-600">余</span>思宏
            </div>
          )}</h2>
          {usage != "live" && <SocialLink
            href="mailto:shyu0@qq.com"
            platform="mail"
            aria-label="My Email"
            className="mx-1 h-4 w-4"
          />}
          <SocialLink
            href="https://github.com/shyu216"
            platform="github"
            aria-label="My GitHub"
            className="mx-1 h-4 w-4"
          />
          <SocialLink
            href="https://www.linkedin.com/in/sihong-yu-a35b30205/"
            platform="linkedin"
            aria-label="My LinkedIn"
            className="mx-1 h-4 w-4"
          />
        </div>
        <ActionButton
          text={usage === "live" ?
            (language === "en" ? "Download PDF" : "下载PDF")
            :
            (language === "en" ? "View Online" : "在线查看")}
          usage={usage}
          className={cn(usage === "live" && "hidden sm:block")}
          title={
            usage === "live"
              ? language === "en"
                ? "Recommended to use Chrome to print PDF for best pagination and link support"
                : "建议使用 Chrome 浏览器打印 PDF，分页和链接效果最佳"
              : undefined
          }
        />
      </div>

      {usage === "live" && <Link
            href="mailto:shyu0@qq.com"
            className="group flex gap-2 items-center text-mygray-400 transition hover:text-mygray-700 dark:text-mygray-400 dark:hover:text-mygray-200"
          >
            <Icons.Mail size={12} className="group-hover:animate-shake" />
            shyu0@qq.com
          </Link> }
    </section>
  );
}
