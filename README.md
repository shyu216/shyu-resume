# ShYu Resume

<div align="right">
  <a href="README.md">English</a> | <a href="README.zh.md">简体中文</a>
</div>

![Banner](public/images/banner.png)

Hey there! 👋 Welcome to **ShYu Resume** – a modern, bilingual resume builder crafted with Next.js and React!

This little gem is here to help you create stunning resumes that not only look amazing on the web but also export beautifully to PDF. It's a fancy fork of [Markdown-React-Resume](https://github.com/Crayon-ShinChan/mr-resume), supercharged with extra goodies to make your resume pop and shine in front of HR and ATS systems!

## 📄 How to Generate PDF

No worries, it's super easy! Just follow these steps:

1. Open your resume in Chrome (trust us, it works best!)
2. Hit the **Save as PDF** button on the page
3. The print dialog will pop up – pretty cool, right?
4. Choose **Save as PDF** as your destination
5. Click **Save** and boom! Your PDF is ready! 🎉

> **Pro Tip**: For the *most* gorgeous PDF output with perfect layout and clickable links, Chrome is your best friend. Other browsers like Edge or Firefox might show things a bit differently. On mobile? Custom fonts might not render fully. For that *chef's kiss* result: enable background graphics and set margins to "None" in the print dialog. You're welcome! 😉

## ✨ What's Cool About This

- **Bilingual Vibes** ✌️ – Switch between Chinese and English effortlessly
- **PDF-Ready Layout** 📄 – Perfect A4 formatting with smart pagination – no more broken pages!
- **Mobile-Friendly** 📱 – Looks fabulous on both desktop and mobile devices
- **Theme Customization** 🎨 – 8 color palettes, 5 background styles, 5 PDF styles, and 2 font families to match your style
- **Easy Content Management** 📝 – All your text lives in the organized `content` folder – just edit and go!
- **JD-Tailored** 🤖 – Tailor your Summary based on the job description so your resume gets noticed
- **Project Filter** 🎯 – Dynamically shows only the most relevant projects for each job type
- **One-Click PDF Export** 🖨️ – Generate beautifully formatted PDFs with a single click
- **Dark Mode Support** 🌙 – Comfortable viewing experience in both light and dark themes
- **Job Profile Switching** 💼 – Instantly switch between SWE, SRE, AI/MR profiles with tailored content

## 🚀 Let's Get You Started

Ready to craft your dream resume? Let's go! 🌟

### What You'll Need

- Node.js 18+
- npm or yarn

### Installation

1. Install all the dependencies
   ```bash
   npm install
   ```
2. Fire up the development server
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser – ta-da! 🎊

## 🎨 Customization Guide

All your resume content and visual settings live in the `content` folder and related style directories:

| File/Folder | What's Inside |
|-------------|---------------|
| `content/config.ts` | Personal info, job profiles, visual theme bindings, and customizable configurations |
| `content/copy.ts` | All UI text, labels, and localization strings |
| `content/en/` | English resume content (summary, work experience, projects, skills, education) |
| `content/zh/` | Simplified Chinese resume content |
| `app/globals.css` | Global styles and CSS variables |
| `app/bg-styles/` | Webpage background style presets (5 styles: default-grid, triangle-prism, lumen-beams, orbit-mesh, dot-matrix) |
| `app/pdf-styles/` | Resume PDF style presets (5 styles: accent, cards, blueprint, editorial, ribbon) |

### 🎯 Visual Theme Configuration

In `content/config.ts`, you can customize:

- **Color Palettes** (8 options): `blue`, `red`, `purple`, `green`, `orange`, `pink`, `teal`, `indigo`
- **Background Styles** (5 options): `default-grid`, `triangle-prism`, `lumen-beams`, `orbit-mesh`, `dot-matrix`
- **PDF Styles** (5 options): `accent`, `cards`, `blueprint`, `editorial`, `ribbon`
- **Font Families** (2 options): `monospace` (JetBrains Mono, Fira Code), `songti` (Chinese serif)

Each job profile (SWE, SRE, AIMR, NONE) can have its own visual preset combination!

### 📝 Content Structure

Each language folder contains:
- `summary.ts` – Personal summary tailored for different job types
- `work-experience.ts` – Work history with job-type filtering
- `projects.ts` – Project portfolio with relevance scoring
- `skills.ts` – Skills categorized by domain
- `education.ts` – Educational background

## 📚 The Tech Stuff

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (for those smooth, silky animations)

## 📄 License

This project is open source under the [MIT License](LICENSE). Feel free to use it, share it, love it! 💖

## 🌟 Show Some Love

If you find this project helpful or just think it's neat, please give it a ⭐️ on GitHub! It makes our day! ☀️
