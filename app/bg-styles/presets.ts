export type MotionPreset = {
  yOffset: number;
  damping: number;
  stiffness: number;
  duration: number;
  delayMultiplier: number;
};

export type BgStylePreset = {
  id: string;
  motion: MotionPreset;
};

export const BG_STYLE_PRESETS: readonly BgStylePreset[] = [
  {
    id: "default-grid",
    motion: {
      yOffset: 24,
      damping: 26,
      stiffness: 108,
      duration: 0.34,
      delayMultiplier: 1,
    },
  },
  {
    id: "triangle-prism",
    motion: {
      yOffset: 34,
      damping: 23,
      stiffness: 96,
      duration: 0.4,
      delayMultiplier: 1.08,
    },
  },
  {
    id: "light-beams",
    motion: {
      yOffset: 30,
      damping: 24,
      stiffness: 94,
      duration: 0.38,
      delayMultiplier: 1.04,
    },
  },
] as const;

export function pickRandomBgStyle(): BgStylePreset {
  const index = Math.floor(Math.random() * BG_STYLE_PRESETS.length);
  return BG_STYLE_PRESETS[index];
}

export function pickDifferentBgStyle(currentId?: string): BgStylePreset {
  if (!currentId) {
    return pickRandomBgStyle();
  }

  const candidates = BG_STYLE_PRESETS.filter((item) => item.id !== currentId);
  if (candidates.length === 0) {
    return BG_STYLE_PRESETS[0];
  }

  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}
