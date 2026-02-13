import { type Icon } from "@/components/ui/icons";

export interface Project {
  id: string;
  name: string;
  subtitle?: string;
  subtitleIcon?: Icon;
  link: string;
  dateRange: string;
  techStack: string;
  bullets: string[];
  rank: 1 | 2 | 3;
}
