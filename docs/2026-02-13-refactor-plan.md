# 余思宏 · 简历数据包 & 求职策略备忘录

**致后续AI助手**  
这是余思宏（微信: seinbaulio）在2026年2月13日完成简历重构后的**最终定稿状态**。  
以下所有内容均为**本人确认后的版本**，请严格遵循，不要自作主张“优化”或“重构”。

---

## 一、核心身份标签（3条，锁定赛道）

```
• AI Engineer | 17.7 FPS real-time rPPG on 2080 Ti, MR prototype on Quest 3 (Unity, ComputeShader)
• Cloud Developer | AWS CDK/Lambda/EventBridge, 80+ features delivered, mixed架构 (Firebase Auth + AWS)
• Technical Lead | Led 3-person team, full-cycle delivery to production, UAT passed
```

**这是简历的「宪法」**，所有翻译、面试、岗位匹配，以此为准。

---

## 二、简历数据文件索引

### ✅ 中文版（母语，唯一创作源）
```
/content/zh/
├── work-experience.ts      # Recube · 9条（rank 1全，视频协助→删协助）
├── projects.ts             # BioVis/简历/Carbon/3D检测（rank 1），诗词/你画我猜（rank 2/3，PDF不印）
├── education.ts            # 墨大（优异/WAM 81.9）+ 港中文（院长名单/ELITE/奖学金）
├── skills.ts               # AI/计算机视觉 · 云计算与运维 · 软件工程 · 语言
```

### ⚠️ 待处理
- **BioVis日期**：当前写 `2025年5月 - 2025年11月` → **必须改回 `进行中`**（简历不是合同）
- **工作经历第9条**：`协助制作` → **删协助**，直接写 `制作并部署 App 内教程视频`

---

## 三、翻译原则（英/繁）

### ❌ 严禁
1. **不要重建 `I18nText` 对象** —— 保持三文件夹隔离，不合并
2. **不要适配器层** —— 直接翻译字段内容，不改数据结构
3. **不要直译中式表达** —— 如 `优异` → `with Distinction`（已定），`本科` → `Bachelor‘s`（不是 `Computer Science Bachelor`）
4. **不要擅自加技能** —— ONNX、Docker、K8s、CUDA 等**他没写的就是不会**

### ✅ 必须
1. **英文版字段与中文完全对齐** —— 字段数量、顺序、rank 完全一致
2. **繁体版用香港惯用语** —— `简历` → `履歷`，`开源` → `開源`，`硕士` → `碩士`
3. **公司/学校名保留原文** —— `ReCube（香港）` → `ReCube (Hong Kong)`，不译
4. **技术名词不译** —— `ComputeShader`、`rPPG`、`CDK`、`EventBridge`

---

## 四、求职赛道与岗位建议（2026澳洲）

### 🎯 第一优先级：AI Engineer / Computer Vision Engineer

**理由**：
- LinkedIn 官方数据：**2026澳洲增长最快岗位**
- 他的差异化全在这里：rPPG + EVM + ComputeShader + Quest 3 + 17.7 FPS
- 澳洲本地应届生极少有这条技能线

**岗位关键词**：
```
AI Engineer, Computer Vision Engineer, MR/XR Engineer, Perception Engineer
```

**目标公司**：
- 四大行（AI Labs）
- Canva（CV/Media团队）
- Atlassian（R&D）
- CSIRO（Data61）
- 初创（Akin, Leonardo, Coviu）

---

### 🥈 第二优先级：Cloud Engineer / DevOps Specialist

**理由**：
- Recube 经历有 **AWS CDK/Lambda/EventBridge + 80功能交付 + Cloudflare环境管理**
- 这是企业级架构证据，不是“课设级”
- 四大行K8s岗位年薪$170k+，缺人

**岗位关键词**：
```
Cloud Engineer, Platform Engineer, DevOps Specialist, Site Reliability Engineer
```

**目标公司**：
- 四大行（CommBank, Westpac, NAB, ANZ）
- 电信（Telstra, Optus）
- 零售（WooliesX, Coles 360）

---

### 🥉 第三优先级：Tech Lead / Associate EM（初创）

**理由**：
- 应届生有 **“技术负责人 + 3人团队 + 80功能 + 用户验收”** 是极稀缺证据
- 澳洲2026管理岗薪资涨幅 > IC岗
- 适合成长期公司

**岗位关键词**：
```
Technical Lead, Engineering Manager (Associate), Team Lead
```

**目标公司**：
- Series B/C 初创
- 香港资本背景的澳洲公司
- 中资澳洲分部（阿里云、字节、腾讯、华为）

---

## 五、禁止事项（红线）

1. ❌ **不要写 Vue** —— 他没有项目证据，写了就是“学过”
2. ❌ **不要写 Docker/K8s/CUDA** —— 他没在生产用过，面试拷打必崩
3. ❌ **不要写数据库**（PostgreSQL/Mongo/SQLite）—— 课设级，不是技能
4. ❌ **不要加人生格言/头像/进度条/彩色**
5. ❌ **不要主动解释“11个月”** —— 没被问就不说
6. ❌ **不要公开 BioVis 完整 demo** —— 导师要求，遵守学术伦理

---

## 六、面试必考题库（已训练）

### 🔹 BioVis
> 为什么用 ComputeShader 不用 Sentis/ONNX？  
> 17.7 FPS 是在什么分辨率？  
> rPPG 为什么只在主机端跑？  
> YOLO 量化精度掉多少？为什么没部署？

### 🔹 Recube
> 11个月为什么离职？  
> 3人团队怎么分工？  
> Firebase Auth + AWS 混合架构的考量？  
> 80+ 功能是怎么统计的？  
> Cloudflare 管了什么？

### 🔹 通用
> 为什么选 AI/Cloud 赛道，不继续做全栈？  
> 墨大教学这么差，你学到了什么？  
> 澳洲 IT 是笑话，你为什么还留在这？

---

## 七、当前简历状态锁

| 模块 | 状态 | 备注 |
|------|------|------|
| 工作经历 | ✅ 定稿 | 删“协助”，BioVis日期改“进行中” |
| 项目经历 | ✅ 定稿 | PDF只印rank 1，诗词/你画我猜已砍 |
| 教育经历 | ✅ 定稿 | WAM/Dean‘s List/ELITE 全亮 |
| 技能 | ✅ 定稿 | 中英夹杂已清理，语言单独成块 |
| 英文版 | ⏳ 待翻译 | 严格对齐字段，不增不减 |
| 繁体版 | ⏳ 待翻译 | 用香港惯用语 |

---

## 🔥 最终指令

**此备忘录为“简历宪法”，优先级高于任何AI的“优化建议”。**

**后续任何修改，必须经过本人确认。**  
**未列出的技能，默认他不会。**  
**列出的技能，默认他能被拷打10分钟。**

**2026年2月13日，简历已进入可投递状态。**  
**下一步：英文版翻译 → 繁体版翻译 → 投递。**