# ShYu 简历

<div align="right">
  <a href="README.md">English</a> | <a href="README.zh.md">简体中文</a> | <a href="README.zh-hk.md">繁體中文</a>
</div>

![Banner](public/images/banner.png)

嘿呀！👋 欢迎来到 **ShYu 简历** —— 一个超现代化的双语简历构建器，用 Next.js 和 React 精心打造！

这个小宝贝不仅能帮你做出美美的网页版简历，还能一键导出超好看的 PDF 格式哦～ 它是基于 [Markdown-React-Resume](https://github.com/Crayon-ShinChan/mr-resume) 改造的增强版，添加了超多贴心功能，让你的简历在 HR 和 ATS 系统面前闪闪发光！✨

## 📄 如何生成 PDF

别担心，简单到不行！跟着做就对啦：

1. 用 Chrome 打开你的简历（真的好用！）
2. 点击页面上的 **保存 PDF** 按钮
3. 打印对话框就会冒出来啦——酷酷的！
4. 选择 **另存为 PDF** 作为目标
5. 点 **保存** —— 搞定！🎉

> **小贴士**：想要最完美的 PDF 输出（版面超完美、链接也能保留），一定要用 Chrome！其他浏览器像 Edge、Firefox 可能会有些许不同。手机上的话，自定义字体可能无法完全显示。想要那种"哇塞"的效果：记得在打印设置里启用"背景图形"，把页边距设为"无"哦～ 拿走不谢！😉

## ✨ 好玩的功能

- **双语切换** ✌️ —— 轻松在中文（简体和繁体）与英文之间切换
- **PDF 排版** 📄 —— 完美的 A4 格式，智能分页，再也不怕页面错乱啦！
- **手机友好** 📱 —— 在电脑和手机上都很美腻
- **主题定制** 🎨 —— 8 种配色方案、5 种背景样式、5 种 PDF 样式、2 种字体家族，完全契合你的风格
- **内容管理超 easy** 📝 —— 所有文字都整整齐齐放在 `content` 文件夹里，编辑 so easy！
- **JD 微调** 🤖 —— 根据职位描述微调你的个人简介，让你的简历被"看见"
- **项目过滤** 🎯 —— 动态展示最匹配的职位项目
- **一键导出 PDF** 🖨️ —— 点点手指，美美的 PDF 立刻有！
- **深色模式** 🌙 —— 支持浅色/深色主题切换，护眼又舒适
- **职位档案切换** 💼 —— 秒切软件工程师、运维工程师、AI/MR 工程师档案，内容自动适配

## 🚀 让我们开始吧

准备好打造你梦想中的简历了吗？走起！🌟

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装步骤

1. 安装所有依赖
   ```bash
   npm install
   ```
2. 启动开发服务器
   ```bash
   npm run dev
   ```
3. 在浏览器打开 [http://localhost:3000](http://localhost:3000) —— 搞定！🎊

## 🎨 定制化指南

所有简历内容和视觉设置都存放在 `content` 文件夹及相关样式目录中：

| 文件/文件夹 | 内容说明 |
|-------------|----------|
| `content/config.ts` | 个人信息、职位档案、视觉主题绑定及可定制化配置 |
| `content/copy.ts` | 所有 UI 文本、标签和本地化字符串 |
| `content/en/` | 英文简历内容（个人简介、工作经历、项目经历、技能树、教育经历） |
| `content/zh/` | 简体中文简历内容 |
| `content/zh-hk/` | 繁体中文简历内容 |
| `app/globals.css` | 全局样式和 CSS 变量 |
| `app/bg-styles/` | 网页背景样式预设（5 种：default-grid、triangle-prism、lumen-beams、orbit-mesh、dot-matrix） |
| `app/pdf-styles/` | 简历 PDF 样式预设（5 种：accent、cards、blueprint、editorial、ribbon） |

### 🎯 视觉主题配置

在 `content/config.ts` 中，你可以自定义：

- **配色方案**（8 种）：`blue`（蓝）、`red`（红）、`purple`（紫）、`green`（绿）、`orange`（橙）、`pink`（粉）、`teal`（青）、`indigo`（靛）
- **背景样式**（5 种）：`default-grid`（默认网格）、`triangle-prism`（三角棱镜）、`lumen-beams`（光束）、`orbit-mesh`（轨道网格）、`dot-matrix`（点阵）
- **PDF 样式**（5 种）：`accent`（强调）、`cards`（卡片）、`blueprint`（蓝图）、`editorial`（编辑）、`ribbon`（丝带）
- **字体家族**（2 种）：`monospace`（等宽字体：JetBrains Mono、Fira Code）、`songti`（宋体：中文衬线）

每个职位档案（软件工程师、运维工程师、AI/MR 工程师、默认）都可以拥有独立的视觉预设组合！

### 📝 内容结构

每个语言文件夹包含：
- `summary.ts` – 针对不同职位类型的个人简介
- `work-experience.ts` – 带职位类型过滤的工作经历
- `projects.ts` – 带相关性评分的项目作品集
- `skills.ts` – 按领域分类的技能树
- `education.ts` – 教育背景

## 📚 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion（用于那些丝滑的动画效果）

## 📄 许可证

这个项目是开源的，基于 [MIT License](LICENSE)。随便用随便分享，爱咋咋地！💖

## 🌟 表示支持

如果觉得这个项目超棒或者很喜欢，请在 GitHub 上给它一个 ⭐️！我们会开心一整天！☀️
