# ShYu 简历

<div align="right">
  <a href="README.md">English</a> | <a href="README.zh.md">简体中文</a>
</div>

![Banner](public/images/banner.png)

基于 Next.js 构建的双语简历工具，支持职位定制内容展示和一键 PDF 导出（智能分页）。

## 功能

- **双语切换** — 英文 / 简体中文一键切换
- **职位定制** — 4 个档案（SWE、SRE、AI/MR、默认），每个档案有独立简介、工作经历和项目展示
- **一键导出 PDF** — 智能分页，内容自动适配 A4 页面，超链接保留
- **深色/浅色模式** — 支持两种主题
- **自托管字体** — 通过 `next/font` 本地加载霞鹜文楷字体，跨设备渲染一致
- **移动端适配** — 响应式布局，适配所有屏幕尺寸
- **多平台部署** — 支持 GitHub Pages、Vercel、Cloudflare Pages

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装

```bash
npm install
npm run dev
```

在浏览器打开 [http://localhost:3000](http://localhost:3000)。

### 构建静态导出

```bash
npm run build
```

静态文件输出在 `out/` 目录，可直接部署到 GitHub Pages、Vercel 或 Cloudflare Pages。

## 项目结构

```
content/
  config.ts         — 个人信息、站点配置、本地化工具函数
  copy.ts           — UI 文案和本地化字符串
  en/               — 英文简历内容
    summary.ts
    work-experience.ts
    projects.ts
    skills.ts
    education.ts
  zh/               — 中文简历内容
    summary.ts
    work-experience.ts
    projects.ts
    skills.ts
    education.ts
styles/
  globals.css       — Tailwind 指令和全局样式
  variables.css     — CSS 自定义属性（颜色、字体）
  base.css          — 基础元素重置和排版
  resume.css        — 简历专属布局类
  background.css    — 背景图案样式
  utilities.css     — 工具类
  print.css         — 打印专属样式覆盖
components/
  section/          — Section、Experience、header、summary、skills 等
  labels/           — Label、LabelWithLink、LabelWithGraphic
  lang/             — 语言切换 Provider
  job/              — 职位类型 Provider 和切换器
  theme/            — 主题 Provider
public/
  fonts/            — 自托管字体文件
  images/           — 公司 Logo、图标、Banner
```

## 内容定制

### 个人信息与站点配置

编辑 `content/config.ts`：

- 姓名、联系方式（邮箱、电话、LinkedIn、GitHub、微信）
- 站点标题、描述、关键词
- 语言特定的姓名排版（名/姓顺序）

### 简历内容

每个语言文件夹（`content/en/`、`content/zh/`）包含：

| 文件 | 说明 |
|------|------|
| `summary.ts` | 针对不同职位档案的个人简介 |
| `work-experience.ts` | 带职位类型过滤的工作经历 |
| `projects.ts` | 项目集（每个项目 2 条亮点） |
| `skills.ts` | 按领域分类的技能树 |
| `education.ts` | 教育背景 |

### 文案与本地化

编辑 `content/copy.ts` 可自定义：

- UI 标签（章节标题、按钮文字、提示文字）
- 语言特定排版偏好（姓名顺序、联系方式）
- 主题切换器、职位切换器文案

## 技术栈

- Next.js 14（静态导出）
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## 许可证

本项目基于 [MIT License](LICENSE) 开源。