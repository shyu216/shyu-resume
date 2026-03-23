// The footer of the webpage, not in PDF

"use client";

import Link from "next/link";
import { ContainerInner, ContainerOuter } from "@/components/ui/container";
import lastUpdateData from "@/app/last-update.json";
import buildInfo from "@/app/build-info.json";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { siteConfig } from "@/content/config";

export function Footer() {
  const { language } = useContext(LanguageContext);
  const { shortName } = siteConfig.personal;
  
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
        zh: {
          label: "最近更新：",
          format: (d: Date) => `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
        },
        ja: {
          label: "最終更新：",
          format: (d: Date) => `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
        },
        fr: {
          label: "Dernière mise à jour : ",
          format: (d: Date) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
        }
      };
      
      lastUpdateLabel = dateFormatMap[language].label;
      lastUpdateDate = dateFormatMap[language].format(date);
    }
  }

  // 版本信息
  const versionText = buildInfo?.version ? `v${buildInfo.version}` : "";

  return (
    <footer className="mt-12 flex-none">
      <ContainerOuter>
        <div className="border-t border-stone-500/50 pb-10 pt-10 ">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} {shortName[language as keyof typeof shortName]}
                {lastUpdateData?.lastUpdate && (
                  <> | {lastUpdateLabel}{lastUpdateDate} </>
                )}
                {versionText && (
                  <> | {versionText}</>
                )}
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
