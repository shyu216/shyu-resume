const fs = require('fs');
const path = require('path');

const removeSpaces = (dir) => {

  if (!fs.existsSync(dir)) {
    console.error('Directory not found:', dir);
    process.exit(1);
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

  const reHanLatin = /([\p{Script=Han}])[\s\u3000]+([\p{Script=Latin}])/gu;
  const reLatinHan = /([\p{Script=Latin}])[\s\u3000]+([\p{Script=Han}])/gu;
  // formatting markers around Latin (bold/italic) — more permissive inner matching to include punctuation
  const reFormatLatinHan = /([*_]+[^*_]+[*_]+)[\s\u3000]+([\p{Script=Han}])/gu; // e.g. **Next.js** 的 -> **Next.js**的
  const reHanFormat = /([\p{Script=Han}])[\s\u3000]+([*_]+[^*_]+[*_]+)/gu; // e.g. 中文 **Unity** -> 中文**Unity**
  // numbers and plus sign around Han
  const reHanDigit = /([\p{Script=Han}])[\s\u3000]+([0-9\+])/gu; // e.g. 中文 2024 -> 中文2024, 中文 +1 -> 中文+1
  const reDigitHan = /([0-9\+])[\s\u3000]+([\p{Script=Han}])/gu; // e.g. 2024 年 -> 2024年

  let changedCount = 0;

  for (const file of files) {
    const p = path.join(dir, file);
    try {
      const s = fs.readFileSync(p, 'utf8');
      let ns = s;
      // formatting-aware first
      ns = ns.replace(reHanFormat, '$1$2').replace(reFormatLatinHan, '$1$2');
      // general Han<->Latin
      ns = ns.replace(reHanLatin, '$1$2').replace(reLatinHan, '$1$2');
      // Han <-> digits/plus
      ns = ns.replace(reHanDigit, '$1$2').replace(reDigitHan, '$1$2');
      if (ns !== s) {
        const backup = p + '.bak';
        fs.copyFileSync(p, backup);
        fs.writeFileSync(p, ns, 'utf8');
        console.log('Updated', file, '-> backup:', path.basename(backup));
        changedCount++;
      } else {
        console.log('No change:', file);
      }
    } catch (err) {
      console.error('Error processing', file, err.message);
    }
  }

  console.log('Done. Files changed:', changedCount);
}



let dir = path.join(__dirname, '..', 'content', 'zh-hk');
removeSpaces(dir);
let zhDir = path.join(__dirname, '..', 'content', 'zh');
removeSpaces(zhDir);