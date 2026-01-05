"use client";

import { Icons } from "@/components/ui/icons";
import { SocialLink } from "@/components/ui/social-link";
import Link from "next/link";
import ActionButton from "@/components/ui/action-button";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { motion } from "framer-motion";

type Props = {
  usage: "live" | "pdf";
};

export default function HeaderSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);

  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4 my-1">
            {language === "en" ? (
              <div>
                Sihong{" "}<span className="text-rose-600">Yu</span>
                <span className="text-xs text-stone-600 ml-2">
                  (Dale / 余思宏)
                </span>
              </div>
            ) : (
              <div>
                <span className="text-rose-600">余</span>
                思宏
                <span className="text-xs text-stone-600 ml-2">
                  (微信：seinbaulio)
                </span>
              </div>
            )}
          </h2>
          {usage != "live" && (
            <SocialLink
              href="mailto:shyu0@qq.com"
              platform="mail"
              aria-label="My Email"
              className="mx-1 h-4 w-4"
            />
          )}
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
          text={
            usage === "live"
              ? language === "en"
                ? "Save PDF"
                : language === "zh"
                ? "保存PDF"
                : "儲存PDF"
              : language === "en"
              ? "Open"
              : language === "zh"
              ? "前往"
              : "打開"
          }
          usage={usage}
          className={cn("bg-stone-800", usage === "live" && "hidden sm:block")}
          // 没必要
          // title={
          //   usage === "live"
          //     ? (language === "en"
          //         ? "Recommended to use Chrome to print PDF for best pagination and link support"
          //         : language === "zh"
          //         ? "建议使用 Chrome 浏览器打印 PDF，分页和链接效果最佳"
          //         : "建議使用 Chrome 瀏覽器列印 PDF，分頁和連結效果最佳")
          //     : undefined
          // }
        />
      </div>

      {usage === "live" && (
        <Link
          href="mailto:shyu0@qq.com"
          className="group inline-flex gap-2 items-center text-stone-600 transition hover:text-stone-900 dark:hover:text-stone-300"
        >
          <Icons.Mail size={12} className="group-hover:animate-shake" />
          shyu0@qq.com
        </Link>
      )}
    </section>
  );
}
