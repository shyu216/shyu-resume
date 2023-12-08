import React from "react";
import {
  Sun,
  MoonStar,
  Zap,
  Github,
  Youtube,
  Mail,
  Linkedin,
  Briefcase,
  School2,
  ExternalLink,
  PhoneCall,
  Layers,
  FileBadge,
  Star,
  Users,
  Link,
  Bot,
  GraduationCap,
  Code,
  School,
  Building2,
  LayoutTemplate,
  Smartphone
} from "lucide-react";

import type { LucideProps, LucideIcon } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  Sun: Sun,
  Moon: MoonStar,
  Lightning: Zap,
  Github: Github,
  Youtube: Youtube,
  Mail: Mail,
  Linkedin: Linkedin,
  Briefcase: Briefcase,
  School: School2,
  OpenLink: ExternalLink,
  PhoneCall: PhoneCall,
  Stack: Layers,
  FileBadge: FileBadge,
  Star: Star,
  Users: Users,
  Link: Link,
  Bot: Bot,
  GraduationCap: GraduationCap,
  Code:Code,
  School2:School,
  Building:Building2,
  LayoutTemplate:LayoutTemplate,
  SmartPhone:Smartphone
} as const;
