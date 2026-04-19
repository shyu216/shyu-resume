# ShYu 履歷

<div align="right">
  <a href="README.md">English</a> | <a href="README.zh.md">简体中文</a> | <a href="README.zh-hk.md">繁體中文</a>
</div>

![Banner](public/images/banner.png)

嘿呀！👋 歡迎來到 **ShYu 履歷** —— 一個超現代化的雙語履歷構建器，用 Next.js 和 React 精心打造！

這個小寶貝不僅能幫你做出美美的網頁版履歷，還能一鍵導出超好看的 PDF 格式哦～ 它是基於 [Markdown-React-Resume](https://github.com/Crayon-ShinChan/mr-resume) 改造的增強版，添加了超多貼心功能，讓你的履歷在 HR 和 ATS 系統面前閃閃發光！✨

## 📄 如何生成 PDF

別擔心，簡單到不行！跟著做就對啦：

1. 用 Chrome 打開你的履歷（真的好用！）
2. 點擊頁面上的 **儲存 PDF** 按鈕
3. 列印對話框就會冒出來啦——酷酷的！
4. 選擇 **另存為 PDF** 作為目標
5. 點 **儲存** —— 搞定！🎉

> **小貼士**：想要最完美的 PDF 輸出（版面超完美、連結也能保留），一定要用 Chrome！其他瀏覽器像 Edge、Firefox 可能會有些許不同。手機上的話，自定義字體可能無法完全顯示。想要那種「哇塞」的效果：記得在列印設定裡啟用「背景圖形」，把邊距設為「無」哦～ 拿走不謝！😉

## ✨ 好玩的功能

- **雙語切換** ✌️ —— 輕鬆在中文（簡體和繁體）與英文之間切換
- **PDF 排版** 📄 —— 完美的 A4 格式，智慧分頁，再也不怕頁面錯亂啦！
- **手機友好** 📱 —— 在電腦和手機上都很美膩
- **主題定製** 🎨 —— 8 種配色方案、5 種背景樣式、5 種 PDF 樣式、2 種字體家族，完全契合你的風格
- **內容管理超 easy** 📝 —— 所有文字都整整齊齊放在 `content` 資料夾裡，編輯 so easy！
- **JD 微調** 🤖 —— 根據職位描述微調你的個人簡介，讓你的履歷被「看見」
- **專案過濾** 🎯 —— 動態展示最匹配的職位專案
- **一鍵導出 PDF** 🖨️ —— 點點手指，美美的 PDF 立刻有！
- **深色模式** 🌙 —— 支援淺色/深色主題切換，護眼又舒適
- **職位檔案切換** 💼 —— 秒切軟體工程師、維運工程師、AI/MR 工程師檔案，內容自動適配

## 🚀 讓我們開始吧

準備好打造你夢想中的履歷了嗎？走起！🌟

### 環境要求

- Node.js 18+
- npm 或 yarn

### 安裝步驟

1. 安裝所有依賴
   ```bash
   npm install
   ```
2. 啟動開發伺服器
   ```bash
   npm run dev
   ```
3. 在瀏覽器開啟 [http://localhost:3000](http://localhost:3000) —— 搞定！🎊

## 🎨 定製化指南

所有履歷內容和視覺設定都存放在 `content` 資料夾及相關樣式目錄中：

| 檔案/資料夾 | 內容說明 |
|-------------|----------|
| `content/config.ts` | 個人資訊、職位檔案、視覺主題繫結及可定製化配置 |
| `content/copy.ts` | 所有 UI 文字、標籤和本地化字串 |
| `content/en/` | 英文履歷內容（個人簡介、工作經歷、專案經歷、技能樹、教育經歷） |
| `content/zh/` | 簡體中文履歷內容 |
| `content/zh-hk/` | 繁體中文履歷內容 |
| `app/globals.css` | 全域樣式和 CSS 變數 |
| `app/bg-styles/` | 網頁背景樣式預設（5 種：default-grid、triangle-prism、lumen-beams、orbit-mesh、dot-matrix） |
| `app/pdf-styles/` | 履歷 PDF 樣式預設（5 種：accent、cards、blueprint、editorial、ribbon） |

### 🎯 視覺主題配置

在 `content/config.ts` 中，你可以自定義：

- **配色方案**（8 種）：`blue`（藍）、`red`（紅）、`purple`（紫）、`green`（綠）、`orange`（橙）、`pink`（粉）、`teal`（青）、`indigo`（靛）
- **背景樣式**（5 種）：`default-grid`（預設網格）、`triangle-prism`（三角稜鏡）、`lumen-beams`（光束）、`orbit-mesh`（軌道網格）、`dot-matrix`（點陣）
- **PDF 樣式**（5 種）：`accent`（強調）、`cards`（卡片）、`blueprint`（藍圖）、`editorial`（編輯）、`ribbon`（絲帶）
- **字體家族**（2 種）：`monospace`（等寬字體：JetBrains Mono、Fira Code）、`songti`（宋體：中文襯線）

每個職位檔案（軟體工程師、維運工程師、AI/MR 工程師、預設）都可以擁有獨立的視覺預設組合！

### 📝 內容結構

每個語言資料夾包含：
- `summary.ts` – 針對不同職位型別的個人簡介
- `work-experience.ts` – 帶職位型別過濾的工作經歷
- `projects.ts` – 帶相關性評分的專案作品集
- `skills.ts` – 按領域分類的技能樹
- `education.ts` – 教育背景

## 📚 技術棧

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion（用於那些絲滑的動畫效果）

## 📄 許可證

這個專案是開源的，基於 [MIT License](LICENSE)。隨便用隨便分享，愛咋咋地！💖

## 🌟 表示支持

如果覺得這個專案超棒或者很喜歡，請在 GitHub 上給它一個 ⭐️！我們會開心一整天！☀️
