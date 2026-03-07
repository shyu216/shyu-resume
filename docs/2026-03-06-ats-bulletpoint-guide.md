# ATS Bullet Point 生成指南

## 概述

本文档指导 AI 如何为同一工作经历/项目生成针对不同职位类型的 ATS (Applicant Tracking System) 优化 bullet points。

核心逻辑：**所有职位的 bullet points 放在同一个数组中**，通过 `app/keywords.json` 中的关键词自动匹配：
- 匹配当前职位关键词的 bullet → **显示并高亮关键词**
- 不匹配任何关键词的 bullet → **自动隐藏**

---

## 核心架构

### 数据流

```
content/en/work-experience.ts
content/en/projects.ts
        ↓
[AI 生成综合版 bullets - 包含所有职位相关关键词]
        ↓
app/keywords.json (职位类型关键词)
        ↓
KeywordFilter 组件 (运行时过滤 + 高亮)
        ↓
显示匹配的 bullets，隐藏不匹配的
```

### 职位类型定义

| 职位类型 | 标识符 | 目标岗位 |
|---------|--------|---------|
| Full Stack | `FULLSTACK` | 全栈开发工程师 |
| Software Engineer | `SOFTWARE` | 软件工程师 |
| ML Researcher | `ML_RESEARCHER` | 机器学习/计算机视觉研究员 |

---

## 数据结构规范

### 工作经历数据结构（保持不变）

```typescript
// types/work-experience.d.ts
export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  companyLink?: string;
  companyImage?: string;
  dateRange: string;
  techStack: string;
  bullets: string[];  // 保持简单数组结构
}
```

### 项目数据结构（保持不变）

```typescript
// types/project.d.ts
export interface Project {
  id: string;
  name: string;
  subtitle: string;
  subtitleIcon?: React.ComponentType;
  link?: string;
  dateRange: string;
  techStack: string;
  bullets: string[];  // 保持简单数组结构
}
```

---

## Bullet Point 生成规则

### 规则 1: 综合编写策略

**不要为每个职位写单独版本**，而是编写**综合版本**，确保每个 bullet 自然包含多个职位的关键词。

#### 示例 1: ReCube 工作经历

```typescript
// content/en/work-experience.ts
{
  id: "recube",
  position: "Full Stack Developer (Tech Lead)",
  company: "ReCube, Hong Kong",
  dateRange: "Apr 2023 - Feb 2024",
  techStack: "Next.js, AWS, DynamoDB, Stripe, Firebase",
  bullets: [
    // 这条包含 FULLSTACK + SOFTWARE 关键词
    "Led a 3-person agile squad; shipped 80+ production features using Next.js SSR PWA, AWS cloud infrastructure, and scalable backend systems.",
    
    // 这条包含 FULLSTACK + SOFTWARE 关键词
    "Architected full-stack container rental platform with Next.js frontend, AWS DynamoDB data models, and RESTful API integrations for unique utensil IDs and borrow/return tracking.",
    
    // 这条包含 FULLSTACK 关键词
    "Integrated Stripe payment processing with deposit pre-authorization and Firebase Auth for secure user authentication and access control.",
    
    // 这条包含 FULLSTACK + SOFTWARE 关键词
    "Built AWS EventBridge/SES notification system and Cloudflare CDN routing; designed CI/CD pipelines using AWS CDK/Amplify with branch isolation.",
    
    // 这条包含 FULLSTACK 关键词
    "Implemented i18n internationalization supporting English/Traditional Chinese with reusable React hooks; produced in-app tutorial videos to improve onboarding."
  ]
}
```

**关键词匹配结果：**

| Bullet | FULLSTACK 匹配 | SOFTWARE 匹配 | ML_RESEARCHER 匹配 |
|--------|---------------|---------------|-------------------|
| Led a 3-person... | ✅ next.js, aws, pwa, ssr | ✅ aws, systems | ❌ |
| Architected full-stack... | ✅ next.js, api, dynamodb | ✅ dynamodb, api, data models | ❌ |
| Integrated Stripe... | ✅ stripe, firebase, auth | ❌ | ❌ |
| Built AWS EventBridge... | ✅ aws, eventbridge, cdk, amplify, ci/cd | ✅ aws, systems | ❌ |
| Implemented i18n... | ✅ i18n, react | ❌ | ❌ |

#### 示例 2: Breath Tracking 研究项目

```typescript
// content/en/projects.ts
{
  id: "breath-tracking",
  name: "Breath Tracking",
  subtitle: "Real-time Biosensing · Research",
  dateRange: "Feb 2025 - Nov 2025",
  techStack: "Python, Flask, YOLO, EVM",
  bullets: [
    // 这条包含 ML_RESEARCHER + FULLSTACK 关键词
    "Built Python Flask real-time web application serving YOLOv11n-seg/pose inference pipeline with Eulerian Video Magnification and dynamic ROI computation.",
    
    // 这条包含 ML_RESEARCHER + SOFTWARE 关键词
    "Engineered high-performance video processing pipeline achieving 24.7 FPS with 40.49ms latency on i9-11900F + RTX 2080 Ti; optimized 8-level Laplacian pyramid and Butterworth band-pass filtering.",
    
    // 这条包含 ML_RESEARCHER 关键词
    "Fine-tuned YOLOv11n on respiratory datasets (50 epochs, batch 8); achieved end-exhalation timing error 212.9±789.2ms on dPPG PFT dataset (35 subjects, 300 sequences).",
    
    // 这条包含 ML_RESEARCHER + SOFTWARE 关键词
    "Validated robustness across three datasets (XV Scanner, dPPG PFT, challenging motion); improved correlation from 0.16 to 0.66 (~299.6% gain) and reduced MSE by 59.1% through signal processing optimization.",
    
    // 这条包含 ML_RESEARCHER 关键词
    "Reproduced MATLAB EVM algorithm in Python (OpenCV/NumPy); delivered clinical-grade accuracy with cycle RMSE 1007.9±950.2ms, meeting XV Scanner clinical trigger requirements."
  ]
}
```

**关键词匹配结果：**

| Bullet | FULLSTACK 匹配 | SOFTWARE 匹配 | ML_RESEARCHER 匹配 |
|--------|---------------|---------------|-------------------|
| Built Python Flask... | ✅ flask, python | ❌ | ✅ python, yolo, opencv, evm |
| Engineered high-performance... | ❌ | ✅ python, performance | ✅ python, opencv |
| Fine-tuned YOLOv11n... | ❌ | ❌ | ✅ python, yolo |
| Validated robustness... | ❌ | ❌ | ✅ python |
| Reproduced MATLAB... | ❌ | ❌ | ✅ python, opencv, numpy |

---

### 规则 2: 关键词植入策略

每个 bullet point 应该**自然植入多个职位的关键词**，让同一条 bullet 可以被多个职位类型匹配。

#### 关键词分类参考

```typescript
// app/keywords.json 结构
{
  "FULLSTACK": [
    "next.js", "react", "react native", "aws", "typescript", "javascript",
    "api", "restful", "pwa", "ssr", "tailwind", "css", "html",
    "firebase", "auth", "stripe", "payments", "dynamodb",
    "cdk", "amplify", "ci/cd", "cloudflare", "eventbridge", "ses",
    "socket.io", "i18n", "ui", "jwt", "oauth"
  ],
  "SOFTWARE": [
    "go", "python", "c#", "node.js", "distributed", "systems",
    "postgresql", "mysql", "dynamodb", "sqlite", "sql",
    "nginx", "linux", "ec2", "s3", "lambda", "raft",
    "restful", "api", "modelling", "spatial", "postgis",
    "hadoop", "mapreduce", "slurm"
  ],
  "ML_RESEARCHER": [
    "python", "pytorch", "tensorflow", "keras", "yolo",
    "opencv", "numpy", "pandas", "scikit-learn", "scipy",
    "hugging face", "onnx", "cuda", "cv", "3d",
    "unity", "meta quest", "rppg", "bilstm", "sbert",
    "flask", "matplotlib", "open3d", "openpcdet",
    "compute shader", "evm"
  ]
}
```

#### 跨职位关键词组合示例

| 组合类型 | 示例 Bullet | 匹配的职位 |
|---------|------------|-----------|
| FULLSTACK + SOFTWARE | "Built Next.js frontend with Node.js backend API, deployed on AWS EC2 with Nginx reverse proxy." | FULLSTACK, SOFTWARE |
| FULLSTACK + ML | "Developed React web interface for Python Flask ML inference API serving YOLO models." | FULLSTACK, ML_RESEARCHER |
| SOFTWARE + ML | "Optimized Python data processing pipeline using PyTorch; deployed on Linux servers with SLURM job scheduling." | SOFTWARE, ML_RESEARCHER |
| 三者都匹配 | "Built full-stack ML platform: React frontend, Python Flask API, PyTorch inference; deployed on AWS with CI/CD." | FULLSTACK, SOFTWARE, ML_RESEARCHER |

---

### 规则 3: Tech Stack 自动提取

`techStack` 字段中的技术会自动提取到 `app/keywords.json`，确保 bullets 中的关键词与 techStack 保持一致。

```typescript
{
  techStack: "Next.js, AWS, DynamoDB, Stripe, Firebase",
  // 这些技术会自动加入 keywords.json 的对应类别
  bullets: [
    // 确保 bullets 中包含这些技术的关键词
    "Built Next.js application with AWS DynamoDB backend, integrated Stripe payments and Firebase Auth."
  ]
}
```

---

## AI 内容生成提示词模板

### 提示词: 生成综合版 Bullets

```
你是一位专业的简历优化专家。请为以下工作经历生成 ATS 优化的 bullet points。

## 原始经历
[粘贴原始经历内容]

## 要求

1. **综合编写**: 不要分职位版本，而是编写综合版本，让同一条 bullet 可能被多个职位类型匹配

2. **关键词植入**: 自然植入以下关键词
   - FULLSTACK: next.js, react, aws, typescript, api, ui, pwa, ssr, firebase, stripe, dynamodb, ci/cd
   - SOFTWARE: python, go, node.js, distributed, systems, postgresql, mysql, linux, nginx, api
   - ML_RESEARCHER: python, pytorch, yolo, opencv, numpy, cv, unity, meta quest

3. **跨职位设计**: 
   - 尽量让每条 bullet 包含至少两个职位的关键词
   - 纯前端内容用 FULLSTACK 关键词
   - 纯 ML 内容用 ML_RESEARCHER 关键词
   - 基础设施/后端内容用 SOFTWARE 关键词

4. **格式要求**:
   - 每个 bullet 以动词开头 (Led, Built, Architected, Implemented, Developed, Engineered)
   - 包含量化指标 (数字、百分比、性能数据)
   - 长度控制在 1-2 句话

5. **输出格式**: 直接输出 string[] 数组

## 输出示例
[
  "Led a 3-person agile squad; shipped 80+ production features using Next.js SSR PWA and AWS cloud infrastructure.",
  "Architected full-stack platform with Next.js frontend, AWS DynamoDB backend, and RESTful API integrations.",
  "Integrated Stripe payment processing with deposit pre-authorization and Firebase Auth for secure user authentication.",
  "Built AWS EventBridge/SES notification system; designed CI/CD pipelines using AWS CDK/Amplify with branch isolation."
]
```

---

## 过滤逻辑说明

### KeywordFilter 组件行为

```typescript
// 伪代码说明过滤逻辑
function filterBullets(bullets: string[], jobType: JobType): string[] {
  const keywords = KEYWORDS[jobType]; // 从 keywords.json 获取
  
  return bullets.filter(bullet => {
    // 检查 bullet 是否包含至少一个关键词
    const hasMatch = keywords.some(keyword => 
      bullet.toLowerCase().includes(keyword.toLowerCase())
    );
    return hasMatch; // 只有匹配的才会显示
  });
}

function highlightKeywords(text: string, jobType: JobType): ReactNode {
  const keywords = KEYWORDS[jobType];
  
  // 将匹配的关键词用高亮样式包裹
  return keywords.reduce((result, keyword) => {
    return highlightText(result, keyword);
  }, text);
}
```

### 过滤示例

**输入 bullets：**
```typescript
[
  "Led a 3-person squad using Next.js and AWS.",        // 含 next.js, aws
  "Fine-tuned YOLO models with PyTorch.",                // 含 yolo, pytorch
  "Designed distributed systems with Raft consensus.",   // 含 distributed, raft
  "Built React frontend and Go backend API."             // 含 react, go
]
```

**不同职位显示结果：**

| 职位类型 | 显示的 Bullets | 隐藏的原因 |
|---------|---------------|-----------|
| FULLSTACK | 1, 4 | 2 (无FS关键词), 3 (无FS关键词) |
| SOFTWARE | 3, 4 | 1 (无SW关键词), 2 (无SW关键词) |
| ML_RESEARCHER | 2 | 1 (无ML关键词), 3 (无ML关键词), 4 (无ML关键词) |

---

## 完整示例

### 工作经历示例

```typescript
// content/en/work-experience.ts
export const workExperience: WorkExperience[] = [
  {
    id: "recube",
    position: "Full Stack Developer (Tech Lead)",
    company: "ReCube, Hong Kong",
    companyLink: "https://www.re3.world",
    companyImage: "./images/recube.png",
    dateRange: "Apr 2023 - Feb 2024",
    techStack: "Next.js, AWS, DynamoDB, Stripe, Firebase",
    bullets: [
      "Led a 3-person agile squad; shipped 80+ production features using Next.js SSR PWA and AWS cloud infrastructure.",
      "Architected full-stack container rental platform with Next.js frontend, AWS DynamoDB backend, and RESTful API integrations.",
      "Integrated Stripe payment processing with deposit pre-authorization and Firebase Auth for secure user authentication.",
      "Built AWS EventBridge/SES notification system and Cloudflare CDN routing; designed CI/CD pipelines using AWS CDK/Amplify.",
      "Implemented i18n internationalization supporting English/Traditional Chinese with reusable React hooks."
    ]
  }
];
```

### 项目示例

```typescript
// content/en/projects.ts
export const projects: Project[] = [
  {
    id: "breath-tracking",
    name: "Breath Tracking",
    subtitle: "Real-time Biosensing · Research",
    dateRange: "Feb 2025 - Nov 2025",
    techStack: "Python, Flask, YOLO, EVM",
    bullets: [
      "Built Python Flask real-time web application serving YOLOv11n-seg/pose inference pipeline with Eulerian Video Magnification.",
      "Engineered high-performance video processing pipeline achieving 24.7 FPS with 40.49ms latency on i9-11900F + RTX 2080 Ti.",
      "Fine-tuned YOLOv11n on respiratory datasets; achieved end-exhalation timing error 212.9±789.2ms on dPPG PFT dataset.",
      "Validated robustness across three datasets; improved correlation from 0.16 to 0.66 and reduced MSE by 59.1%."
    ]
  },
  {
    id: "biovis",
    name: "BioVis",
    subtitle: "Mixed Reality Biosensing · Research",
    dateRange: "May 2025 – Nov 2025",
    techStack: "Unity, Meta Quest 3, C#",
    bullets: [
      "Co-authored Siggraph Asia XR submission; built Unity MR biosensing prototype with 6 scenes and 40+ scripts.",
      "Used ComputeShader for parallel image processing; deployed real-time EVM on Meta Quest 3.",
      "Evaluated ONNX and Sentis quantization; benchmarked YOLOv11 nano for real-time inference on Quest 3.",
      "Built XR-HMD multi-modal biosignal pipeline with UDP streaming; achieved 30 FPS tracking of 3-4 people."
    ]
  }
];
```

---

## 文件更新检查清单

当添加新经历或修改现有经历时，请检查：

- [ ] `content/en/work-experience.ts` - 更新工作经历
- [ ] `content/en/projects.ts` - 更新项目经历
- [ ] `content/en/skills.ts` - 如有新技能
- [ ] `app/keywords.json` - 运行 `npm run gen-keywords` 重新生成
- [ ] 验证各职位类型的 bullets 是否正确过滤和显示

---

## 注意事项

1. **保持数组结构**: bullets 始终是 `string[]`，不要改为对象结构
2. **自然植入**: 关键词要自然融入句子，不要生硬堆砌
3. **跨职位覆盖**: 尽量让每条 bullet 能被多个职位类型匹配
4. **量化指标**: 每个 bullet 尽量包含数字 (性能提升、团队规模、处理数据量等)
5. **动词开头**: 使用 Led, Built, Architected, Implemented, Developed, Engineered 等强动词
6. **一致性**: 三语版本 (zh, en, zh-hk) 的 bullets 数量和结构保持一致
