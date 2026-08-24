// LabelWithGraphic Component - Server Component
// Displays content with optional icon or image

import { type Icon } from "@/components/ui/icons";
import Image, { type ImageProps } from "next/image";
import React from "react";

interface LabelWithGraphicProps {
  icon?: Icon;
  image?: ImageProps["src"];
  content: React.ReactNode;
  usage?: "live" | "pdf";
}

export default function LabelWithGraphic({
  icon: Icon,
  image,
  content,
  usage = "live",
}: LabelWithGraphicProps) {
  const iconSize = usage === "live" ? 14 : 11;
  const imageClass = usage === "live" ? "h-3.5 w-3.5" : "h-[11px] w-[11px]";

  return (
    <div className="flex items-center gap-1.5">
      {Icon && <Icon size={iconSize} />}
      {image && <Image src={image} alt="" height={20} width={20} className={`${imageClass} rounded-full`} priority unoptimized />}
      {content}
    </div>
  );
}
