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
- **设计工具函数**：`lib/theme-utils.ts` 提供 `useThemeColor`, `usePrimaryColor`, `useTextColor` 等 Hook

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

- **Label 组件**：`components/labels/` 下三种（纯文本/带链接/带图标）。
- **Section 组件**：每个 section 先导入三语数据，统一用对象映射选内容与标题，再用对象映射切换 live/pdf 样式，最后包裹 `<Section>`。
- **动画**：仅 live 模式用 `Motion`（`components/ui/motion.tsx`），PDF 跳过动画。
- **PrintProvider**（`components/print-provider.tsx`）：全局提供 `componentRef`、`handlePrint`，供 PDF 导出。
- **ActionButton** 触发 PDF 导出。
- **内容变更**：需同步三语数据，保持字段一致。

### 切换器组件

- **JobSwitcher**：工作类型切换组件，位于 `components/job/job-switcher.tsx`，支持 FULLSTACK、SOFTWARE、ML_RESEARCHER 三种工作类型切换。
- **LanguageSwitcher**：语言切换组件，位于 `components/lang/language-switcher.tsx`，支持英文、简体中文、繁体中文切换。
- **ThemeSwitcher**：主题切换组件，位于 `components/theme/theme-switcher.tsx`，支持浅色/深色模式切换。
- **FontSwitcher**：字体切换组件，位于 `components/font/font-switcher.tsx`，仅在开发环境显示。
- **ColorSwitcher**：颜色切换组件，位于 `components/color/color-switcher.tsx`，仅在开发环境显示。

## 配置文件

- **content/config.ts**：集中管理站点元数据、个人信息、联系方式等配置。
- **app/keywords.json**：存储关键词数据，用于关键词高亮功能，由 `scripts/gen-keywords.js` 自动生成。
- **app/last-update.json**：存储最后更新时间，由 `scripts/gen-last-update.js` 自动生成。
- **lib/theme-config.ts**：设计系统配置，包含颜色、字体等主题配置。

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
