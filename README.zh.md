# ShYu 简历

<div align="right">
  <a href="README.md">English</a> | <a href="README.zh.md">简体中文</a> | <a href="README.zh-hk.md">繁體中文</a>
</div>

![Banner](public/images/banner.png)

一个现代化的双语简历构建器，使用 Next.js 和 React 构建，为网页和 PDF 格式进行了优化。这个项目是 [Markdown-React-Resume](https://github.com/Crayon-ShinChan/mr-resume) 的增强版本，旨在创建专业的简历，在 HR 和 ATS 系统中脱颖而出。

## 📄 PDF 生成

1. 在 Chrome 中打开你的简历
2. 点击页面上的 **保存PDF** 按钮（由 Action Button 组件提供）
3. 打印对话框会自动打开
4. 选择 **另存为 PDF** 作为目标
5. 点击 **保存** 下载你的简历为 PDF 格式

> **重要提示**：为获得最佳的 PDF 输出（版面与链接保留），请使用 Chrome，并在打印对话框中选择"另存为 PDF"。其他浏览器（Edge、Firefox 等）可能呈现不同。移动设备浏览器可能无法完全支持自定义字体。建议启用背景图形并将页边距设为"无"。

## ✨ 特性

- **双语支持**：创建中文（简体和繁体）和英文简历
- **优化的 PDF 布局**：完美的 A4 格式，具有适当的分页和样式
- **响应式设计**：在桌面和移动设备上都看起来很棒
- **主题定制**：红色主题，带有可定制选项
- **内容分离**：所有文本内容存储在组织良好的 `content` 文件夹中，便于编辑
- **ATS 友好**：为 applicant Tracking Systems 优化
- **基于工作的关键词高亮**：根据选择的工作类型自动高亮相关技能和经验
- **项目过滤**：动态过滤项目，只显示与所选工作类型相关的项目
- **打印为 PDF**：一键生成 PDF 格式，格式正确

## 🚀 开始使用

解锁简历定制实战！基于 yunjin-resume  [分支](https://github.com/shyu216/shyu-resume/tree/yunjin-resume)与[网页](https://shyu216.github.io/shyu-resume/yunjin-resume/) 模板，[需完成 50 + 文件深度改造](https://github.com/shyu216/shyu-resume/pull/1)，覆盖内容语言适配、工作种类重构全维度。这不仅是一次简历定制练习，更是上手 NextJS 开发、玩转 GitHub CI/CD 自动化部署的绝佳实战机会，从代码修改到流程配置，全程实操吃透前端工程化核心技能，快来动手试试！

### 先决条件

- Node.js 18+
- npm 或 yarn

### 安装

1. 安装依赖
   ```bash
   npm install
   # 或
   yarn install
   ```
2. 启动开发服务器
   ```bash
   npm run dev
   # 或
   yarn dev
   ```
3. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 编辑内容

所有简历内容都存储在 `content` 文件夹中，按语言组织：

- `content/config.ts` - 配置文件，包含网站元数据、个人信息、联系方式等
- `content/en/` - 英文内容
- `content/zh/` - 简体中文内容
- `content/zh-hk/` - 繁体中文内容

只需编辑这些文件夹中的 TypeScript 文件即可更新你的简历信息。

### 主题定制

修改以下文件中的主题设置来自定义颜色和样式：

| 文件 | 说明 |
|------|------|
| `lib/theme-config.ts` | 颜色配置 (colorPalettes)、字体配置 |
| `components/color/color-provider.tsx` | 默认主题颜色设置 |
| `components/font/font-provider.tsx` | 默认字体设置 |

### 基于工作的功能

简历构建器包含智能的基于工作的功能：

1. **工作类型选择**：使用界面中的工作切换器选择你申请的工作类型
2. **关键词高亮**：自动高亮与所选工作类型相关的技能和经验
3. **项目过滤**：动态过滤你的项目，只显示与所选工作类型最相关的项目

### 自定义工作类型

要添加或修改工作类型及其相关关键词：

1. 在 `components/job/job-switcher.tsx` 中编辑工作类型
2. 在 `components/job/job-stack-keywords.ts` 中更新关键词映射

### AI 驱动的关键词生成

关键词匹配系统由 AI 增强。在编写完工作经验和项目后，你可以：

1. 打包你的简历内容（工作经验和项目）
2. 将其发送给 AI 助手，如豆包
3. 请求它生成一个全面的 `keywords.json` 文件
4. 用生成的文件替换现有的 `app/keywords.json` 文件

这个 AI 生成的关键词列表将帮助优化你的简历以适应不同的工作类型，并提高 ATS 兼容性。

你也可以修改 `scripts/gen-keywords.js` 文件来自定义关键词生成过程。这个脚本会被 workflow 调用，但具体实现细节仍在完善中。欢迎发挥你的才智，实现自己的关键词生成逻辑！

## 🤝 贡献

欢迎贡献！如果你有改进或错误修复的想法，请：

1. Fork 仓库
2. 创建一个新分支 (`git checkout -b feature/your-feature`)
3. 进行你的更改
4. 提交你的更改 (`git commit -m 'Add your feature'`)
5. 推送到分支 (`git push origin feature/your-feature`)
6. 打开一个 Pull Request

## 📚 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion（用于动画）

## 📄 许可证

这个项目是开源的，在 [MIT License](LICENSE) 下可用。

## 🌟 显示你的支持

如果你发现这个项目有帮助，请在 GitHub 上给它一个 ⭐️！

---

用 ❤️ 构建 by ShYu

---
