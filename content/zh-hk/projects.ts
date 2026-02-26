import { Icons } from "@/components/ui/icons";
import { type Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "biovis",
    name: "BioVis",
    subtitle: "MR 生理信號監測 · 研究項目",
    subtitleIcon: Icons.GraduationCap,
    link: "https://youtu.be/zOPQXXpSRbg",
    dateRange: "2025年5月 - 2025年11月",
    techStack: "Unity, Meta Quest 3, C#",
    bullets: [
    "協助導師完成 Siggraph Asia XR 論文投稿（第二作者），負責 MR 生理信號檢測軟件原型開發",
    "獨立開發 6 場景、40+ 腳本的 Unity 專案，完成 3D 資源整合與 UI 搭建",
    "基於 ComputeShader 實現圖像處理並行加速，複現 EVM 算法，完成 Quest 3 實時 MR 原型部署",
    "評估 ONNX、Sentis 模型量化與推理方案，在 Quest 3 完成 YOLO v11 nano 實時推理測試與對比",
    "複現多款 rPPG 算法並在多數據集完成性能驗證，實現從學術評估到端側實時部署"
    ],
    rank: 1,
  },
  {
    id: "shyu-resume",
    name: "ShYu Resume",
    subtitle: "個人履歷 · 開源項目",
    subtitleIcon: Icons.Github,
    link: "https://github.com/shyu216/shyu-resume",
    dateRange: "2024年8月 - 進行中",
    techStack: "Next.js, Tailwind",
    bullets: [
	  "開發基於 Next.js 的 i18n 履歷生成器，支援中/英/港三語切換及 A4 PDF 導出（含超連結）",
	  "部署於 GitHub Pages，提供一鍵保存/列印入口"
    ],
    rank: 1,
  },
  {
    id: "carbon-2-garden",
    name: "Carbon 2 Garden",
    subtitle: "傳感器互動應用 · COMP90018",
    subtitleIcon: Icons.LayoutTemplate,
    link: "https://github.com/CRUVOD/CarbonTracker",
    dateRange: "2024年8月 - 2024年11月",
    techStack: "React Native, Firebase",
    bullets: [
    "開發 React Native 環保習慣 App，實現任務系統、排行榜、運動提醒",
    "集成陀螺儀傳感器與 Google Maps API，完成“久坐提醒 + 公園推薦”互動挑戰原型",
    "負責路由設計及專案骨架，完成 APK 打包發布"
    ],
    rank: 1,
  },
  {
    id: "poetry-card",
    name: "詩詞小卡片",
    subtitle: "本地數據庫 · 開源項目",
    subtitleIcon: Icons.PackageOpen,
    link: "https://github.com/shyu216/ccpoems",
    dateRange: "2023年12月 - 2024年2月",
    techStack: "React Native, SQLite",
    bullets: [
	  "使用 React Native + SQLite 開發古詩詞 App，實現本地 CRUD、隨機抽取、歷史記錄",
	  "完成 Android APK 打包發布，為後續 React Native 專案累積工程經驗"
    ],
    rank: 2,
  },
  {
    id: "3d-object-detection",
    name: "三維目標檢測",
    subtitle: "點雲 · 本科畢業設計",
    subtitleIcon: Icons.GraduationCap,
    link: "https://github.com/shyu216/DPC",
    dateRange: "2022年8月 - 2023年7月",
    techStack: "Python, PyTorch, Open3D",
    bullets: [
    "基於 OpenPCDet 複現 3D 目標檢測，在 KITTI 數據集生成車輛/行人/自行車檢測框",
    "使用 SLURM 集群訓練模型，透過 Open3D 完成點雲視覺化與實驗分析",
    "獨立完成本科畢業論文，系統整理檢測方法與實驗數據"
    ],
    rank: 1,
  },
  {
    id: "easy-draw-guess",
    name: "你畫我猜小遊戲",
    subtitle: "CSCI3100大作業",
  subtitleIcon: Icons.BookOpen,
    link: "https://github.com/easyDG",
  dateRange: "2022年1月 - 2022年5月",
  techStack: "MySQL, ExpressJS, NodeJS, Socket.IO",
    bullets: [
    "基於 MySQL 實現遊戲帳號管理，利用 Socket.IO 實現跨設備游標追蹤與即時聊天",
    "部署於 AWS EC2，支援多設備流暢演示"
    ],
    rank: 3,
  },
  {
    id: "course-algorithm-practice",
    name: "大數據與機器學習算法實踐",
    subtitle: "工程落地 · 多課程綜合",
    subtitleIcon: Icons.Code,
    link: "https://shyu216.github.io/knownoevil/study/",
    dateRange: "2021年9月 - 2024年5月",
    techStack: "MySQL, PostGIS, Hadoop/MapReduce, Python",
    bullets: [
      "IERG4300（大數據分析）：基於 Hadoop/MapReduce 設計分布式算法，實現並行 Dijkstra、PageRank、K-Means，優化大數據處理流程",
      "CSCI3170（數據庫）：設計 5 張帶主鍵/外鍵的關聯表，撰寫 8 個高複雜度 SQL 查詢，完成體育聯賽數據統計分析",
      "GEOM90008（空間數據庫）：基於 PostGIS 實現空間 SQL 查詢，落地距離計算、路徑規劃、高程分析等 GIS 場景",
      "COMP90054（AI 規劃）：為 Splendor 遊戲設計多策略 AI，抽象 MDP 狀態、設計獎勵，優化規劃 Agent（27 勝 13 負），掌握搜索/調參",
    ],
    rank: 1,
  },
];
