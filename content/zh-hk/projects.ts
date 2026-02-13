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
      "協助導師完成 Siggraph Asia XR 論文投稿（第二作者），負責 MR 生理信號檢測原型開發",
      "獨立開發 6 場景、40+ 腳本的 Unity 項目，整合 3D 模型與豐富 UI",
      "利用 ComputeShader 並行加速圖像處理，複現 EVM 算法，實現 Quest 3 端實時 MR 原型",
      "複現 rPPG 算法，在 2080 Ti 上達到 17.7 FPS 實時推理（主機端）",
      "評估 ONNX、Sentis 及 CPU 推理方案，基於 Quest 3 算力限制選定 ComputeShader 路徑",
      "嘗試 YOLO v11 nano INT8 量化，因精度約束未部署，保留模型優化空間"
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
      "開發基於 Next.js 的 i18n 履歷生成器，支援中/英/港三語切換及 A4 PDF 導出（含超鏈接）",
      "部署於 GitHub Pages，提供一鍵保存/打印入口"
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
      "集成陀螺儀傳感器與 Google Maps API，完成“久坐提醒+公園推薦”互動挑戰原型",
      "負責路由設計及項目架構，完成 APK 打包發布"
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
      "完成 Android APK 打包發布，為後續 React Native 項目積累工程經驗"
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
      "使用 SLURM 集群訓練模型，通過 Open3D 完成點雲可視化及實驗結果分析",
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
      "基於MySQL實現遊戲帳號增刪改查，利用Socket.IO實現跨設備光標追蹤、遊戲房間與即時聊天。",
      "部署於AWS EC2雲端，支持多設備流暢演示。",
    ],
    rank: 3,
  },
];
