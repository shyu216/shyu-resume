// The main keyword of section components

import React from "react";
import { useTextColor } from "@/lib/theme-utils";

export default function Label({ content, usage = "live" }: { content: React.ReactNode; usage?: "live" | "pdf" }) {
  const textPrimary = useTextColor(usage);
  return (
    <div className="font-bold" style={{ color: textPrimary }}>
      {content}
    </div>
  );
}
