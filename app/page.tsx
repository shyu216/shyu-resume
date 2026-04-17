import React from "react";
import { FullResume } from "@/components/section/full-resume";
import { PDFResumeContainer } from "@/components/print-provider";
import { PdfStyleThemeWrapper } from "@/components/pdf-style-theme-wrapper";

export default function CVPage() {
  return (
    <>
      <div className="hidden">
        <PDFResumeContainer>
          <FullResume usage="pdf" />
        </PDFResumeContainer>
      </div>
      <PdfStyleThemeWrapper>
        <FullResume usage="live" />
      </PdfStyleThemeWrapper>
    </>
  );
}
