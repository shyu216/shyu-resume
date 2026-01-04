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
        className="text-mygray-400 transition group-hover:text-mygray-700 dark:text-mygray-400 dark:group-hover:text-mygray-200 group-hover:animate-shake"
      />
    </Link>
  );
}