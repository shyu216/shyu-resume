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

### 1. SSR 与客户端状态不一致问题

**问题描述**：
- 服务端渲染（SSR）时 `useState` 初始化使用 `localStorage`，但服务端 `typeof window === 'undefined'`
- 可能导致服务端和客户端初始状态不一致

**常见症状**：
- 刷新页面后颜色/字体突然变化
- 控制台出现 "Text content did not match" 警告

**解决方案**：
- 使用 `useEffect` 在客户端挂载后再读取 localStorage
- 或在 `useState` 初始化函数中同时处理 SSR 和客户端情况

```tsx
// ✅ 正确写法
const [headerColor, setHeaderColor] = useState<HeaderColorType>(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem("headerColor");
    if (validColors.includes(saved)) return saved;
  }
  return DEFAULT_COLOR;
});
```

---

### 2. LocalStorage 旧值导致的问题

**问题描述**：
- 开发过程中选择了某个颜色/字体并保存到 localStorage
- 代码更新后默认值变了，但 localStorage 仍保留旧值

**实际案例**：
- 项目初始默认颜色是 `"blue"`，后改为 `"red"`
- 用户在开发时选择了蓝色，localStorage 保存 `"blue"`
- 部署新版本后，用户看到的是蓝色而非预期的红色

**解决方案**：
- 验证 localStorage 中的值是否在有效列表中
- 无效值或空值时使用代码定义的默认值

```tsx
// ✅ 添加验证逻辑
if (savedColor) {
  const validColors = ['blue', 'red', 'purple', 'green', ...];
  if (validColors.includes(savedColor)) {
    return savedColor;
  }
}
return DEFAULT_COLOR;
```

---

### 3. Tailwind CSS 任意值语法错误

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

### 4. CSS 变量非响应式问题

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

### 5. 循环导入问题

**风险**：在 `lib/theme-utils.ts` 中导入 `@/components/color/color-provider` 时需谨慎。

**解决**：确保 color-provider 不依赖 theme-utils，或者使用延迟导入。

---

### 6. 默认值分散定义

**问题**：字体和颜色的默认值在多个地方定义，容易不一致：

| 文件 | 默认字体 | 默认颜色 |
|------|---------|---------|
| `font-provider.tsx` | `"jetbrains-mono"` | - |
| `color-provider.tsx` | - | `"red"` |
| `theme-utils.ts` | `"jetbrains-mono"` | - |

**建议**：未来可以考虑将所有默认值集中到 `theme-config.ts` 中统一管理。

---

### 7. 未使用的配置

项目中存在已定义但未使用的配置：

- `themeColors.button.primary` - 定义在 theme-config.ts，但所有按钮都使用 headerColor
- `themeColors.header` - 作为备用值存在，但现在由 colorPalettes 统一管理

**建议**：可以删除这些冗余代码，或者在文档中说明其用途。

---

### 8. Server-Side Rendering (SSR) 兼容性问题

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

### 9. 颜色切换不生效的排查步骤

如果遇到颜色切换不生效：

1. **检查 Context 是否正确包裹**：确保 `ColorProvider` 和 `ColorContextProvider` 在 `layout.tsx` 中正确包裹
2. **检查状态更新**：在 `setHeaderColor` 后添加 console.log 确认状态是否变化
3. **检查 CSS 变量**：在浏览器控制台执行 `getComputedStyle(document.documentElement).getPropertyValue('--header-color-light')` 确认变量是否设置
4. **检查是否使用了错误的读取方式**：确认使用的是 React Context 而非直接读取 CSS 变量

---

## UI 交互优化引发的问题

### 10. 字体切换导致 JobSwitcher Bar 错位

**问题描述**：
切换字体后，JobSwitcher 的滑动 bar 位置发生偏移，没有对齐到正确的按钮。

**原因**：
字体变化会影响按钮的宽度和位置，但 bar 的位置计算只在 `jobType` 变化时触发。

**解决方案**：
在 `useEffect` 依赖中添加 `fontFamily`，字体变化时重新计算 bar 位置：

```tsx
import { useFontFamily } from "@/components/font/font-provider";

const { fontFamily } = useFontFamily();

useEffect(() => {
  // 计算 bar 位置...
}, [jobType, fontFamily]); // 添加 fontFamily 依赖
```

---

### 11. ThemeSwitcher 初次加载显示闪电图标

**问题描述**：
页面初次加载时，主题切换按钮显示闪电图标（`Icons.Lightning`）而非太阳/月亮。

**原因**：
`theme` 初始值为 `undefined`，fallback 到闪电图标。

**解决方案**：
使用 `resolvedTheme` 替代 `theme`，它始终有确定的值：

```tsx
const ThemeIcon = React.useMemo(
  () => themes.find((t) => t.value === resolvedTheme)?.icon ?? Icons.Sun,
  [resolvedTheme]
);
```

---

### 12. ThemeSwitcher Tooltip 初次加载为空

**问题描述**：
初次进入页面时，主题切换按钮的 tooltip 内容为空。

**原因**：
`tooltipContent` 使用 `theme[theme]` 取值，但 `theme` 初始为 `undefined`。

**解决方案**：
改用 `resolvedTheme` 判断：

```tsx
const tooltipContent = resolvedTheme === "dark" ? tooltipMap.dark : tooltipMap.light;
```

---

### 13. JobSwitcher Bar 初始动画异常（扇形变圆柱）

**问题描述**：
页面加载时，JobSwitcher 的滑动 bar 先显示为一个点（扇形），然后突然变成正确宽度（圆柱）。

**原因**：
`barWidth` 初始值为 0，useEffect 计算需要时间，导致视觉上的"变形"过程。

**解决方案**：
添加 `isInitialized` 状态，初始时隐藏 bar，计算完成后再显示：

```tsx
const [isInitialized, setIsInitialized] = useState(false);

useEffect(() => {
  updateBarPosition();
  setIsInitialized(true); // 计算完成后显示
}, [jobType, fontFamily]);

// bar 样式
className={cn(
  "absolute rounded-full transition-all duration-300",
  !isInitialized && "opacity-0" // 未初始化时隐藏
)}
```

---

### 14. 头像旋转动画的交互细节

**需求**：
头像 hover 时旋转 360 度，离开后转完再复位。

**实现要点**：
- 使用 React state 管理旋转角度
- `transition: 'transform 1s ease'` 设置 1 秒过渡
- `setTimeout` 延迟复位，确保转完一圈

```tsx
const [rotation, setRotation] = useState(0);

const handleMouseEnter = () => {
  setRotation(rotation + 360);
};

const handleMouseLeave = () => {
  setTimeout(() => setRotation(0), 1000); // 1秒后复位
};
```

---

### 15. LanguageSwitcher 同时多个按钮放大

**问题描述**：
hover 语言按钮时，选中的按钮和 hover 的按钮同时放大，视觉混乱。

**解决方案**：
添加 `hoveredLang` 状态，确保同时只有一个按钮放大：

```tsx
const [hoveredLang, setHoveredLang] = useState<LanguageType | null>(null);

const shouldScale = isHovered || (isSelected && !hasHover);
// hover 的优先，没有 hover 时选中状态放大
```

---

## 文案优化记录

### 16. JobSwitcher Tooltip 文案改进

**原文案**：
- "Highlight keywords for Full Stack"
- "Highlight keywords for SWE"
- "Highlight keywords for ML"

**问题**：过于技术化，用户不理解"Highlight keywords"是什么意思。

**优化后**：
- "Full Stack Engineer — End-to-end development"
- "Software Engineer — System & architecture"
- "ML Researcher — AI & algorithms"

使用职位定位 + 能力描述，更清晰专业。

---

### 17. ThemeSwitcher Tooltip 文案改进

**原文案**：
- "Click to switch to Dark Mode"
- "Click to switch to Light Mode"

**问题**：过于啰嗦，"Click to" 是多余的。

**优化后**：
- "Switch to Dark"
- "Switch to Light"

简洁的动作导向文案。

---

## 联系链接优化

### 18. 手机号链接从 tel: 改为 sms:

**考虑**：简历场景下，HR/招聘方更可能发送短信而非直接拨打电话。

**改动**：
```tsx
// 从
href={`tel:${contact.phone.replace(/\s/g, '')}`}
// 改为
href={`sms:${contact.phone.replace(/\s/g, '')}`}
```
