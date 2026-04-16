"use client";

// The header of the webpage, not in PDF

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import React from "react";
import Image from "next/image";
import { Container } from "./ui/container";
import Link from "next/link";
import { LanguageSwitcher } from "./lang/language-switcher";
import { JobSwitcherWrapper } from "./job/job-switcher-wrapper";
import { FontSwitcher } from "./font/font-switcher";
import { ColorSwitcher } from "./color/color-switcher";
import { siteConfig } from "@/content/config";
import { SummaryEditButton } from "./summary/summary-edit-button";
import { SummaryBubbles } from "./summary/summary-bubbles";
import { useJobType } from "./job/job-type-provider";
import { useContext } from "react";
import { LanguageContext } from "./lang/language-provider";

interface HeaderProps {
  isEditingSummary?: boolean;
  onToggleEditSummary?: () => void;
  onSaveSummary?: () => void;
  onCancelEditSummary?: () => void;
  onSelectHistorySummary?: (content: string) => void;
  currentSummaryContent?: string;
}

export function Header({
  isEditingSummary = false,
  onToggleEditSummary,
  onSaveSummary,
  onCancelEditSummary,
  onSelectHistorySummary,
  currentSummaryContent = "",
}: HeaderProps) {
  // Extract GitHub username from the GitHub URL
  const githubUsername = siteConfig.personal.contact.github.split('/').pop();
  const { jobType } = useJobType();
  const { language } = useContext(LanguageContext);
  const controls = siteConfig.ui.controls;

  const handleSelectSummary = (content: string) => {
    onSelectHistorySummary?.(content);
  };

  return (
    <>
      <Container className="mt-5">
        <nav className="flex flex-col xl:flex-row justify-between items-center gap-4">
          <div>
            <Link href="/">
              <Image
                src={`https://github.com/${githubUsername}.png`}
                alt="Portrait"
                width={48}
                height={48}
                className="w-10 h-10 rounded-full ring-2 ring-stone-200 dark:ring-stone-300/40"
              />
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="flex  gap-x-2 justify-between items-center">
              <JobSwitcherWrapper /> {/* Summary 编辑按钮 */}{controls.summaryEdit && onToggleEditSummary && (
                <div className="flex items-center justify-center">
                  <SummaryEditButton
                    isEditing={isEditingSummary}
                    onToggleEdit={onToggleEditSummary}
                    onSave={onSaveSummary}
                    onCancel={onCancelEditSummary}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex gap-x-2 justify-between items-center ">
                {controls.fontSwitcher && <FontSwitcher />}
                {controls.colorSwitcher && <ColorSwitcher />}
              </div>
              <div className="flex gap-x-2 justify-between items-center">
                <LanguageSwitcher /><ThemeSwitcher />
              </div>
            </div>
          </div>
        </nav>
      </Container>

      {/* 浮动历史记录小球 - 仅在编辑时显示 */}
      {controls.summaryEdit && (
        <SummaryBubbles
          isOpen={isEditingSummary}
          onClose={() => { }}
          jobType={jobType}
          language={language}
          onSelectSummary={handleSelectSummary}
          currentContent={currentSummaryContent}
        />
      )}
    </>
  );
}
