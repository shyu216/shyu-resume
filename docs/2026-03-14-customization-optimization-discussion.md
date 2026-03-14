# 简历项目定制流程优化讨论

## 背景

通过对比 `main` 和 `yunjin-resume` 分支，发现当前定制流程需要修改约 **53 个文件**（包含新增、修改、删除）。这个数量对于想要基于本项目创建自己简历的用户来说，门槛过高。

```
53 files changed, 1835 insertions(+), 1039 deletions(-)
```

## 当前定制流程分析

### 需要修改的文件分类

| 类别 | 文件数量 | 说明 |
|-----|---------|------|
| 内容文件 | 20+ | 各语言的 education, projects, skills, summary, work-experience |
| 配置文件 | 4 | config.ts, keywords.json, storage.ts, job-type-provider |
| 组件文件 | 15+ | job-switcher, language-switcher, theme-switcher, 各 section 组件 |
| UI 组件 | 8 | header, footer, action-button, icons 等 |
| 类型定义 | 2 | summary.d.ts, keyword-utils.ts |
| 图片资源 | 3+ | 头像、公司 logo 等 |
| 工具函数 | 3 | utils.ts, storage.ts 等 |

### 核心问题

1. **内容分散**：个人信息分散在 config.ts 和各个内容文件中
2. **硬编码过多**：职位类型、语言支持等在多处硬编码
3. **组件耦合**：UI 组件与内容紧密耦合，无法独立配置
4. **语言扩展困难**：添加新语言需要修改多个组件
5. **关键词系统复杂**：需要维护多套关键词映射

---

## 优化建议

### 方案一：集中式配置（推荐短期实施）

**目标**：将分散的配置集中到单一配置文件

#### 1. 创建统一的个人配置中心

```typescript
// content/person.config.ts
export const personConfig = {
  // 基础信息
  name: {
    display: "云堇",
    en: "Yun Jin",
    // 多语言支持
    localized: {
      zh: { first: "堇", last: "云" },
      ja: { first: "Yun", last: "Jin" },
      fr: { first: "Yun", last: "Jin" },
    }
  },
  
  // 联系方式
  contact: {
    linkedin: "https://linkedin.com/in/...",
    github: "https://github.com/...",
    email: "email@example.com",
    phone: "+86 xxx-xxxx-xxxx"
  },
  
  // 支持的职位类型（可自定义）
  jobTypes: [
    { id: "FULLSTACK", label: "全栈开发", icon: "Code" },
    { id: "FRONTEND", label: "前端开发", icon: "Layout" },
    { id: "BACKEND", label: "后端开发", icon: "Server" },
  ],
  
  // 支持的语言
  languages: [
    { id: "zh", label: "中文", flag: "🇨🇳" },
    { id: "en", label: "English", flag: "🇬🇧" },
    { id: "ja", label: "日本語", flag: "🇯🇵" },
  ],
  
  // 主题配置
  theme: {
    primaryColor: "#3b82f6",
    availableColors: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"],
  },
  
  // 关键词配置（按职位类型）
  keywords: {
    FULLSTACK: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    FRONTEND: ["React", "Vue", "CSS", "Tailwind"],
    BACKEND: ["Node.js", "Python", "PostgreSQL", "Redis"],
  }
};
```

#### 2. 重构组件读取配置

所有组件从统一的配置中心读取，而不是硬编码：

```typescript
// components/job/job-switcher.tsx
import { personConfig } from "@/content/person.config";

// 动态生成职位选项
const jobOptions = personConfig.jobTypes.map(job => ({
  value: job.id,
  label: job.label,
  icon: job.icon,
}));
```

#### 3. 内容文件标准化

使用统一的文件结构和命名规范：

```
content/
├── config.ts           # 个人配置（唯一需要修改的配置文件）
├── zh/
│   ├── summary.ts      # 各职位类型的简介
│   ├── experience.ts   # 工作经历
│   ├── projects.ts     # 项目经历
│   ├── skills.ts       # 技能
│   └── education.ts    # 教育背景
├── en/
│   └── ...
└── [lang]/
    └── ...
```

#### 预期效果

| 优化项 | 修改前 | 修改后 | 减少比例 |
|-------|-------|-------|---------|
| 配置文件 | 4 个 | 1 个 | 75% |
| 组件修改 | 20+ 个 | 0-2 个 | 90% |
| 类型修改 | 2 个 | 0 个 | 100% |
| **总计** | **~53 个** | **~20 个** | **62%** |

---

### 方案二：插件化架构（推荐长期规划）

**目标**：将简历系统拆分为核心引擎 + 内容插件

#### 架构设计

```
resume-core/          # 核心引擎（无需修改）
├── components/       # 通用UI组件
├── hooks/           # 通用逻辑钩子
├── utils/           # 工具函数
└── types/           # 类型定义

resume-content/       # 内容插件（用户只需修改这里）
├── config.ts        # 个人配置
├── zh/              # 中文内容
├── en/              # 英文内容
└── assets/          # 图片等资源
```

#### 核心引擎职责

- 渲染简历布局
- 处理主题切换
- 管理语言状态
- 关键词高亮
- PDF 导出

#### 内容插件职责

- 提供个人数据
- 定义职位类型
- 配置关键词
- 提供图片资源

#### 实现方式

核心引擎通过约定好的接口读取内容：

```typescript
// 核心引擎定义的接口
interface ResumeContent {
  config: PersonConfig;
  getSummary: (lang: string, jobType: string) => string;
  getExperience: (lang: string) => Experience[];
  getProjects: (lang: string, jobType: string) => Project[];
  getSkills: (lang: string, jobType: string) => Skill[];
  getEducation: (lang: string) => Education[];
}

// 内容插件实现接口
export const content: ResumeContent = {
  config: personConfig,
  getSummary: (lang, jobType) => { /* ... */ },
  // ...
};
```

---

### 方案三：CLI 工具辅助（推荐中期实施）

**目标**：提供交互式 CLI 工具，自动完成大部分配置

#### 功能设计

```bash
# 初始化新项目
npx create-resume my-resume

# 交互式配置
? 你的姓名: 张三
? 选择支持的职位类型: [x] 全栈开发 [ ] 前端开发 [x] 后端开发
? 选择支持的语言: [x] 中文 [x] English [ ] 日本語
? 主题主色调: #3b82f6

# 自动生成文件结构
✓ 创建配置文件
✓ 生成内容模板
✓ 配置关键词
✓ 初始化 Git 仓库
```

#### 辅助命令

```bash
# 添加新语言
npx resume add-language ja

# 添加新职位类型
npx resume add-job-type "DEVOPS" "运维开发"

# 验证配置
npx resume validate

# 预览
npx resume preview
```

---

## 实施路线图

### 第一阶段：配置集中化（1-2 周）

1. **创建统一配置中心**
   - 合并分散的配置到 `content/config.ts`
   - 定义清晰的配置接口

2. **重构组件**
   - 移除组件中的硬编码
   - 改为从配置中心读取

3. **更新文档**
   - 编写新的定制指南
   - 提供配置示例

### 第二阶段：内容标准化（2-3 周）

1. **统一内容文件结构**
   - 规范各语言目录结构
   - 提供内容模板

2. **优化关键词系统**
   - 简化关键词配置
   - 支持自动提取关键词

3. **添加验证工具**
   - 配置合法性检查
   - 内容完整性检查

### 第三阶段：CLI 工具（3-4 周）

1. **开发初始化工具**
   - 交互式项目创建
   - 模板生成

2. **开发辅助命令**
   - 添加语言/职位类型
   - 配置验证
   - 本地预览

### 第四阶段：插件化架构（长期）

1. **拆分核心与内容**
   - 提取可复用的核心引擎
   - 定义插件接口

2. **发布 npm 包**
   - 核心引擎作为依赖
   - 内容作为独立项目

---

## 具体实施建议

### 立即可做的优化

1. **合并配置到单一文件**
   ```typescript
   // content/config.ts 包含：
   // - 个人信息
   // - 职位类型定义
   // - 语言支持配置
   // - 关键词映射
   // - 主题配置
   ```

2. **简化职位切换逻辑**
   - 职位类型从配置读取，不在组件中硬编码
   - 支持动态添加/删除职位类型

3. **简化语言切换逻辑**
   - 支持的语言从配置读取
   - 自动加载对应语言的内容文件

4. **提供内容模板**
   - 创建 `content/templates/` 目录
   - 提供各语言的内容模板

### 代码示例

#### 优化后的 config.ts

```typescript
export interface ResumeConfig {
  // === 基础信息 ===
  personal: {
    name: Localized<string>;
    title: Localized<string>;
    contact: ContactInfo;
  };
  
  // === 职位配置 ===
  jobs: {
    types: JobType[];
    default: string;
  };
  
  // === 语言配置 ===
  languages: {
    supported: Language[];
    default: string;
  };
  
  // === 关键词配置 ===
  keywords: Record<string, string[]>;
  
  // === 主题配置 ===
  theme: ThemeConfig;
  
  // === 功能开关 ===
  features: {
    pdfExport: boolean;
    jobSwitching: boolean;
    themeSwitching: boolean;
  };
}

// 使用示例
export const config: ResumeConfig = {
  personal: {
    name: {
      zh: "云堇",
      ja: "雲菫",
      fr: "Yunjin",
    },
    title: {
      zh: "璃月戏曲名角",
      ja: "璃月の戏曲名角",
      fr: "Artiste d'opéra de Liyue",
    },
    contact: {
      email: "yunjin@example.com",
      github: "https://github.com/yunjin",
      linkedin: "https://linkedin.com/in/yunjin",
    },
  },
  
  jobs: {
    types: [
      { id: "PERFORMER", label: "表演", icon: "Mic" },
      { id: "COMPOSER", label: "创作", icon: "Pen" },
      { id: "DIRECTOR", label: "管理", icon: "Users" },
    ],
    default: "PERFORMER",
  },
  
  languages: {
    supported: [
      { id: "zh", label: "中文", flag: "🇨🇳" },
      { id: "ja", label: "日本語", flag: "🇯🇵" },
      { id: "fr", label: "Français", flag: "🇫🇷" },
    ],
    default: "zh",
  },
  
  keywords: {
    PERFORMER: ["京剧", "昆曲", "花旦", "唱腔"],
    COMPOSER: ["剧本", "作曲", "编曲", "创作"],
    DIRECTOR: ["管理", "策划", "培训", "运营"],
  },
  
  theme: {
    primary: "#ef4444",
    colors: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"],
  },
  
  features: {
    pdfExport: true,
    jobSwitching: true,
    themeSwitching: true,
  },
};
```

#### 优化后的组件使用方式

```typescript
// components/job/job-switcher.tsx
import { config } from "@/content/config";

export function JobSwitcher() {
  const { jobs } = config;
  
  return (
    <div className="flex gap-2">
      {jobs.types.map((job) => (
        <JobButton
          key={job.id}
          job={job}
          isActive={currentJob === job.id}
        />
      ))}
    </div>
  );
}
```

---

## 总结

### 当前问题

- 需要修改 53 个文件才能定制
- 配置分散在多个文件中
- 组件硬编码过多
- 语言/职位扩展困难

### 优化目标

| 指标 | 当前 | 目标 | 优化后 |
|-----|------|------|-------|
| 需修改文件数 | ~53 | ~15 | 72% ↓ |
| 配置文件数 | 4 | 1 | 75% ↓ |
| 组件修改数 | 20+ | 0 | 100% ↓ |
| 定制时间 | 数小时 | <30分钟 | 80% ↓ |

### 推荐优先级

1. **高优先级**：配置集中化（立即实施）
2. **中优先级**：CLI 工具（1-2 月内）
3. **低优先级**：插件化架构（长期规划）

---

## 讨论记录

### 2026-03-14

**问题提出**：对比 main 和 yunjin-resume 分支，发现定制需要修改约 53 个文件，门槛过高。

**初步分析**：
- 内容分散在多个目录
- 组件硬编码职位类型和语言
- 关键词系统复杂

**优化方向**：
1. 集中式配置
2. 组件动态读取配置
3. 标准化内容结构
4. 开发 CLI 工具辅助

**下一步行动**：
- [ ] 创建统一的配置中心
- [ ] 重构组件读取配置
- [ ] 编写新的定制指南
