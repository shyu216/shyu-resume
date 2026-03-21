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
- **主题定制** 🎨 —— 红色主题，还可随意调整，完全契合你的风格
- **内容管理超easy** 📝 —— 所有文字都整整齐齐放在 `content` 文件夹里，编辑 so easy！
- **JD 微调** 🤖 —— 根据JD微调你的 Summary，让你的简历被"看见"
- **智能关键词高亮** 🔍 —— 根据你投递的职位自动高亮相关技能和经验
- **项目过滤** 🎯 —— 动态展示最匹配的职位项目
- **一键导出 PDF** 🖨️ —— 点点手指，美美的 PDF 立刻有！

## 🚀 让我们开始吧

准备好打造你梦想中的简历了吗？走起！🌟

这个项目包含了一个基于 yunjin-resume [分支](https://github.com/shyu216/shyu-resume/tree/yunjin-resume) 和[网页](https://shyu216.github.io/shyu-resume/yunjin-resume/) 模板的客制化示例。看看 [PR #1](https://github.com/shyu216/shyu-resume/pull/1) 就能知道创建一个个性化简历需要多少工作量——50+ 文件改造，覆盖内容语言适配、工作种类重构全维度！超酷的对不对？这不仅是一次简历定制练习，更是上手 NextJS 开发、玩转 GitHub CI/CD 自动化部署的绝佳实战机会！从代码修改到流程配置，全程实操吃透前端工程化核心技能，快来动手试试吧！

### 准备工作

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
3. 在浏览器打开 [http://localhost:3000](http://localhost:3000) —— 哇！🎊

### 🎨 定制化模块

好玩的来啦——让简历变成"你的"！我们把它整理成了可爱的小模块：

#### 1️⃣ 内容编辑

所有的简历内容都乘乘地待在 `content` 文件夹里，按语言分类：

| 文件夹 | 里面有什么 |
|--------|-----------|
| `content/config.ts` | 你的个人信息、联系方式、网站设置 |
| `content/en/` | 英文版 |
| `content/zh/` | 简体中文版 |
| `content/zh-hk/` | 繁体中文版 |

直接跳进这些 TypeScript 文件，施展你的魔法——呃，我是说更新你的信息！✨

#### 2️⃣ 主题定制

想换颜色和字体？小事一桩！来看看这些文件：

| 文件 | 做什么的 |
|------|---------|
| `lib/theme-config.ts` | 颜色配置和字体设置 —— 视觉效果的精髓都在这啦 |
| `components/color/color-provider.tsx` | 默认主题颜色设置 |
| `components/font/font-provider.tsx` | 默认字体设置 |

#### 3️⃣ 职位相关超能力

这是最酷的部分！🎯

- **职位类型切换**：用界面上的切换器选择你想投递的职位
- **关键词高亮**：自动高亮与目标职位匹配的技能和经验
- **项目过滤**：动态展示与所选职位最相关的项目

##### 添加自定义职位类型

想加新的职位类型？很简单：

1. 在 `components/job/job-switcher.tsx` 编辑职位类型
2. 在 `components/job/job-stack-keywords.ts` 更新关键词映射

#### 4️⃣ AI 驱动的关键词生成（超厉害！🤖）

我们有个 AI 加持的关键词匹配系统！神奇的魔法配方：

1. 打包你的简历内容（工作经验 + 项目）
2. 发送给 AI 小助手，比如豆包
3. 客气地请它生成一个完整的 `keywords.json` 文件
4. 用生成的文件替换现有的 `app/keywords.json`

哇塞！你的简历现在超级适合各种职位类型，ATS 兼容性也 up up！🚀

你也可以修改 `scripts/gen-keywords.js` 文件来定制你的关键词生成过程。这个脚本会被 workflow 调用，但具体实现细节由你做主！发挥你的才智，实现你自己的关键词生成逻辑吧！

## 🤝 一起来玩！

欢迎加入！如果有好点子或者发现 bug：

1. Fork 这个仓库
2. 创建新分支 (`git checkout -b feature/your-feature`)
3. 搞点大动作（改改改）
4. 提交你的更改 (`git commit -m 'Add your feature'`)
5. 推送到分支 (`git push origin feature/your-feature`)
6. 打开 Pull Request —— 你也是贡献者啦！🎉

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

---

用 ❤️ 打造 by ShYu

---

