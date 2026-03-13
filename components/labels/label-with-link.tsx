// For labels with links, can be universities, companies, projects, etc.

import { Icons } from "@/components/ui/icons";
import React from "react";
import Link from "next/link";
import { useTextColor } from "@/lib/theme-utils";

type TitleProps = {
  content: React.ReactNode;
  link: string;
  usage?: "live" | "pdf";
};

export default function Title({ content, link, usage = "live" }: TitleProps) {
  const textSecondary = useTextColor(usage);
  const textPrimary = useTextColor(usage);
  
  return (
    <Link
      href={link}
      target="_blank"
      className="flex items-center gap-x-1 group"
      style={{ color: textSecondary }}
      onMouseEnter={(e) => e.currentTarget.style.color = textPrimary}
      onMouseLeave={(e) => e.currentTarget.style.color = textSecondary}
    >
      {content}
      <Icons.Link
        size={11}
        className="transition group-hover:animate-shake"
        style={{ color: textSecondary }}
      />
    </Link>
  );
}
