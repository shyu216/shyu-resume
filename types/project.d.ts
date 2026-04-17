import { type Icon } from "@/components/ui/icons";
import type { ExperienceJobType } from "@/content/config";

export interface Project {
  id: string;
  name: string;
  subtitle?: string;
  subtitleIcon?: Icon;
  link: string;
  dateRange: string;
  techStack: string;
  bullets: string[];
  jobTypes: ExperienceJobType[];
}
