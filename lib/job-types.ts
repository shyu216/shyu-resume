// Job Types - Centralized type definitions for job-related components

export const jobOptions = [
  { value: 'PERFORMER', label: '表演', tooltipZh: '戏曲表演家 — 舞台演出与唱腔', tooltipJa: '戏曲俳優 — 舞台演技と歌唱', tooltipFr: 'Artiste d\'opéra — Performance scénique' },
  { value: 'COMPOSER', label: '创作', tooltipZh: '剧作家 — 剧本与音乐创作', tooltipJa: '劇作家 — 脚本と音楽創作', tooltipFr: 'Dramaturge — Écriture et composition' },
  { value: 'DIRECTOR', label: '管理', tooltipZh: '云翰社当家 — 剧团管理与传承', tooltipJa: '雲翰社当主 — 劇団運営と伝承', tooltipFr: 'Directrice — Gestion et transmission' },
] as const;

export type JobType = typeof jobOptions[number]['value'] | 'NONE';

export interface JobSwitcherProps {
  jobType: JobType;
  onJobTypeChange: (jobType: JobType) => void;
}
