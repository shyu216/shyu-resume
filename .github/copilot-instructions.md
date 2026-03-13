# Copilot Instructions for shyu-resume

## 项目架构与核心模式

- **Next.js 13.5.4 静态导出简历站点**，支持 live（动画/交互）与 PDF（静态/A4 优化）双渲染模式。内容多语言（en/zh/zh-hk），A4 PDF 布局高度定制。
- **所有组件均接收 `usage: "live" | "pdf"`**，通过对象映射（object mapping）切换 live/PDF 样式与行为。严禁 if-else/三元表达式，务必用对象映射。
- **live 模式**：`rem` 单位、framer-motion 动画、交互 UI。
- **pdf 模式**：`px` 单位（如 `text-14px`）、无动画、静态排版。详见 `components/section/full-resume.tsx`。
- **PDF 内容渲染在隐藏 div**（`app/page.tsx`），用 `react-to-print` 捕获导出。
- **i18n 采用 Context**（`components/lang/language-provider.tsx`），内容存于 `content/{en,zh,zh-hk}/`，所有 section 组件用对象映射选择语言内容。
- **数据结构**：各 `content/` 下导出数组对象，字段结构需三语一致（如 `work-experience.ts`、`projects.ts`、`education.ts`、`skills.ts`、`summary.ts`）。
- **PDF 样式依赖 `@media print`**（`app/globals.css`），如 `section { break-inside: avoid; }`，A4 纸张、边距、分页优化。
- **自定义 Tailwind 字号**（`tailwind.config.ts`）：如 `text-11px`、`text-14px`，PDF 专用。
- **主题系统**：基于 `lib/theme-config.ts` 的完整设计系统，支持动态主题色切换。
- **深色模式**：`next-themes`，详见 `components/theme/theme-provider.tsx`。
- **所有样式用 Tailwind，禁止 CSS modules。**
- **工作类型切换**：通过 `job-type-provider.tsx` 提供工作类型上下文，支持 FULLSTACK、SOFTWARE、ML_RESEARCHER 三种工作类型。
- **关键词高亮**：根据选择的工作类型，自动高亮相关技能和经验，详见 `keyword-highlighter.tsx`。

## 设计系统 (lib/theme-config.ts)

- **配色方案**：使用 `themeColors` 对象定义完整的浅色/深色主题色
  - `primary`: 主色调（蓝色系 #1e40af / #60a5fa）
  - `background`: 背景色（#fafafa / #0f172a）
  - `surface`: 表面色（#ffffff / #1e293b）
  - `text.primary`: 文本主色
  - `border.default`: 边框色
  - `card.default`: 卡片背景色
  - `button.primary`: 按钮主色
  - `header`: 头部强调色
- **颜色选项**：`colorPalettes` 提供 8 种主题色（blue, red, purple, green, orange, pink, teal, indigo）
- **字体配置**：`fontFamilies` 支持 5 种字体（inter, jetbrains-mono, monospace, sans-serif, serif）
- **设计工具函数**：`lib/theme-utils.ts` 提供 `useThemeColor`, `useTextColor` 等 Hook

## 关键开发工作流

- 启动开发：`npm run dev`
- 静态导出：`npm run build`（输出到 `out/`）
- 代码检查：`npm run lint`
- PDF 预览/导出：仅用 Chrome 浏览器"另存为 PDF"保证分页与链接可用（见 README）。
- 静态导出配置见 `next.config.js`（`output: 'export'`，图片 unoptimized 适配 GitHub Pages）。

## GitHub Actions 工作流 (.github/workflows/nextjs.yml)

- **触发条件**：main 分支 push 或手动触发
- **构建步骤**：
  1. 检出代码
  2. 检测包管理器（npm/yarn）
  3. 设置 Node.js 20
  4. 配置 GitHub Pages
  5. 缓存 `.next/cache`
  6. 安装依赖
  7. **生成最后更新时间**：`node scripts/gen-last-update.js`
  8. **生成关键词 JSON**：`node scripts/gen-keywords.js`
  9. 构建：`next build`
  10. 静态导出：`next export`
  11. 上传产物到 Pages
- **部署**：自动部署到 GitHub Pages

## 组件与约定

### Server/Client 组件约定

- **Server 组件**（默认）：纯展示组件、只接收 props 渲染 UI、无交互逻辑
- **Client 组件**（`"use client"`）：使用 React hooks、事件处理、浏览器 API、第三方客户端库
- 详见 `docs/2026-03-13-server-client-analysis.md`

### 当前组件分布

- **Client 组件 (27个)**：所有 Provider、Switcher、Section 组件、需要动画的组件
- **Server 组件 (14个)**：label 系列、icons、container、header

### 开发原则

- **组件默认是 Server**：不需要交互的组件保持 Server
- **只在叶子组件使用 Client**：将 "use client" 放在组件树末端
- **Context 需要 Providers**：所有 Context 提供者必须是 Client
- **数据在 Server 获取**：尽量在 Server 获取数据，传递 props 到 Client

- **Label 组件**：`components/labels/` 下三种：
  - `label.tsx`：纯文本标签
  - `label-with-link.tsx`：带链接标签
  - `label-with-graphic.tsx`：带图标标签
- **Section 组件**：每个 section 先导入三语数据，统一用对象映射选内容与标题，再用对象映射切换 live/pdf 样式，最后包裹 `<Section>`。包含以下 section 组件：
  - `full-resume.tsx`：完整简历组件，控制 live/pdf 模式渲染
  - `header-section.tsx`：头部信息 section
  - `summary-section.tsx`：个人简介 section
  - `work-section.tsx`：工作经验 section
  - `education-section.tsx`：教育背景 section
  - `skill-section.tsx`：技能 section
  - `project-section.tsx`：项目 section
  - `experience.tsx`：经历展示组件
  - `section.tsx`：通用 section 容器组件
- **动画**：仅 live 模式用 `Motion`（`components/ui/motion.tsx`），PDF 跳过动画。
- **PrintProvider**（`components/print-provider.tsx`）：全局提供 `componentRef`、`handlePrint`，供 PDF 导出。
- **ActionButton** 触发 PDF 导出。
- **内容变更**：需同步三语数据，保持字段一致。

### 切换器组件

- **JobSwitcher**：工作类型切换组件，位于 `components/job/job-switcher.tsx`，支持 FULLSTACK、SOFTWARE、ML_RESEARCHER 三种工作类型切换。
- **JobSwitcherWrapper**：工作类型切换包装器组件，位于 `components/job/job-switcher-wrapper.tsx`，用于包装 JobSwitcher 提供更好的交互体验。
- **KeywordHighlighter**：关键词高亮组件，位于 `components/job/keyword-highlighter.tsx`，根据工作类型自动高亮相关内容。
- **JobStackKeywords**：工作类型关键词数据，位于 `components/job/job-stack-keywords.ts`，定义各工作类型对应的关键词。
- **LanguageSwitcher**：语言切换组件，位于 `components/lang/language-switcher.tsx`，支持英文、简体中文、繁体中文切换。
- **ThemeSwitcher**：主题切换组件，位于 `components/theme/theme-switcher.tsx`，支持浅色/深色模式切换。
- **FontSwitcher**：字体切换组件，位于 `components/font/font-switcher.tsx`，仅在开发环境显示。
- **ColorSwitcher**：颜色切换组件，位于 `components/color/color-switcher.tsx`，仅在开发环境显示。

### 其他组件

- **Header**：头部导航组件，位于 `components/header.tsx`，包含站点标题和导航链接。
- **Footer**：页脚组件，位于 `components/footer.tsx`，包含版权信息和社交链接。
- **PdfResumeContainer**：PDF 简历容器，位于 `components/pdf-resume-container.tsx`，用于 PDF 导出布局。
- **Container**：容器组件，位于 `components/ui/container.tsx`，提供统一的页面容器样式。
- **Icons**：图标组件，位于 `components/ui/icons.tsx`，提供项目中使用的所有图标。

### Context Providers

- **JobTypeProvider**：工作类型上下文，位于 `components/job/job-type-provider.tsx`，管理全局工作类型状态。
- **LanguageProvider**：语言上下文，位于 `components/lang/language-provider.tsx`，管理多语言切换。
- **ThemeProvider**：主题上下文，位于 `components/theme/theme-provider.tsx`，管理深色/浅色模式。
- **FontProvider**：字体上下文，位于 `components/font/font-provider.tsx`，管理字体切换。
- **ColorProvider**：颜色上下文，位于 `components/color/color-provider.tsx`，管理主题色切换。
- **PrintProvider**：打印上下文，位于 `components/print-provider.tsx`，管理 PDF 打印功能。

## 配置文件

- **content/config.ts**：集中管理站点元数据、个人信息、联系方式等配置。
- **app/keywords.json**：存储关键词数据，用于关键词高亮功能，由 `scripts/gen-keywords.js` 自动生成。
- **app/last-update.json**：存储最后更新时间，由 `scripts/gen-last-update.js` 自动生成。
- **lib/theme-config.ts**：设计系统配置，包含颜色、字体等主题配置。

## 工具库 (lib/)

- **theme-config.ts**：设计系统配置，包含颜色、字体等主题配置（见上文设计系统章节）。
- **theme-utils.ts**：主题工具函数，提供 `useThemeColor`, `useTextColor` 等 Hook。
- **keyword-utils.ts**：关键词工具函数，用于处理关键词高亮逻辑。
- **now-utils.ts**：时间工具函数，提供当前时间相关功能。
- **utils.ts**：通用工具函数，包含 class 合并等常用工具。

## 类型定义 (types/)

- TypeScript 类型定义文件目录，包含以下类型：
  - `education.d.ts`：教育经历类型定义
  - `project.d.ts`：项目类型定义
  - `skill-category.d.ts`：技能分类类型定义
  - `summary.d.ts`：个人简介类型定义
  - `work-experience.d.ts`：工作经验类型定义

## API 路由

- **GitHub Star API**：`app/api/github/star/route.ts`，用于获取 GitHub star 数量。

## 文档 (docs/)

项目开发过程中产生的文档目录，包含：
- 重构计划文档
- 问题分析文档
- 简历集文档
- ATS 指南文档
- 关键词切换更新文档
- Star 故事线分析文档
- GitHub popularity 路线图文档
- 变更汇总文档
- **Server/Client 组件分析文档**：分析所有组件的渲染类型及 Next.js 最佳实践

## 依赖说明

- `framer-motion`（live 动画）
- `react-to-print`（PDF 导出）
- `next-themes`（深色模式）
- `@radix-ui/react-tooltip`（提示）
- `lucide-react`（图标）
- `tailwind-merge`（class 合并）
- `clsx`（条件类名）

## 常见修改

- **加内容**：改 `content/{en,zh,zh-hk}/`，三语同步，PDF 预览分页。
- **改主题色**：修改 `lib/theme-config.ts` 中的 `themeColors` 和 `colorPalettes`。
- **调 PDF 排版**：改 `globals.css` 的 `@media print`，用 px 单位，分页用 `break-inside: avoid`。
- **添加工作类型**：修改 `components/job/job-switcher.tsx` 中的 jobOptions 数组。
- **修改关键词映射**：更新 `app/keywords.json` 或修改 `scripts/gen-keywords.js` 生成逻辑。
- **修改字体选项**：更新 `lib/theme-config.ts` 中的 `fontFamilies`。

## 重要约定

- **所有语言/usage 分支必须用对象映射，禁止 if-else/三元。**
- **PDF 样式用 px 单位和自定义字号，不用 rem。**
- **所有视觉差异组件都要有 live/pdf 两套。**
- **PDF 仅用 Chrome 另存为 PDF 测试。**
- **工作类型切换和关键词高亮功能需要保持同步更新。**
- **开发环境专用功能**（FontSwitcher, ColorSwitcher）通过 `process.env.NODE_ENV === "development"` 控制显示。

如有不清楚或遗漏之处，请反馈补充。
