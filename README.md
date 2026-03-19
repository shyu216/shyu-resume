# ShYu Resume

<div align="right">
  <a href="README.md">English</a> | <a href="README.zh.md">简体中文</a> | <a href="README.zh-hk.md">繁體中文</a>
</div>

![Banner](public/images/banner.png)

A modern, bilingual resume builder built with Next.js and React, optimized for both web and PDF formats. This project is a enhanced version of [Markdown-React-Resume](https://github.com/Crayon-ShinChan/mr-resume), designed to create professional resumes that stand out to HR and ATS systems.

## 📄 PDF Generation

1. Open your resume in Chrome
2. Click the **Save PDF** button on the page (provided by the Action Button component)
3. The print dialog will open automatically
4. Select **Save as PDF** as the destination
5. Click **Save** to download your resume as a PDF

> **Important note**: For the best PDF output (layout and link preservation), open the site in Chrome and choose "Save as PDF" as the print destination. Other browsers (Edge, Firefox) may render differently. Mobile browsers may not fully support custom fonts. For optimal results, enable background graphics and set margins to "None" in the print dialog.

## ✨ Features

- **Bilingual Support**: Create resumes in Chinese (Simplified and Traditional) and English
- **Optimized PDF Layout**: Perfect A4 formatting with proper pagination and styling
- **Responsive Design**: Looks great on both desktop and mobile devices
- **Theme Customization**: Red theme with customizable options
- **Content Separation**: All text content stored in organized `content` folder for easy editing
- **ATS Friendly**: Optimized for Applicant Tracking Systems
- **Job-based Keyword Highlighter**: Automatically highlights relevant skills and experiences based on selected job type
- **Project Filter**: Dynamically filters projects to show only those relevant to the selected job type
- **Print to PDF**: One-click PDF generation with proper formatting

## 🚀 Getting Started

Unlock resume customization practice! Based on the yunjin-resume [branch](https://github.com/shyu216/shyu-resume/tree/yunjin-resume) and [webpage](https://shyu216.github.io/shyu-resume/yunjin-resume/) template, [requires 50+ files deep transformation](https://github.com/shyu216/shyu-resume/pull/1), covering content language adaptation and job type reconstruction. This is not only a resume customization exercise, but also an excellent hands-on opportunity to learn NextJS development and GitHub CI/CD automated deployment. From code modification to process configuration, you can master core frontend engineering skills throughout the entire process. Come and try it!

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
2. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Edit Content

All resume content is stored in the `content` folder, organized by language:

- `content/config.ts` - Configuration file containing site metadata, personal information, contact details, etc.
- `content/en/` - English content
- `content/zh/` - Simplified Chinese content
- `content/zh-hk/` - Traditional Chinese content

Simply edit the TypeScript files in these folders to update your resume information.

### Theme Customization

Modify the theme settings in the following files to customize colors and styling:

| File | Description |
|------|-------------|
| `lib/theme-config.ts` | Color palette definitions (colorPalettes), font configurations |
| `components/color/color-provider.tsx` | Default header color setting |
| `components/font/font-provider.tsx` | Default font family setting |

### Job-based Features

The resume builder includes intelligent job-based features:

1. **Job Type Selection**: Use the job switcher in the interface to select the type of job you're applying for
2. **Keyword Highlighting**: Automatically highlights skills and experiences relevant to the selected job type
3. **Project Filtering**: Dynamically filters your projects to show only those most relevant to the selected job type

### Customize Job Types

To add or modify job types and their associated keywords:

1. Edit the job types in `components/job/job-switcher.tsx`
2. Update keyword mappings in `components/job/job-stack-keywords.ts`

### AI-Powered Keyword Generation

The keyword matching system is enhanced by AI. After writing your work experience and projects, you can:

1. Package your resume content (work experience and projects)
2. Send it to an AI assistant like Doubao
3. Request it to generate a comprehensive `keywords.json` file
4. Replace the existing `app/keywords.json` file with the generated one

This AI-generated keyword list will help optimize your resume for different job types and improve ATS compatibility.

You can also modify the `scripts/gen-keywords.js` file to customize the keyword generation process. This script is called by the workflow, but the implementation details are still being finalized. Feel free to unleash your creativity and implement your own keyword generation logic!

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or bug fixes, please:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add your feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

## 📚 Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Show Your Support

If you find this project helpful, please give it a ⭐️ on GitHub!

---

Built with ❤️ by ShYu

---
