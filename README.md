# ShYu Resume

<div align="right">
  <a href="README.md">English</a> | <a href="README.zh.md">简体中文</a> | <a href="README.zh-hk.md">繁體中文</a>
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

- **Bilingual Vibes** ✌️ – Switch between Chinese (Simplified & Traditional) and English effortlessly
- **PDF-Ready Layout** 📄 – Perfect A4 formatting with smart pagination – no more broken pages!
- **Mobile-Friendly** 📱 – Looks fabulous on both desktop and mobile devices
- **Theme Customization** 🎨 – Red theme with tons of customizable options to match your style
- **Easy Content Management** 📝 – All your text lives in the organized `content` folder – just edit and go!
- **JD-Tailored** 🤖 – Tailor your Summary based on the job description so your resume gets noticed
- **Project Filter** 🎯 – Dynamically shows only the most relevant projects for each job type
- **One-Click PDF Export** 🖨️ – Generate beautifully formatted PDFs with a single click

## 🚀 Let's Get You Started

Ready to craft your dream resume? Let's go! 🌟

### What You'll Need

- Node.js 18+
- npm or yarn

### Installation

1. Install all the dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
2. Fire up the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser – ta-da! 🎊

### 🎨 Customization Modules

Here's the fun part – making this resume *yours*! We've organized everything into cute little modules:

#### 1️⃣ Content Editing

All your resume content lives happily in the `content` folder, organized by language:

| Folder | What's Inside |
|--------|---------------|
| `content/config.ts` | Your personal info, contact details, website settings |
| `content/en/` | English version |
| `content/zh/` | Simplified Chinese version |
| `content/zh-hk/` | Traditional Chinese version |

Just hop into these TypeScript files and sprinkle your magic – I mean, update your info! ✨

#### 2️⃣ Theme Customization

Want to change the colors and fonts? Configure them statically via this file:

| File | What It Does |
|------|--------------|
| `content/config.ts` | Centralized theme, font, color, and utility helpers (including `getColor` / `getFont`) |

#### 3️⃣ Job-Based Superpowers

This is the really cool part! 🎯

- **Job Type Switcher**: Use the job switcher in the interface to select the type of job you're after
- **Project Filter**: Dynamically shows only the projects that are most relevant to the selected job type

##### Adding Your Own Job Types

Want to add more job types? Here's how:

1. Edit job types in `components/job/job-switcher.tsx`
2. Tag entries with `jobTypes` in `content/*/work-experience.ts` and `content/*/projects.ts`

## 🤝 Join the Fun!

We'd love to have you! If you've got ideas for improvements or found any bugs:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your amazing changes
4. Commit your changes (`git commit -m 'Add your feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request – you're a contributor now! 🎉

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

---

Made with ❤️ by ShYu

---

