import type { PdfStyleId } from "@/content/config";

export type PdfStylePreset = {
  id: PdfStyleId;
  fontScale: number;
  sectionGap: string;
};

export const PDF_STYLE_PRESETS: readonly PdfStylePreset[] = [
  {
    id: "accent",
    fontScale: 1.02,
    sectionGap: "0.72rem",
  },
  {
    id: "cards",
    fontScale: 1,
    sectionGap: "0.62rem",
  },
  {
    id: "blueprint",
    fontScale: 0.97,
    sectionGap: "0.52rem",
  },
  {
    id: "editorial",
    fontScale: 1.02,
    sectionGap: "0.78rem",
  },
  {
    id: "ribbon",
    fontScale: 1,
    sectionGap: "0.48rem",
  },
] as const;

export function pickRandomPdfStyle(): PdfStylePreset {
  const index = Math.floor(Math.random() * PDF_STYLE_PRESETS.length);
  return PDF_STYLE_PRESETS[index];
}

export function pickDifferentPdfStyle(currentId?: string): PdfStylePreset {
  if (!currentId) {
    return pickRandomPdfStyle();
  }

  const candidates = PDF_STYLE_PRESETS.filter((item) => item.id !== currentId);
  if (candidates.length === 0) {
    return PDF_STYLE_PRESETS[0];
  }

  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}

export function getPdfStylePreset(styleId: PdfStyleId): PdfStylePreset {
  const matched = PDF_STYLE_PRESETS.find((item) => item.id === styleId);
  return matched ?? PDF_STYLE_PRESETS[0];
}
