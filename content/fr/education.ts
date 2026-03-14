import { type Education } from "@/types/education";

export const education: Education[] = [
  {
    id: "yunhan-training",
    degree: "Disciple de Transmission de Performance d'Opéra (戏曲表演)",
    institution: "Classe de Transmission de l'Opéra Traditionnel de la Troupe Yunhan (云翰社)",
    institutionLink: "https://www.yunhanshe.liyue",
    institutionImage: "./images/liyue.png",
    dateRange: "2010 - 2016",
    gpa: "Mentors: Plusieurs artistes vétérans de la Troupe Yunhan (云翰社)",
    honors: ["Disciple de Transmission Exceptionnelle", "Prix du Meilleur Nouveau Talent", "Prix d'Or du Chant (唱腔金奖)"],
  },
  {
    id: "liyue-academy",
    degree: "Études Avancées en Arts Traditionnels (传统艺术)",
    institution: "Académie des Arts de Liyue",
    institutionLink: "https://www.liyueart.edu",
    institutionImage: "./images/liyue2.png",
    dateRange: "2008 - 2010",
    gpa: "Majeure: Performance d'opéra (戏曲表演), Écriture de scénarios",
    honors: ["Bourse du Doyen", "Diplômée Exceptionnelle"],
  },
];
