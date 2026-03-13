# 2026-03-13 代码改动总结

## 概述

本次改动主要新增了 **个人简介（Summary）** 功能模块，并对主题切换系统进行了重构和优化。

---

## 新增文件

### 1. Summary 相关组件和内容

| 文件路径 | 说明 |
|---------|------|
| `components/section/summary-section.tsx` | Summary 组件，用于展示个人简介 |
| `content/en/summary.ts` | 英文版个人简介内容 |
| `content/zh/summary.ts` | 简体中文版个人简介内容 |
| `content/zh-hk/summary.ts` | 繁体中文版个人简介内容 |
| `types/summary.d.ts` | Summary 数据的 TypeScript 类型定义 |

### 2. Theme 相关工具

| 文件路径 | 说明 |
|---------|------|
| `lib/theme-config.ts` | 主题配置文件 |
| `lib/theme-utils.ts` | 主题工具函数 |

### 3. UI 组件目录

| 文件路径 | 说明 |
|---------|------|
| `components/color/` | 颜色相关组件目录 |
| `components/font/` | 字体相关组件目录 |

---

## 修改文件

### 配置文件

| 文件路径 | 改动说明 |
|---------|---------|
| `.github/copilot-instructions.md` | Copilot 配置更新 |
| `.github/workflows/nextjs.yml` | CI/CD 工作流更新 |
| `tailwind.config.ts` | Tailwind 配置更新 |

### 布局和全局组件

| 文件路径 | 改动说明 |
|---------|---------|
| `app/layout.tsx` | 布局组件更新 |

### Header 和导航

| 文件路径 | 改动说明 |
|---------|---------|
| `components/header.tsx` | Header 组件更新 |

### Label 组件

| 文件路径 | 改动说明 |
|---------|---------|
| `components/labels/label.tsx` | Label 组件更新 |
| `components/labels/label-with-link.tsx` | 带链接的 Label 组件更新 |

### 语言切换

| 文件路径 | 改动说明 |
|---------|---------|
| `components/lang/language-switcher.tsx` | 语言切换组件更新 |

### 主题切换

| 文件路径 | 改动说明 |
|---------|---------|
| `components/theme/theme-switcher.tsx` | 主题切换组件更新 |

### Section 组件

| 文件路径 | 改动说明 |
|---------|---------|
| `components/section/section.tsx` | 基础 Section 组件更新 |
| `components/section/education-section.tsx` | 教育经历 Section 更新 |
| `components/section/experience.tsx` | 经验 Section 更新 |
| `components/section/full-resume.tsx` | 完整简历 Section 更新 |
| `components/section/header-section.tsx` | 头部 Section 更新 |
| `components/section/project-section.tsx` | 项目 Section 更新 |
| `components/section/skill-section.tsx` | 技能 Section 更新 |
| `components/section/work-section.tsx` | 工作经历 Section 更新 |

### UI 组件

| 文件路径 | 改动说明 |
|---------|---------|
| `components/ui/action-button.tsx` | 动作按钮组件更新 |
| `components/ui/tooltip.tsx` | Tooltip 组件更新 |

### 工具函数

| 文件路径 | 改动说明 |
|---------|---------|
| `lib/utils.ts` | 工具函数更新 |

### 其他组件

| 文件路径 | 改动说明 |
|---------|---------|
| `components/job/job-switcher.tsx` | 职位切换组件更新 |

---

## 功能亮点

1. **个人简介模块**：新增多语言支持的个人简介功能
2. **主题系统重构**：优化了主题切换的实现方式
3. **UI 组件增强**：增强了 Label、Tooltip、Button 等组件
4. **颜色和字体系统**：新增独立的颜色和字体组件目录

---

## 注意事项

- 所有新增的 content 文件都支持多语言（en, zh, zh-hk）
- 主题配置已独立到专用文件便于维护
- 部分组件可能需要进一步测试确保兼容性

---

## 常见错误总结（Next.js 特性）

### 1. Tailwind CSS 任意值语法错误

**错误写法**：
```tsx
// ❌ 这样不会生效！
pdf: "text-11px"
```

**正确写法**：
```tsx
// ✅ 使用方括号
pdf: "text-[11px]"
```

**原因**：Tailwind CSS 的任意值（arbitrary values）必须用方括号包裹，否则会被当作普通类名处理。

---

### 2. CSS 变量非响应式问题

**错误写法**（theme-utils.ts 原始版本）：
```tsx
// ❌ getComputedStyle 不是响应式的！
if (typeof document !== "undefined") {
  const cssVar = getComputedStyle(document.documentElement)
    .getPropertyValue(`--header-color-${theme}')
    .trim();
  if (cssVar) return cssVar;
}
```

**正确写法**：
```tsx
// ✅ 直接使用 React Context
const { headerColor } = useColor();
return colorPalettes[headerColor]?.[theme] || colorPalettes.red[theme];
```

**原因**：`getComputedStyle` 只在执行时读取一次 DOM，不会响应状态变化。需要使用 React 的响应式状态管理。

---

### 3. 循环导入问题

**风险**：在 `lib/theme-utils.ts` 中导入 `@/components/color/color-provider` 时需谨慎。

**解决**：确保 color-provider 不依赖 theme-utils，或者使用延迟导入。

---

### 4. 默认值分散定义

**问题**：字体和颜色的默认值在多个地方定义，容易不一致：

| 文件 | 默认字体 | 默认颜色 |
|------|---------|---------|
| `font-provider.tsx` | `"jetbrains-mono"` | - |
| `color-provider.tsx` | - | `"red"` |
| `theme-utils.ts` | `"jetbrains-mono"` | - |

**建议**：未来可以考虑将所有默认值集中到 `theme-config.ts` 中统一管理。

---

### 5. 未使用的配置

项目中存在已定义但未使用的配置：

- `themeColors.button.primary` - 定义在 theme-config.ts，但所有按钮都使用 headerColor
- `themeColors.header` - 作为备用值存在，但现在由 colorPalettes 统一管理

**建议**：可以删除这些冗余代码，或者在文档中说明其用途。

---

### 6. Server-Side Rendering (SSR) 兼容性问题

**注意**：在 `useHeaderColor` 等 hook 中使用了 `typeof document !== "undefined"` 检查，这是正确的做法。

**常见错误**：
```tsx
// ❌ 服务端会报错
const color = document.documentElement.style.color;
```

**正确做法**：
```tsx
// ✅ 添加检查
if (typeof document !== "undefined") {
  const color = document.documentElement.style.color;
}
```

---

### 7. 颜色切换不生效的排查步骤

如果遇到颜色切换不生效：

1. **检查 Context 是否正确包裹**：确保 `ColorProvider` 和 `ColorContextProvider` 在 `layout.tsx` 中正确包裹
2. **检查状态更新**：在 `setHeaderColor` 后添加 console.log 确认状态是否变化
3. **检查 CSS 变量**：在浏览器控制台执行 `getComputedStyle(document.documentElement).getPropertyValue('--header-color-light')` 确认变量是否设置
4. **检查是否使用了错误的读取方式**：确认使用的是 React Context 而非直接读取 CSS 变量
