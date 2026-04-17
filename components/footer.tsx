// The footer of the webpage, not in PDF

"use client";

import { ContainerInner, ContainerOuter } from "@/components/ui/container";
import lastUpdateData from "@/app/last-update.json";
import buildInfo from "@/app/build-info.json";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import { siteConfig, formatFooterLastUpdated } from "@/content/config";
import { copy } from "@/content/copy";

export function Footer() {
  const { language } = useContext(LanguageContext);
  const { shortName } = siteConfig.personal;
  const uiCopy = copy[language];
  const lastUpdateText = lastUpdateData?.lastUpdate ? formatFooterLastUpdated(language, lastUpdateData.lastUpdate) : "";

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
                {lastUpdateText && <> | {uiCopy.footer.lastUpdatedLabel}{lastUpdateText} </>}
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
