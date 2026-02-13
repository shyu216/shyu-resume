import { type Education } from "@/types/education";

export const education: Education[] = [
	{
		id: "unimelb-msc",
		degree: "計算機科學碩士",
		withDistinction: true,
		institution: "墨爾本大學",
		institutionLink: "https://www.unimelb.edu.au",
		institutionImage: "./images/unimelb.png",
		dateRange: { start: "2024年2月", end: "2025年12月" },
		gpa: { value: 81.938, scale: 100, label: "WAM" },
		honors: [],
	},
	{
		id: "cuhk-bsc",
		degree: "計算機科學學士",
		institution: "香港中文大學",
		institutionLink: "https://www.cuhk.edu.hk",
		institutionImage: "./images/cuhk.png",
		dateRange: { start: "2019年9月", end: "2023年7月" },
		gpa: { value: 3.364, scale: 4.0, label: "MGPA" },
		honors: [
			"入學獎學金",
			"2022-2023年度院長名單",
			"精英班",
		],
	},
];
