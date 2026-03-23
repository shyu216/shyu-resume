const fs = require('fs');
const path = require('path');

const files = [
  'components/color/color-switcher.tsx',
  'components/header-with-edit.tsx',
  'components/job/job-switcher.tsx',
  'components/lang/language-switcher.tsx',
  'components/summary/summary-bubbles.tsx',
  'components/theme/theme-switcher.tsx',
  'components/ui/icons.tsx',
  'components/section/summary-section.tsx',
  'components/section/skill-section.tsx',
  'components/section/header-section.tsx',
  'components/header.tsx',
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skip: ${file} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Pattern to match conflict blocks and keep the yunjin version (between ======= and >>>>>>>)
  // Format:
  // <<<<<<< HEAD
  // ...main version...
  // =======
  // ...yunjin version...
  // >>>>>>> bd2c748...
  const pattern = /<<<<<<< [\s\S]*?======\n([\s\S]*?)>>>>>>> [\s\S]*?\n/g;

  const newContent = content.replace(pattern, '$1');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Fixed: ${file}`);
  } else {
    console.log(`No conflicts: ${file}`);
  }
});

console.log('Done!');
