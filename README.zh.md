# ShYu 简历

一个现代化的双语简历构建器，使用 Next.js 和 React 构建，为网页和 PDF 格式进行了优化。这个项目是 [Markdown-React-Resume](https://github.com/Crayon-ShinChan/mr-resume) 的增强版本，旨在创建专业的简历，在 HR 和 ATS 系统中脱颖而出。

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

### 先决条件

- Node.js 18+
- npm 或 yarn

### 安装

1. Fork 仓库
2. 克隆你的 fork
   ```bash
   git clone https://github.com/YOUR-USERNAME/shyu-resume.git
   cd shyu-resume
   ```
3. 安装依赖
   ```bash
   npm install
   # 或
   yarn install
   ```
4. 启动开发服务器
   ```bash
   npm run dev
   # 或
   yarn dev
   ```
5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 📝 定制

### 编辑内容

所有简历内容都存储在 `content` 文件夹中，按语言组织：

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

#### 可选主题颜色

项目支持 8 种主题颜色：**蓝色**、**红色**、**紫色**、**绿色**、**橙色**、**粉色**、**青色**、**靛蓝**

用户可以通过顶部的颜色选择器切换颜色。默认颜色为**红色**。

#### 可选字体

项目支持 5 种字体：**Inter**、**JetBrains Mono**、**System UI**、**Monospace**、**Serif**

默认字体为 **JetBrains Mono**。

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

### 自定义关键词生成脚本

你也可以修改 `scripts/gen-keywords.js` 文件来自定义关键词生成过程。这个脚本会被 workflow 调用，但具体实现细节仍在完善中。欢迎发挥你的才智，实现自己的关键词生成逻辑！

### 集中配置

所有可定制内容现在集中在一个配置文件中，便于维护：

**文件**：`content/config.ts`

此文件包含：
- 网站元数据（标题、描述、关键词）
- 个人信息（不同语言的姓名）
- 联系方式（LinkedIn、GitHub、邮箱、电话）

### 自定义页眉和页脚

#### 页眉

页眉组件位于 `components/header.tsx`，包括：
- 导航栏
- 个人资料图片（根据配置中的 GitHub URL 自动从 GitHub 拉取）
- 工作类型切换器
- 语言切换器
- 主题切换器

要自定义页眉：
1. 编辑 `content/config.ts` 更新你的 GitHub URL（用于个人资料图片）
2. 编辑 `components/header.tsx` 修改布局或添加/删除元素
3. 使用 Tailwind CSS 类调整样式

#### 页脚

页脚组件位于 `components/footer.tsx`，包括：
- 版权信息（从配置中获取姓名）
- 最后更新日期（自动生成）
- 多语言支持

要自定义页脚：
1. 编辑 `content/config.ts` 更新不同语言的姓名
2. 编辑 `components/footer.tsx` 修改布局或添加/删除元素
3. 调整日期格式或添加其他信息

## 📄 PDF 生成

1. 在 Chrome 中打开你的简历
2. 点击页面上的 **保存PDF** 按钮（由 Action Button 组件提供）
3. 打印对话框会自动打开
4. 选择 **另存为 PDF** 作为目标
5. 点击 **保存** 下载你的简历为 PDF 格式

> **注意**：为获得最佳效果，请使用 Chrome 的 "另存为 PDF" 功能。Firefox 和 Edge 可能不支持所有功能。

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

### 其他语言版本

- [English](README.md) - 英文版
- [繁體中文](README.zh-hk.md) - 繁体中文版
