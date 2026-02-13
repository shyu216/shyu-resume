# Copilot Instructions for shyu-resume

## Project Overview
Next.js 13 static-export resume website with dual rendering modes: live view (animated) and PDF export. Fork of Markdown-React-Resume with multilingual support (en/zh/zhhk) and optimized A4 PDF layout.

## Architecture & Critical Patterns

### Dual Rendering System
All components accept `usage: "live" | "pdf"` prop:
- **Live mode**: Uses `rem` units, framer-motion animations, interactive UI
- **PDF mode**: Uses `px` units (e.g., `text-14px`), no animations, static layout
- See `components/section/full-resume.tsx` for the pattern: conditionally wraps components in `<Motion>` only for live mode
- PDF content is rendered in a hidden div (`<div className="hidden">`) and printed via `react-to-print`

### Language System
- Context-based i18n via `LanguageContext` (`components/lang/language-provider.tsx`)
- Content stored in `content/{en,zh,zh-hk}/` as TypeScript exports
- All section components use **object mapping pattern** for language-specific content:
```typescript
const contentMap = {
  en: { data: dataEn, title: "TITLE" },
  zh: { data: dataZh, title: "标题" },
  "zh-hk": { data: dataZhHk, title: "標題" },
};
const { data, title } = contentMap[language];
```
- **Do not** use if-else chains for language selection; always use object mapping for readability

### Content Structure
Data files export arrays of objects with specific shapes:
- `work_experience.ts`: `{ head1, head2: {title, link, image}, head3, head4, bulletPoints[] }`
- `projects.ts`: Similar structure for project entries
- `education.ts`: Education history
- `skills.ts`: Technical skills grouped by category

When adding content, maintain consistency across all three language folders.

### PDF-Specific Styling
- **Critical**: PDF layout relies on `@media print` in `globals.css`:
  - `@page { size: 210mm 297mm; margin-top: 1cm; }`
  - `section { break-inside: avoid; page-break-inside: avoid; }`
- Custom font sizes in `tailwind.config.ts`: `'11px': '11px'`, `'14px': '14px'` for precise PDF typography
- Use **object mapping pattern** for usage-specific styles:
```typescript
const styleMap = {
  live: "text-sm",
  pdf: "text-11px",
};
<div className={styleMap[usage]} />
```
- **Do not** use ternary operators for usage conditionals; always use object mapping

### Print Provider Pattern
`components/print-provider.tsx` wraps the app and provides:
- `componentRef`: React ref pointing to PDF content
- `handlePrint()`: Triggers `react-to-print` library
- Used by `ActionButton` to trigger PDF generation
- **Note**: Only Chrome's "Save as PDF" fully supports all features (see README troubleshooting)

## Key Commands
```bash
npm run dev        # Start dev server
npm run build      # Static export to out/
npm run lint       # ESLint checks
```

## Static Export Configuration
`next.config.js` sets `output: 'export'` and `images: { unoptimized: true }` for GitHub Pages deployment.

## Component Patterns

### Label Components
Three variants in `components/labels/`:
- `label.tsx`: Plain text
- `label-with-link.tsx`: Clickable links
- `label-with-graphic.tsx`: Icon or image + text

### Section Components
All section components follow this structure:
1. Import all language variants of data
2. Use object mapping to select content based on `language`:
   ```typescript
   const contentMap = {
     en: { data: dataEn, title: "TITLE" },
     zh: { data: dataZh, title: "标题" },
     "zh-hk": { data: dataZhHk, title: "標題" },
   };
   const { data, title } = contentMap[language];
   ```
3. Use object mapping for `usage`-dependent styles
4. Wrap in `<Section>` wrapper with translated title

### Styling Conventions
- Uses `next-themes` for dark mode (see `components/theme/theme-provider.tsx`)
- Background uses custom gradient patterns in `app/layout.tsx` (grid + radial gradient)
- All styling is Tailwind-based; no CSS modules
- Dark mode variants: `dark:text-stone-300`, `dark:bg-stone-900/80`

## Common Modifications

### Adding New Content
1. Update data file in `content/{language}/` (e.g., `work_experience.ts`)
2. Add corresponding translations in all three language folders
3. Verify PDF layout with Chrome's print preview
4. Check `break-inside: avoid` is applied if content spans multiple lines

### Changing Theme Color
Primary color is rose/red (`text-rose-600`). Search for `rose-` to find all uses in section headers, buttons, etc.

### Adjusting PDF Layout
- Modify `@media print` rules in `globals.css`
- Test pagination with `break-inside: avoid` on sections
- Use fixed `px` units for PDF-specific typography
- Preview with Chrome > Print > "Save as PDF" (NOT "Microsoft Print to PDF")

## Important Notes
- **Always use object mapping** instead of if-else chains or ternary operators for `language` and `usage` conditionals
- **Do not** use `rem` units for PDF-specific styles; use custom Tailwind sizes like `text-14px`
- **Always** provide both live and PDF variants when modifying components with visual differences
- **Test** PDF generation in Chrome browser specifically (Firefox/Edge have limitations)
- Component ref forwarding is used in `FullResume` for print functionality
- Key for animated components includes `language` to force re-render on language change
