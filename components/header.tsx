"use client";

// The header of the webpage, not in PDF

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import ActionButton from "@/components/ui/action-button";
import React from "react";
import Image from "next/image";
import { Container } from "./ui/container";
import { HoverLink } from "./ui/tooltip";
import { LanguageSwitcher } from "./lang/language-switcher";
import { JobSwitcherWrapper } from "./job/job-switcher-wrapper";
import { LanguageContext } from "./lang/language-provider";
import { useJobType } from "./job/job-type-provider";
import { getColor, getFont, siteConfig } from "@/content/config";
import { useTheme } from "next-themes";
export function Header() {
  // Extract GitHub username from the GitHub URL
  const githubUsername = siteConfig.personal.contact.github.split('/').pop();
  const { language } = React.useContext(LanguageContext);
  const { jobType } = useJobType();
  const { resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const headerColor = getColor(jobType, language)[resolvedTheme === "dark" ? "dark" : "light"];
  const fontStack = getFont(jobType, language).fontStack.join(", ");

  React.useEffect(() => {
    document.documentElement.style.setProperty("--header-color", headerColor);
  }, [headerColor]);

  return (
    <header className="sticky top-0 z-50">
      <Container
        className="py-3"
        style={{
          fontFamily: fontStack,
          "--font-family": fontStack,
          "--header-color": headerColor,
        } as React.CSSProperties}
      >
        <div
          className={`mx-1 my-1 p-1 rounded-xl transition-all duration-300 ${
            isScrolled
              ? "border backdrop-blur-sm"
              : "border border-transparent bg-transparent"
          }`}
          style={
            isScrolled
              ? {
                  borderColor: "color-mix(in srgb, var(--color-border-default) 55%, transparent)",
                  backgroundColor: "color-mix(in srgb, var(--color-card-default) 50%, transparent)",
                  boxShadow: "var(--shadow-soft)",
                }
              : undefined
          }
        >
          <nav className="flex flex-col xl:flex-row justify-between items-center gap-4">
            <div>
              <HoverLink href="/">
                <Image
                  src={`https://github.com/${githubUsername}.png`}
                  alt="Portrait"
                  width={48}
                  height={48}
                  className="w-10 h-10 rounded-full ring-2 ring-stone-200 dark:ring-stone-300/40"
                />
              </HoverLink>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="hidden lg:flex items-center gap-3">
                <JobSwitcherWrapper />
                <LanguageSwitcher />
                <ThemeSwitcher />
                <ActionButton usage="live" />
              </div>

              <div className="flex lg:hidden flex-col items-center gap-2 w-full">
                <div className="flex items-center justify-center w-full">
                  <JobSwitcherWrapper />
                </div>
                <div className="flex items-center justify-center gap-2 w-full">
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                </div>
                <div className="flex items-center justify-center w-full">
                  <ActionButton usage="live" />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
