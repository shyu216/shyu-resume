import React from "react";

export default function Label({ content }: { content: React.ReactNode }) {
  return <div className="font-bold text-red dark:text-white">{content}</div>;
}