# ShYu 履歷

<div align="right">
  <a href="README.md">English</a> | <a href="README.zh.md">简体中文</a> | <a href="README.zh-hk.md">繁體中文</a>
</div>

!\[Banner]\(public/images/banner.png null)

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
- **主題定製** 🎨 —— 紅色主題，還可隨意調整，完全契合你的風格
- **內容管理超easy** 📝 —— 所有文字都整整齊齊放在 `content` 資料夾裡，編輯 so easy！
- **JD 微調** 🤖 —— 根據JD微調你的 Summary，讓你的履歷被「看見」
- **專案過濾** 🎯 —— 動態展示最匹配的職位專案
- **一鍵導出 PDF** 🖨️ —— 點點手指，美美的 PDF 立刻有！

## 🚀 讓我們開始吧

準備好打造你夢想中的履歷了嗎？走起！🌟

### 準備工作

- Node.js 18+
- npm 或 yarn

### 安裝

1. 安裝依賴
   ```bash
   npm install
   # 或
   yarn install
   ```
2. 啟動開發伺服器
   ```bash
   npm run dev
   # 或
   yarn dev
   ```
3. 在瀏覽器打開 <http://localhost:3000> —— 哇！🎊

### 🎨 定製化模組

好玩的就來啦——讓履歷變成「你的」！我們把它整理成了可愛的小模組：

#### 1️⃣ 內容編輯

所有的履歷內容都乖乖地待在 `content` 資料夾裡，按語言分類：

| 資料夾                 | 裡面有什麼            |
| ------------------- | ---------------- |
| `content/config.ts` | 你的個人資訊、聯絡方式、網站設定 |
| `content/en/`       | 英文版              |
| `content/zh/`       | 簡體中文版            |
| `content/zh-hk/`    | 繁體中文版            |

直接跳進這些 TypeScript 檔案，施展你的魔法——呃，我是說更新你的資訊！✨

#### 2️⃣ 主題定製

想換顏色和字體？現在透過這個配置檔案做靜態設定：

| 檔案                                    | 做什麼的                     |
| ------------------------------------- | ------------------------ |
| `content/config.ts`                   | 統一管理主題、字體、顏色與工具函式（含 `getColor` / `getFont`） |

#### 3️⃣ 職位相關超能力

這是最酷的部分！🎯

- **職位類型切換**：用介面上的切換器選擇你想投遞的職位
- **專案過濾**：動態展示與所選職位最相關的專案

##### 新增自定義職位類型

想加新的職位類型？很簡單：

1. 在 `components/job/job-switcher.tsx` 編輯職位類型
2. 在 `content/*/work-experience.ts` 與 `content/*/projects.ts` 以 `jobTypes` 標註條目歸屬

## 🤝 一起來玩！

歡迎加入！如果有好點子或者發現 bug：

1. Fork 這個倉庫
2. 建立新分支 (`git checkout -b feature/your-feature`)
3. 搞點大動作（改改改）
4. 提交你的更改 (`git commit -m 'Add your feature'`)
5. 推送到分支 (`git push origin feature/your-feature`)
6. 打開 Pull Request —— 你也是貢獻者啦！🎉

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

***

用 ❤️ 打造 by ShYu

***

