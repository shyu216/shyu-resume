# ShYu Resume

A modern, bilingual resume builder built with Next.js and React, optimized for both web and PDF formats. This project is a enhanced version of [Markdown-React-Resume](https://github.com/Crayon-ShinChan/mr-resume), designed to create professional resumes that stand out to HR and ATS systems.

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

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Fork the repository
2. Clone your fork
   ```bash
   git clone https://github.com/YOUR-USERNAME/shyu-resume.git
   cd shyu-resume
   ```
3. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Customization

### Edit Content

All resume content is stored in the `content` folder, organized by language:

- `content/en/` - English content
- `content/zh/` - Simplified Chinese content
- `content/zh-hk/` - Traditional Chinese content

Simply edit the TypeScript files in these folders to update your resume information.

### Change Theme

Modify the theme settings in `components/theme/theme-provider.tsx` to customize colors and styling.

### Job-based Features

The resume builder includes intelligent job-based features:

1. **Job Type Selection**: Use the job switcher in the interface to select the type of job you're applying for
2. **Keyword Highlighting**: Automatically highlights skills and experiences relevant to the selected job type
3. **Project Filtering**: Dynamically filters your projects to show only those most relevant to the selected job type

### Customize Job Types

To add or modify job types and their associated keywords:

1. Edit the job types in `components/job/job-switcher.tsx`
2. Update keyword mappings in `components/job/job-stack-keywords.ts`

### Central Configuration

All customizable content is now centralized in a single configuration file for easy maintenance:

**File**: `content/config.ts`

This file contains:
- Site metadata (title, description, keywords)
- Personal information (name in different languages)
- Contact details (LinkedIn, GitHub, email, phone)

### Customize Header and Footer

#### Header

The header component is located at `components/header.tsx` and includes:
- Navigation bar
- Profile image (automatically pulled from GitHub based on your GitHub URL in config)
- Job type switcher
- Language switcher
- Theme switcher

To customize the header:
1. Edit `content/config.ts` to update your GitHub URL (for profile image)
2. Edit `components/header.tsx` to modify the layout or add/remove elements
3. Adjust styling using Tailwind CSS classes

#### Footer

The footer component is located at `components/footer.tsx` and includes:
- Copyright information (name pulled from config)
- Last update date (automatically generated)
- Multi-language support

To customize the footer:
1. Edit `content/config.ts` to update your name in different languages
2. Edit `components/footer.tsx` to modify the layout or add/remove elements
3. Adjust the date format or add additional information

## 📄 PDF Generation

1. Open your resume in Chrome
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Select **Save as PDF** as the destination
4. Click **Save** to download your resume as a PDF

> **Note**: For best results, use Chrome's "Save as PDF" feature. Firefox and Edge may not support all features.

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

### Other Language Versions

- [简体中文](README.zh.md) - Chinese (Simplified)
- [繁體中文](README.zh-hk.md) - Chinese (Traditional)