// The header of the webpage, not in PDF

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import React from "react";
import Image from "next/image";
import { Container } from "./ui/container";
import Link from "next/link";
import { LanguageSwitcher } from "./lang/language-switcher";

export function Header() {
  return (
    <Container className="mt-5 mb-10">
      <nav className="relative flex justify-between items-center">
        <div>
          <Link href="/">
            <Image
              src="https://github.com/shyu216.png"
              alt="Portrait"
              width={48}
              height={48}
              className="w-10 h-10 rounded-full ring-2 ring-stone-200 dark:ring-stone-300/40"
            />
          </Link>
        </div>
        <div className="relative flex">
          <div className="pointer-events-auto mr-4">
            <LanguageSwitcher />
          </div>
          <div className="pointer-events-auto">
            <ThemeSwitcher />
          </div>
        </div>


      </nav>
    </Container>
  );
}
