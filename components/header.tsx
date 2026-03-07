// The header of the webpage, not in PDF

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import React from "react";
import Image from "next/image";
import { Container } from "./ui/container";
import Link from "next/link";
import { LanguageSwitcher } from "./lang/language-switcher";
import { JobSwitcherWrapper } from "./job/job-switcher-wrapper";
import { siteConfig } from "@/content/config";

export function Header() {
  // Extract GitHub username from the GitHub URL
  const githubUsername = siteConfig.personal.contact.github.split('/').pop();
  
  return (
    <Container className="mt-5 mb-10">
      <nav className="relative flex flex-col sm:flex-row justify-between items-center gap-4">
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
        <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="pointer-events-auto w-full sm:w-auto flex justify-center sm:justify-start">
            <JobSwitcherWrapper />
          </div>
          <div className="pointer-events-auto flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-start">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </Container>
  );
}
