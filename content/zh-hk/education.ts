import { type Education } from "@/types/education";

	export const education: Education[] = [
	{
		id: "unimelb-msc",
		degree: "計算機科學碩士（優異）",
		institution: "墨爾本大學",
		institutionLink: "https://www.unimelb.edu.au",
		institutionImage: "./images/unimelb.png",
		dateRange: "2024年2月 - 2025年12月",
		gpa: "WAM：81.938/100",
		honors: [],
	},
	{
		id: "cuhk-bsc",
		degree: "計算機科學學士",
		institution: "香港中文大學",
		institutionLink: "https://www.cuhk.edu.hk",
		institutionImage: "./images/cuhk.png",
		dateRange: "2019年9月 - 2023年7月",
		gpa: "MGPA：3.364/4.0",
		honors: [
			"入學獎學金",
			"院長名單 2022-23",
			"ELITE 精英班",
		],
	},
];
