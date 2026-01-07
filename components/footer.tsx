// The footer of the webpage, not in PDF

"use client";

import Link from "next/link";
import { ContainerInner, ContainerOuter } from "@/components/ui/container";
import lastUpdateData from "@/app/last-update.json";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";

export function Footer() {
  const { language } = useContext(LanguageContext);
  let lastUpdateLabel = "Last update:";
  let lastUpdateDate = "";
  if (lastUpdateData?.lastUpdate) {
    let date = new Date(lastUpdateData.lastUpdate);
    // iOS/iPad 浏览器兼容处理
    if (isNaN(date.getTime())) {
      // 尝试将空格和 + 时区替换为 ISO 格式
      const isoDateStr = lastUpdateData.lastUpdate.replace(" ", "T").replace(/\s\+\d{4}/, "Z");
      date = new Date(isoDateStr);
    }
    if (!isNaN(date.getTime())) {
      if (language === "en") {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        lastUpdateDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      } else if (language === "zh") {
        lastUpdateLabel = "最后更新：";
        lastUpdateDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      } else if (language === "zh-hk") {
        lastUpdateLabel = "最後更新：";
        lastUpdateDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      }
    }
  }

  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-stone-500/50 pb-16 pt-10 ">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} {language === "en" ? "Dale" : "余"}
                {lastUpdateData?.lastUpdate && (
                  <> | {lastUpdateLabel} {lastUpdateDate} </>
                )}
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
