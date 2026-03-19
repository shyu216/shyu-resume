// LabelWithLink Component - Server Component
// Renders a label with a link and hover effects

import { Icons } from "@/components/ui/icons";
import React from "react";
import Link from "next/link";

interface LabelWithLinkProps {
  content: React.ReactNode;
  link: string;
  usage?: "live" | "pdf";
}

export default function LabelWithLink({ content, link }: LabelWithLinkProps) {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex items-center gap-x-1 group"
      style={{ color: 'var(--color-text-primary)' }}
    >
      {content}
      <Icons.Link
        size={11}
        className="transition group-hover:animate-shake"
        style={{ color: 'var(--color-text-primary)' }}
      />
    </Link>
  );
}
