# STAR 故事线分析与优化指南

## 概述

本文档基于 `skillbase.md` 中的详细经历，使用 STAR 方法为每个经历编排清晰的故事线，并指导如何优化 `content/en` 目录下的文案。

---

## STAR 方法框架

**STAR = Situation, Task, Action, Result**

- **Situation**: 项目背景、挑战、约束条件
- **Task**: 具体任务、目标、职责范围
- **Action**: 采取的具体行动、技术方案、决策过程
- **Result**: 量化成果、业务影响、技术成就

---

## 经历分析

### 1. ReCube 工作经历 (Full Stack Developer / Tech Lead)

#### 原始价值点
- 带领3人团队交付80+功能，100% UAT通过
- 构建 Next.js SSR PWA + AWS 云架构
- 设计容器租赁平台，DynamoDB 数据模型
- 集成 Stripe 支付 + Firebase Auth
- 构建 AWS EventBridge/SES 通知系统
- 管理 Cloudflare 域名路由
- 实现 i18n 国际化
- 制作应用内教程视频

#### STAR 故事线编排

**故事线 1: 技术领导力与团队交付**
- **S**: 初创公司，需要快速构建生产级 SaaS 平台
- **T**: 领导3人团队，交付80+功能，确保100% UAT通过
- **A**: 建立敏捷流程，使用 Asana 跟踪需求，定义数据模型和服务边界
- **R**: 稳定周度发布，架构决策文档化，跨时区异步协作

**故事线 2: 全栈架构与云原生部署**
- **S**: 需要高性能、可扩展的云原生应用
- **T**: 构建 Next.js SSR PWA，AWS CDK/Amplify CI/CD 流水线
- **A**: 环境隔离，分支策略，基础设施即代码
- **R**: 减少90%手动部署，消除环境错误，减少合并冲突

**故事线 3: 支付与身份认证系统**
- **T**: 集成 Stripe 支付和 Firebase Auth，提升安全性和用户体验
- **A**: 押金预授权，退款流程，行为设计提升归还合规性
- **R**: 降低支付摩擦，提高用户信任度

**故事线 4: 事件驱动通知系统**
- **S**: 需要自动化订单和归还提醒
- **T**: 构建 AWS EventBridge/SES 通知管道
- **A**: 服务器验证，自动事件调度，可定制HTML模板
- **R**: 提高按时归还率，减少人工干预

---

### 2. Breath Tracking 研究项目

#### 原始价值点
- 实时呼吸追踪管道，24.7 FPS / 40ms 延迟
- 处理3个呼吸数据集，运动场景相关性提升300%
- MATLAB EVM 迁移到 Python，优化信号处理
- YOLO 微调，临床级准确性

#### STAR 故事线编排

**故事线 1: 实时生物传感管道**
- **S**: 4DMedical XV Scanner 临床需求，需要实时呼吸追踪
- **T**: 构建 Python Flask + YOLOv11n + EVM 实时管道
- **A**: 动态 ROI 计算，8级拉普拉斯金字塔，Butterworth 带通滤波
- **R**: 24.7 FPS，40.49ms 延迟，满足临床触发需求

**故事线 2: 信号处理与标准化**
- **S**: 运动伪影影响呼吸信号质量
- **T**: 处理3个数据集，提升运动场景下的信号质量
- **A**: 裁剪/调整大小，三通道深度转换，Z-score 标准化
- **R**: 相关性从0.16提升到0.66，MSE降低59.1%

**故事线 3: 算法优化与临床验证**
- **T**: 微调 YOLOv11n，实现临床级准确性
- **A**: 50个epoch，batch 8，差分 ROI 融合
- **R**: 呼气结束时间误差212.9±789.2ms，周期RMSE 1007.9±950.2ms

---

### 3. BioVis 研究项目

#### 原始价值点
- Siggraph Asia XR 投稿，MR 生物传感原型
- Unity 项目，6个场景，40+脚本
- ComputeShader 并行图像处理，Quest 3 实时部署
- ONNX/Sentis 量化，YOLOv11n 实时推理
- 多模态生物信号管道，30 FPS 追踪

#### STAR 故事线编排

**故事线 1: 混合现实生物传感原型**
- **S**: 学术研究，需要构建 MR 生物传感系统
- **T**: 构建 Unity MR 原型，支持多人生理信号监测
- **A**: ComputeShader 并行处理，EVM 算法迁移到 C#
- **R**: 30 FPS 稳定追踪3-4人，模块延迟10-42ms

**故事线 2: 边缘设备优化**
- **T**: 在 Meta Quest 3 上实现实时推理
- **A**: ONNX vs Sentis 量化评估，YOLOv11n 基准测试
- **R**: 平衡延迟和精度，实现边缘部署

**故事线 3: 多模态信号验证**
- **S**: 需要验证 rPPG 算法在真实场景中的准确性
- **T**: 在 UBFC 数据集上验证算法性能
- **A**: 运动放大，躯干掩码区域分析
- **R**: 心率 MAE 3.75 BPM，呼吸率 MAE 2.45 BPM

---

### 4. 其他项目价值点

#### ShYu Resume
- **价值**: 三语言简历生成器，A4 PDF 导出
- **STAR**: 产品化开发者工具，展示内容管道构建能力

#### Carbon 2 Garden
- **价值**: React Native 生态习惯应用，传感器集成
- **STAR**: 移动应用开发，传感器API集成，原型交付

#### 3D Object Detection
- **价值**: 3D目标检测，RGB引导点云稠密化
- **STAR**: 学术研究，算法改进，SLURM集群训练

#### Raft Consensus
- **价值**: 分布式系统实现，线性一致性KV存储
- **STAR**: 分布式算法实现，并发问题调试

---

## 优化策略

### 1. 关键词植入策略

基于 `app/keywords.json` 的关键词分类：

**FULLSTACK 关键词**: next.js, react, aws, typescript, api, ui, pwa, ssr, firebase, stripe, dynamodb, ci/cd
**SOFTWARE 关键词**: python, go, node.js, distributed, systems, postgresql, mysql, linux, nginx, api
**ML_RESEARCHER 关键词**: python, pytorch, yolo, opencv, numpy, cv, unity, meta quest

### 2. 跨职位覆盖设计

每条 bullet 应该包含至少两个职位的关键词：
- 技术领导力 + 云架构 → FULLSTACK + SOFTWARE
- 实时管道 + 信号处理 → SOFTWARE + ML_RESEARCHER
- 移动应用 + 传感器 → FULLSTACK + SOFTWARE

### 3. 量化指标强调

- 性能数据: 24.7 FPS, 40ms 延迟
- 团队规模: 3人团队
- 功能数量: 80+ 功能
- 准确性: 相关性提升300%，MSE降低59%
- 时间指标: 50个epoch，batch 8

---

## 具体优化任务

### 任务 1: 优化 work-experience.ts

**当前结构**:
```typescript
{
  id: "recube",
  position: "Full Stack Developer (Tech Lead)",
  company: "ReCube, Hong Kong",
  dateRange: "Apr 2023 - Feb 2024",
  techStack: "Next.js, AWS, DynamoDB, Stripe, Firebase",
  bullets: [
    "Technical lead; led a 3-person team to deliver 80+ features across consumer and restaurant apps, pass UAT, and launch.",
    "Built a Next.js SSR PWA with AWS CDK/Amplify CI/CD pipelines to accelerate iteration.",
    // ... 其他 bullets
  ]
}
```

**优化方向**:
1. 使用 STAR 故事线重构 bullets
2. 植入跨职位关键词
3. 强调量化指标
4. 确保技术栈一致性

### 任务 2: 优化 projects.ts

**优化方向**:
1. 为每个项目定义清晰的 STAR 故事线
2. 突出技术深度和研究贡献
3. 植入 ML_RESEARCHER 和 SOFTWARE 关键词
4. 强调学术成果和算法创新

### 任务 3: 优化 skills.ts

**优化方向**:
1. 根据经历重新组织技能分类
2. 突出核心技术和专长领域
3. 确保技能与经历描述一致

---

## 实施步骤

### 步骤 1: 分析现有内容
- 读取 `content/en/work-experience.ts`
- 读取 `content/en/projects.ts`
- 读取 `content/en/skills.ts`

### 步骤 2: 应用 STAR 重构
- 为每个经历定义 Situation
- 明确 Task 和目标
- 描述具体的 Action
- 强调量化的 Result

### 步骤 3: 关键词优化
- 检查每个 bullet 的关键词覆盖
- 确保跨职位关键词植入
- 验证技术栈一致性

### 步骤 4: 验证过滤逻辑
- 测试不同职位类型下的显示效果
- 确保关键词高亮正常工作
- 验证隐藏逻辑的准确性

---

## 预期成果

优化后的简历将具备：

1. **清晰的故事线**: 每个经历都有明确的 STAR 结构
2. **跨职位适应性**: 同一内容可适配不同职位需求
3. **量化成果展示**: 突出技术成就和业务影响
4. **关键词优化**: 提高 ATS 匹配率
5. **一致性**: 技术栈、技能描述与经历保持一致

通过这种方法，简历将不再是简单的技能列表，而是展示技术能力、解决问题能力和业务影响力的完整故事。