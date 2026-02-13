import { type Education } from "@/types/education";

export const education: Education[] = [
  {
    id: "unimelb-msc",
    degree: "MSc. Computer Science",
    withDistinction: true,
    institution: "The University of Melbourne",
    institutionLink: "https://www.unimelb.edu.au",
    institutionImage: "./images/unimelb.png",
    dateRange: { start: "Feb 2024", end: "Dec 2025" },
    gpa: { value: 81.938, scale: 100, label: "WAM" },
    honors: [],
  },
  {
    id: "cuhk-bsc",
    degree: "BSc. Computer Science",
    institution: "The Chinese University of Hong Kong",
    institutionLink: "https://www.cuhk.edu.hk",
    institutionImage: "./images/cuhk.png",
    dateRange: { start: "Sep 2019", end: "Jul 2023" },
    gpa: { value: 3.364, scale: 4.0, label: "MGPA" },
    honors: [
      "Honours at Entrance",
      "Dean's List, 2022-2023",
      "ELITE Stream",
    ],
  },
];
