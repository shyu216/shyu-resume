// The footer of the webpage, not in PDF

"use client";

import Link from "next/link";
import { ContainerInner, ContainerOuter } from "@/components/ui/container";
import lastUpdateData from "@/app/last-update.json";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";

export function Footer() {
  const { language } = useContext(LanguageContext);
  
  const nameMap = {
    en: "Dale",
    zh: "余",
    "zh-hk": "余",
  };
  
  let lastUpdateLabel = "";
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
      const dateFormatMap = {
        en: {
          label: "Last updated: ",
          format: (d: Date) => {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
          }
        },
        zh: {
          label: "最近更新：",
          format: (d: Date) => `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
        },
        "zh-hk": {
          label: "最後更新：",
          format: (d: Date) => `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
        }
      };
      
      lastUpdateLabel = dateFormatMap[language].label;
      lastUpdateDate = dateFormatMap[language].format(date);
    }
  }

  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-stone-500/50 pb-16 pt-10 ">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} {nameMap[language]}
                {lastUpdateData?.lastUpdate && (
                  <> | {lastUpdateLabel}{lastUpdateDate} </>
                )}
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
