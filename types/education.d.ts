export interface Education {
  id: string;
  degree: string;
  withDistinction?: boolean;
  institution: string;
  institutionLink?: string;
  institutionImage?: string;
  dateRange: { start: string; end: string };
  gpa?: { value: number; scale: 100 | 4.0; label: string };
  honors?: string[];
}
