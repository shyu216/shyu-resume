# Server/Client 组件分析文档

## 概述

本文档分析 `shyu-resume` 项目中所有组件的 Server/Client 渲染状态，并提供 Next.js 13 App Router 下的最佳实践指南。

## 组件渲染状态汇总

### Client 组件 (27个)

需要 `"use client"` 指令的组件，通常因为使用了：

- React Hooks (useState, useEffect, useContext, useRef 等)
- 浏览器 API (window, document, localStorage 等)
- 事件处理 (onClick, onChange 等)
- 第三方客户端库 (framer-motion, react-to-print 等)

| 组件路径 | 原因分析 |
|---------|---------|
| **color/** | |
| `color-switcher.tsx` | 使用 useState, useTheme 管理颜色切换状态 |
| `color-provider.tsx` | 使用 useState, createContext 提供颜色上下文 |
| **font/** | |
| `font-switcher.tsx` | 使用 useState, useTheme 管理字体切换状态 |
| `font-provider.tsx` | 使用 useState, createContext 提供字体上下文 |
| **job/** | |
| `job-switcher.tsx` | 使用 useState 管理工作类型切换状态 |
| `job-switcher-wrapper.tsx` | 使用 useJobType context |
| `job-type-provider.tsx` | 使用 useState, createContext, localStorage 持久化 |
| **lang/** | |
| `language-switcher.tsx` | 使用 useState 切换语言 |
| `language-provider.tsx` | 使用 useState, createContext 管理语言状态 |
| **section/** | |
| `section.tsx` | 使用 useJobType context 进行关键词高亮 |
| `full-resume.tsx` | 使用 useJobType, usage props 切换 live/pdf 模式 |
| `header-section.tsx` | 使用 useJobType, framer-motion 动画 |
| `summary-section.tsx` | 使用 useJobType context |
| `skill-section.tsx` | 使用 useJobType context 进行技能筛选 |
| `work-section.tsx` | 使用 useJobType context 进行经历筛选 |
| `project-section.tsx` | 使用 useJobType context 进行项目筛选 |
| `education-section.tsx` | 使用 useJobType context |
| **theme/** | |
| `theme-switcher.tsx` | 使用 useTheme 管理深色/浅色模式 |
| `theme-provider.tsx` | 使用 useState, createContext 提供主题上下文 |
| **ui/** | |
| `tooltip.tsx` | 使用 @radix-ui 需要客户端渲染 |
| `action-button.tsx` | 使用 useState, onClick 事件处理 |
| `motion.tsx` | 使用 framer-motion 需要客户端渲染 |
| **其他** | |
| `footer.tsx` | 使用 useJobType context |
| `print-provider.tsx` | 使用 useState, createContext, useReactToPrint |
| `pdf-resume-container.tsx` | 使用 useState 管理 PDF 渲染 |
| `color-context-provider.tsx` | 使用 createContext, useState |
| `font-context-provider.tsx` | 使用 createContext, useState |

### Server 组件 (14个)

无需 `"use client"` 指令的组件，通常只负责：

- 静态数据渲染
- 纯展示逻辑
- 接收 props 并渲染 UI
- 使用第三方 Server Components

| 组件路径 | 说明 |
|---------|------|
| **labels/** | |
| `label.tsx` | 纯展示组件，只接收 props 渲染文本 |
| `label-with-link.tsx` | 纯展示组件，接收 href props 渲染链接 |
| `label-with-graphic.tsx` | 纯展示组件，接收 icon props 渲染图标 |
| **ui/** | |
| `icons.tsx` | 纯展示组件，SVG 图标定义 |
| `container.tsx` | 纯展示组件，提供布局容器 |
| **其他** | |
| `header.tsx` | 纯展示组件，只接收 props 渲染导航 |

## Next.js 13 App Router 最佳实践

### 1. 组件默认行为

```
App Router 中，所有组件默认是 Server Component
只有明确需要客户端交互的组件才需要 "use client"
```

### 2. 何时使用 Client Component

| 场景 | 示例 |
|------|------|
| 使用 React Hooks | useState, useEffect, useContext, useRef |
| 使用浏览器 API | window, document, localStorage, sessionStorage |
| 处理用户事件 | onClick, onChange, onSubmit |
| 使用客户端库 | framer-motion, react-to-print, @radix-ui/* |
| 使用自定义 Hook | 任何调用了上述内容的 Hook |

### 3. 最佳实践原则

#### 3.1 最小化 Client 组件

```typescript
// ❌ 不推荐：将整个页面标记为 client
"use client"
export default function Page() {
  const [count, setCount] = useState(0)
  return <ServerComponent />
}

// ✅ 推荐：只在必要的叶子组件使用 client
export default function Page() {        // Server Component
  return <ClientComponent />           // 只渲染 client 部分
}
```

#### 3.2 组合模式：Server + Client

```typescript
// ServerComponent.tsx - 获取数据
export default async function ServerComponent() {
  const data = await fetchData()
  return <ClientComponent data={data} />
}

// ClientComponent.tsx - 处理交互
"use client"
export function ClientComponent({ data }) {
  const [filtered, setFiltered] = useState(data)
  return <List items={filtered} onFilter={setFiltered} />
}
```

#### 3.3 Context 穿透策略

```typescript
// provider.tsx - 必须 client
"use client"
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return <ThemeContext.Provider value={{ theme, setTheme }}>
    {children}
  </ThemeContext.Provider>
}

// layout.tsx - 包裹 provider
export default function RootLayout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

// 叶子组件 - 使用 context
"use client"
export function ThemedButton() {
  const { theme } = useContext(ThemeContext)
  return <button className={theme}>Click</button>
}
```

#### 3.4 传递 Server 数据到 Client

```typescript
// ❌ 不推荐：在 client 中获取数据
"use client"
export function BadComponent() {
  const data = await fetch('/api/data') // 错误！
  return <Display data={data} />
}

// ✅ 推荐：在 server 获取，传递 props
// ServerComponent.tsx
export default async function ServerComponent() {
  const data = await fetchData()
  return <ClientComponent data={data} />
}

// ClientComponent.tsx
"use client"
export function ClientComponent({ data }) {
  // data 已经是 server 预获取的数据
  return <Display data={data} />
}
```

### 4. 当前项目分析

#### 4.1 可优化的组件

以下组件可能可以优化为 Server/Client 分离：

| 组件 | 当前状态 | 优化建议 |
|------|---------|---------|
| `header.tsx` | Server | ✅ 正确，应保持 Server |
| `label.tsx` | Server | ✅ 正确，应保持 Server |
| `icons.tsx` | Server | ✅ 正确，应保持 Server |
| `section/*.tsx` | Client | 可考虑拆分：数据获取(s) + 渲染(c) |

#### 4.2 合理使用 Client 的组件

以下组件正确使用 Client 标记：

| 组件 | 原因 |
|------|------|
| 所有 Provider | 必须使用 createContext, useState |
| 所有 Switcher | 必须使用 useState, onClick |
| Section 组件 | 需要 useJobType context 和动画 |

#### 4.3 当前项目架构分析

```
layout.tsx (Server)
├── ThemeProvider (Client)
├── LanguageProvider (Client)
├── JobTypeProvider (Client)
├── FontProvider (Client)
├── ColorProvider (Client)
└── page.tsx (Server)
    └── full-resume.tsx (Client)
        ├── header-section.tsx (Client)
        ├── summary-section.tsx (Client)
        ├── work-section.tsx (Client)
        ├── project-section.tsx (Client)
        ├── education-section.tsx (Client)
        ├── skill-section.tsx (Client)
        └── section.tsx (Client)
```

这个架构是合理的，因为：

1. **Providers 必须 Client**：需要 Context 和 State
2. **Page 是 Server**：可以做一些服务端预渲染优化
3. **Section 是 Client**：需要根据 JobType 动态渲染

### 5. 性能优化建议

#### 5.1 减少 Client Bundle 大小

```typescript
// 方案1：动态导入 client 组件
import dynamic from 'next/dynamic'

const HeavyClientComponent = dynamic(
  () => import('./HeavyClientComponent'),
  { ssr: false }  // 只在客户端加载
)

// 方案2：分离交互逻辑
// ServerComponent.tsx
export default function Page() {
  return (
    <div>
      <StaticContent />           // Server: 静态内容
      <InteractiveWrapper>       // Client: 交互包装
        <HeavyClientPart />       // Client: 重客户端逻辑
      </InteractiveWrapper>
    </div>
  )
}
```

#### 5.2 预渲染策略

```typescript
// 对于不需要立即交互的 client 组件，可以延迟加载
const LazySearch = dynamic(
  () => import('./Search'),
  { 
    loading: () => <Skeleton />,
    ssr: false  // 搜索组件不需要 SEO，可以跳过 SSR
  }
)
```

## 总结

| 分类 | 数量 | 占比 |
|------|------|------|
| Client 组件 | 27 | 66% |
| Server 组件 | 14 | 34% |

### 关键原则

1. **组件默认是 Server**：不需要交互的组件保持 Server
2. **只在叶子组件使用 Client**：将 "use client" 放在组件树末端
3. **Context 需要 Providers**：所有 Context 提供者必须是 Client
4. **数据在 Server 获取**：尽量在 Server 获取数据，传递 props 到 Client

---

## 已知架构问题与优化建议

### 🔴 问题 1：lib/theme-utils.ts 是"隐性 Client"

**问题描述**：

`lib/theme-utils.ts` 导入了客户端 hooks：
- `useTheme` (from next-themes)
- `useColor` (from color-provider)

这导致所有导入它的组件被迫变成 Client。

**受影响的组件（14个）**：

| 组件 | 当前状态 | 理想状态 | 问题 |
|------|---------|---------|------|
| `label.tsx` | Client | Server | 导入 theme-utils |
| `label-with-link.tsx` | Client | Server | 导入 theme-utils |
| `label-with-graphic.tsx` | Client | Server | 导入 theme-utils |
| 其他 11 个 | Client | - | 本身就需要 client |

**优化方案**：

```typescript
// 方案：分离为两个文件

// lib/theme-config.ts (纯配置，Server 可用)
// 保留纯数据：themeColors, colorPalettes, fontFamilies

// lib/theme-utils.ts (Client hooks)
// 保留需要 hooks 的函数：useThemeColor, useThemeValue 等

// lib/theme-pure.ts (纯函数，Server 可用)
// 提取不需要 hooks 的工具函数
```

**预期收益**：减少 2-3 个 Client 组件

---

### 🟡 问题 2：useUsageMap 函数命名误导

**问题描述**：

`lib/utils.ts` 中的 `useUsageMap` 函数：
- 命名以 `use` 开头，看似 React Hook
- 实际只是一个普通函数（接收参数返回对象）
- 导致开发者误以为它是 hook

**当前实现**：

```typescript
// lib/utils.ts
export function useUsageMap<T>(
  map: Record<string, T>,
  usage: "live" | "pdf"
): T {
  return map[usage];
}
```

**优化方案**：

```typescript
// 重命名为纯函数风格
export function getUsageValue<T>(
  map: Record<string, T>,
  usage: "live" | "pdf"
): T {
  return map[usage];
}
```

**预期收益**：减少开发困惑，代码更清晰

---

### 🟡 问题 3：Section 组件可能过重

**问题描述**：

`section.tsx` 是所有 section 的容器组件，处理：
- 标题样式
- 边框颜色
- 主题颜色

每个 section 组件都导入它，可能导致不必要的 re-render。

**优化方案**：

考虑拆分职责：
- `SectionTitle.tsx` - 标题组件
- `SectionBorder.tsx` - 边框组件
- `SectionContainer.tsx` - 容器组件

---

### 📋 优化优先级

| 优先级 | 问题 | 收益 | 风险 | 建议 |
|--------|------|------|------|------|
| **低** | theme-utils 分离 | 低 | 中 | 性能不是瓶颈时不做 |
| **低** | useUsageMap 重命名 | 低 | 低 | 可做可不做 |
| **低** | Section 拆分 | 低 | 中 | 需求不明确时不做 |

### 🎯 何时考虑优化

1. **Bundle 大小成为问题** - 用 `@next/bundle-analyzer` 分析后发现 theme-utils 是瓶颈
2. **性能出现明显卡顿** - 通过 React DevTools Profiler 发现不必要的 re-render
3. **团队规模扩大** - 新成员对 "隐性 client" 概念感到困惑

---

### 📝 待完成项

- [ ] 评估 theme-utils 分离的实际收益
- [ ] 考虑重命名 useUsageMap 为 getUsageValue
- [ ] 监控 bundle 大小变化
- [ ] 定期回顾组件分布

