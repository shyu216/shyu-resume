export interface Education {
  id: string;
  degree: string;
  withDistinction?: boolean;
  institution: string;
  institutionLink?: string;
  institutionImage?: string;
  dateRange: string;
  gpa?: string;
  honors?: string[];
}
