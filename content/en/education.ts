import { type Education } from "@/types/education";

export const education: Education[] = [
  {
    id: "unimelb-msc",
    degree: "MSc. Computer Science (with Distinction)",
    institution: "The University of Melbourne",
    institutionLink: "https://www.unimelb.edu.au",
    institutionImage: "./images/unimelb.png",
  dateRange: "Feb 2024 - Dec 2025",
  gpa: "WAM: 81.938/100",
    honors: [],
  },
  {
    id: "cuhk-bsc",
    degree: "BSc. Computer Science",
    institution: "The Chinese University of Hong Kong",
    institutionLink: "https://www.cuhk.edu.hk",
    institutionImage: "./images/cuhk.png",
  dateRange: "Sep 2019 - Jul 2023",
  gpa: "MGPA: 3.364/4.0",
    honors: [
      "Honours at Entrance",
      "Dean's List, 2022-2023",
      "ELITE Stream",
    ],
  },
];
