import { type Education } from "@/types/education";

export const education: Education[] = [
  {
    id: "yunhan-training",
    degree: "戏曲表演 传承弟子",
    institution: "云翰社传统戏曲传承班",
    institutionLink: "https://www.yunhanshe.liyue",
    institutionImage: "./images/liyue.png",
    dateRange: "2010年 - 2016年",
    gpa: "师承：云翰社多位资深艺术家",
    honors: ["优秀传承弟子", "最佳新秀奖", "唱腔金奖"],
  },
  {
    id: "liyue-academy",
    degree: "传统艺术 进修",
    institution: "璃月艺术学院",
    institutionLink: "https://www.liyueart.edu",
    institutionImage: "./images/liyue2.png",
    dateRange: "2008年 - 2010年",
    gpa: "主修：戏曲表演、剧本创作",
    honors: ["院长奖学金", "优秀毕业生"],
  },
];
