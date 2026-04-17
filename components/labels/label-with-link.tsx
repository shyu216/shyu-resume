"use client";

// LabelWithLink Component - Server Component
// Renders a label with a link and hover effects

import { Icons } from "@/components/ui/icons";
import React from "react";
import { HoverLink } from "@/components/ui/tooltip";

interface LabelWithLinkProps {
  content: React.ReactNode;
  link: string;
  usage?: "live" | "pdf";
}

export default function LabelWithLink({ content, link }: LabelWithLinkProps) {
  return (
    <HoverLink
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-x-1 group"
      style={{ color: "var(--color-text-primary)" }}
      tooltipSide="bottom"
    >
      {content}
      <Icons.Link
        size={11}
        className="transition group-hover:animate-shake"
        style={{ color: "var(--color-text-primary)" }}
      />
    </HoverLink>
  );
}
