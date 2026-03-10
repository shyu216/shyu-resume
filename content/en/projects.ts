import { Icons } from "@/components/ui/icons";
import { type Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "breath-tracking",
    name: "Breath Tracking",
    subtitle: "Real-time Biosensing · Research",
    subtitleIcon: Icons.GraduationCap,
    link: "",
    dateRange: "Feb 2025 - Nov 2025",
    techStack: "Python, Flask, YOLO, OpenCV",
    bullets: [
      "Collaborated with 4DMedical to develop a real-time breath tracking system to trigger their XV Scanner",
      "Trained YOLOv11n for depth map human detection, boosting signal stability (correlation ↑0.5, MSE ↓59.1\%)",
      "Rebuilt MATLAB EVM algorithm in Python (OpenCV/NumPy) to magnify subtle respiratory motions",
      "Built real-time breath tracking pipeline; optimized Flask demo (1000ms→150ms rendering)"
    ],
  },
  {
    id: "biovis",
    name: "BioVis",
    subtitle: "Mixed Reality Biosensing · Research",
    subtitleIcon: Icons.GraduationCap,
    link: "https://youtu.be/zOPQXXpSRbg",
    dateRange: "May 2025 – Nov 2025",
    techStack: "Unity, Meta Quest 3, C#",
    bullets: [
      "Co-authored (2nd) SIGGRAPH Asia XR submission; built MR biosensing prototype (Unity).",
      "Solo-built Unity project (6 scenes, 40+ scripts) with 3D/UI integration.",
      "Reproduced EVM via ComputeShader; deployed on Meta Quest 3.",
      "Benchmarked YOLOv11n on Quest 3; optimized ONNX/Sentis quantization.",
      "Validated rPPG (HR MAE 3.75 BPM, BR MAE 2.45 BPM) on UBFC dataset.",
    ],
  },
  {
    id: "shyu-resume",
    name: "ShYu Resume",
    subtitle: "Personal Resume · Open Source Project",
    subtitleIcon: Icons.Github,
    link: "https://github.com/shyu216/shyu-resume",
    dateRange: "Aug 2024 – Present",
    techStack: "Next.js, Tailwind",
    bullets: [
      "Built a Next.js i18n resume generator with tri-language (ZH/EN/HK) switching and A4 PDF export (hyperlinks included).",
      "Deployed to GitHub Pages with one-click save/print.",
    ],
  },
  {
    id: "carbon-2-garden",
    name: "Carbon 2 Garden",
    subtitle: "Sensor Interactive App",  //   · COMP90018
    subtitleIcon: Icons.LayoutTemplate,
    link: "https://github.com/CRUVOD/CarbonTracker",
    dateRange: "Sep 2024 – Nov 2024",
    techStack: "React Native, Google Maps API",
    bullets: [
      "Built a React Native eco-habit app with tasks, leaderboards, and activity reminders.",
      "Integrated gyroscope and Google Maps API to ship a \"sedentary alert + park recommendation\" challenge prototype.",
      "Owned routing and project skeleton; shipped the APK.",
    ],
  },
  // {
  //   id: "poetry-card",
  //   name: "Poetry Card",
  //   subtitle: "Local Database · Open Source Project",
  //   subtitleIcon: Icons.PackageOpen,
  //   link: "https://github.com/shyu216/ccpoems",
  //   dateRange: "Dec 2023 – Feb 2024",
  //   techStack: "React Native, SQLite",
  //   bullets: [
  //     "Built a Chinese poetry app with React Native + SQLite, enabling local CRUD, random draws, and history.",
  //     "Shipped the Android APK, accruing React Native delivery experience for later projects.",
  //   ],
  // },
  {
    id: "3d-object-detection",
    name: "3D Object Detection",
    subtitle: "Point Cloud · Research",
    subtitleIcon: Icons.GraduationCap,
    link: "https://github.com/shyu216/DPC",
    dateRange: "Sep 2022 – May 2023",
    techStack: "PyTorch, Open3D, OpenPCDet, SLURM",
    bullets: [
      "Reproduced 3D object detection on OpenPCDet, generating vehicle/pedestrian/cyclist boxes on KITTI.",
      "Trained on a SLURM cluster; used Open3D for point-cloud visualization and experiment analysis.",
      "Completed the bachelor thesis independently, consolidating methods and results.",
    ],
  },
  {
    id: "distributed-raft",
    name: "Raft Consensus Implementation in Go",
    subtitle: "Distributed Systems",  //  · CSCI4160
    subtitleIcon: Icons.Code,
    link: "https://github.com/shyu216/go-raft",
    dateRange: "Jan 2022 – May 2022",
    techStack: "Go, Raft",
    bullets: [
      "Implemented Raft per the paper; passed leader election and log replication tests.",
      "Delivered a linearizable distributed KV store; fixed lock contention and log commit issues; passed all tests.",
    ],
  },
  // {
  //   id: "easy-draw-guess",
  //   name: "Easy Draw & Guess",
  //   subtitle: "Real-time Multiplayer Game · CSCI3100",
  //   subtitleIcon: Icons.BookOpen,
  //   link: "https://github.com/easyDG",
  //   dateRange: "Jan 2022 – May 2022",
  //   techStack: "NodeJS, Socket.IO",
  //   bullets: [
  //     "Built MySQL account management and Socket.IO cross-device cursor tracking plus real-time chat.",
  //     "Deployed on AWS EC2 for smooth multi-device demos.",
  //   ],
  // },
  {
    id: "course-algorithm-practice",
    name: "Data & Algorithm Delivery",
    subtitle: "Course Project Collection",
    subtitleIcon: Icons.Code,
    link: "https://shyu216.github.io/knownoevil/study/",
    dateRange: "Sep 2021 – May 2024",
    techStack: "SQL, Hadoop, Python",
    bullets: [
      "Designed Hadoop/MapReduce pipelines for parallel Dijkstra, PageRank, K-Means; optimized big-data processing flow.",
      "Designed a 5-table PK/FK schema and 8 complex SQL queries for league/team/sponsor analytics.",
      "Built PostGIS spatial SQL for distance, routing, single-point elevation, and area slope statistics.",
      "Splendor planning agents modeled with MDP and reward functions; achieved 27/40 wins against TA benchmark.",
      "Trained a fact-checking system with Doc2Vec/BiLSTM; processed 1.2M+ evidence sentences with 64.9% classification accuracy.",
    ],
  },
];
