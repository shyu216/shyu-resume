import { type Education } from "@/types/education";

export const education: Education[] = [
  {
    id: "unimelb-msc",
    degree: "计算机科学 硕士（优异）",
    institution: "墨尔本大学",
    institutionLink: "https://www.unimelb.edu.au",
    institutionImage: "./images/unimelb.png",
    dateRange: "2024年2月 - 2025年12月",
    gpa: "WAM: 81.938/100",
    honors: [],
  },
  {
    id: "cuhk-bsc",
    degree: "计算机科学 本科",
    institution: "香港中文大学",
    institutionLink: "https://www.cuhk.edu.hk",
    institutionImage: "./images/cuhk.png",
    dateRange: "2019年9月 - 2023年7月",
    gpa: "MGPA: 3.364/4.0",
    honors: ["入学奖学金", "院长名单 2022-23", "ELITE 精英班"],
  },
];
