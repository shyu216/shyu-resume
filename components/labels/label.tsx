// Label Component - Server Component
// Uses CSS variables for theme support

import React from "react";

interface LabelProps {
  content: React.ReactNode;
  usage?: "live" | "pdf";
}

export default function Label({ content }: LabelProps) {
  return (
    <div className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
      {content}
    </div>
  );
}
