// For labels with links, can be universities, companies, projects, etc.

import { Icons } from "@/components/ui/icons";
import React from "react";
import Link from "next/link";

type TitleProps = {
  content: React.ReactNode;
  link: string;
};

export default function Title({ content, link }: TitleProps) {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex items-center gap-x-1 group"
    >
      {content}
      <Icons.Link
        size={11}
        className="text-stone-600 transition group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:animate-shake"
      />
    </Link>
  );
}
