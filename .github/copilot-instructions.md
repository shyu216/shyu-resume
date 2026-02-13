
# Copilot Instructions for shyu-resume

## 项目架构与核心模式

- **Next.js 13 静态导出简历站点**，支持 live（动画/交互）与 PDF（静态/A4 优化）双渲染模式。内容多语言（en/zh/zh-hk），A4 PDF 布局高度定制。
- **所有组件均接收 `usage: "live" | "pdf"`**，通过对象映射（object mapping）切换 live/PDF 样式与行为。严禁 if-else/三元表达式，务必用对象映射。
- **live 模式**：`rem` 单位、framer-motion 动画、交互 UI。
- **pdf 模式**：`px` 单位（如 `text-14px`）、无动画、静态排版。详见 `components/section/full-resume.tsx`。
- **PDF 内容渲染在隐藏 div**（`app/page.tsx`），用 `react-to-print` 捕获导出。
- **i18n 采用 Context**（`components/lang/language-provider.tsx`），内容存于 `content/{en,zh,zh-hk}/`，所有 section 组件用对象映射选择语言内容。
- **数据结构**：各 `content/` 下导出数组对象，字段结构需三语一致（如 `work_experience.ts`、`projects.ts`、`education.ts`、`skills.ts`）。
- **PDF 样式依赖 `@media print`**（`app/globals.css`），如 `section { break-inside: avoid; }`，A4 纸张、边距、分页优化。
- **自定义 Tailwind 字号**（`tailwind.config.ts`）：如 `text-11px`、`text-14px`，PDF 专用。
- **主题色为 rose-600**，全局查找 `rose-`。
- **深色模式**：`next-themes`，详见 `components/theme/theme-provider.tsx`。
- **所有样式用 Tailwind，禁止 CSS modules。**

## 关键开发工作流

- 启动开发：`npm run dev`
- 静态导出：`npm run build`（输出到 `out/`）
- 代码检查：`npm run lint`
- PDF 预览/导出：仅用 Chrome 浏览器“另存为 PDF”保证分页与链接可用（见 README）。
- 静态导出配置见 `next.config.js`（`output: 'export'`，图片 unoptimized 适配 GitHub Pages）。

## 组件与约定

- **Label 组件**：`components/labels/` 下三种（纯文本/带链接/带图标）。
- **Section 组件**：每个 section 先导入三语数据，统一用对象映射选内容与标题，再用对象映射切换 live/pdf 样式，最后包裹 `<Section>`。
- **动画**：仅 live 模式用 `Motion`（`components/ui/motion.tsx`），PDF 跳过动画。
- **PrintProvider**（`components/print-provider.tsx`）：全局提供 `componentRef`、`handlePrint`，供 PDF 导出。
- **ActionButton** 触发 PDF 导出。
- **内容变更**：需同步三语数据，保持字段一致。

## 依赖说明

- `framer-motion`（live 动画）、`react-to-print`（PDF 导出）、`next-themes`（深色模式）、`@radix-ui/react-tooltip`（提示）、`lucide-react`（图标）、`tailwind-merge`（class 合并）。

## 常见修改

- **加内容**：改 `content/{en,zh,zh-hk}/`，三语同步，PDF 预览分页。
- **改主题色**：全局搜 `rose-`。
- **调 PDF 排版**：改 `globals.css` 的 `@media print`，用 px 单位，分页用 `break-inside: avoid`。

## 重要约定

- **所有语言/usage 分支必须用对象映射，禁止 if-else/三元。**
- **PDF 样式用 px 单位和自定义字号，不用 rem。**
- **所有视觉差异组件都要有 live/pdf 两套。**
- **PDF 仅用 Chrome 另存为 PDF 测试。**

如有不清楚或遗漏之处，请反馈补充。
