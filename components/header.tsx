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

export function Header() {
  return (
    <Container className="mt-5 mb-10">
      <nav className="relative flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <Link href="/">
            <Image
              src="/images/yunjin.png"
              alt="云堇"
              width={48}
              height={48}
              className="w-10 h-10 rounded-full ring-2 ring-stone-200 dark:ring-stone-300/40"
            />
          </Link>
        </div>
        <div className="relative flex flex-col md:flex-row items-center gap-4">
          <div className="pointer-events-auto flex justify-center">
            <JobSwitcherWrapper />
          </div>
          <div className="pointer-events-auto flex items-center space-x-2 justify-center">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          <div className="pointer-events-auto flex items-center space-x-2 justify-center">
            <FontSwitcher />
            <ColorSwitcher />
          </div>
        </div>
      </nav>
    </Container>
  );
}
