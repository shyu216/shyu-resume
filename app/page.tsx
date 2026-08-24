import React from "react";
import { FullResume } from "@/components/section/full-resume";
import { PDFResumeContainer } from "@/components/print-provider";

export default function CVPage() {
  return (
    <>
      <div className="hidden">
        <PDFResumeContainer>
          <FullResume usage="pdf" />
        </PDFResumeContainer>
      </div>
      <div className="pdf-resume-theme" data-pdf-style="cards">
        <FullResume usage="live" />
      </div>
    </>
  );
}
