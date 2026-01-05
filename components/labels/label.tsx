// The main keyword of section components

import React from "react";

export default function Label({ content }: { content: React.ReactNode }) {
  return (
    <div className="font-bold text-stone-900 dark:text-stone-100">
      {content}
    </div>
  );
}
