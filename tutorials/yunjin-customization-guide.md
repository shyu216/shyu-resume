# 云堇简历项目定制教程

本教程详细记录了如何将原简历项目改造为云堇（原神角色）的个人简历网站。

## 项目概述

**角色**: 云堇 (Yun Jin)
**身份**: 璃月戏曲名角，云翰社当家
**语言支持**: 中文（首选）、日语、法语
**职位类型**: 表演 / 创作 / 管理

---

## 实现步骤

### 1. 创建新分支

```bash
git checkout -b yunjin-resume
```

### 2. 修改个人信息

**文件**: `content/config.ts`

更新个人基本信息：
- 姓名: 云堇
- 职位: 璃月戏曲名角 / 云翰社当家
- 联系方式: 璃月港云翰社
- 社交媒体链接

### 3. 修改职位切换系统

**文件**: `components/job/job-switcher.tsx`

将原有的技术职位改为戏曲相关职位：
- `FULLSTACK` → `PERFORMER` (表演)
- `SOFTWARE` → `COMPOSER` (创作)
- `ML_RESEARCHER` → `DIRECTOR` (管理)

**文件**: `app/keywords.json`

更新各职位类型的关键词：
- **PERFORMER**: 京剧、昆曲、花旦、唱腔设计、身段表演等
- **COMPOSER**: 剧本创作、唱词编写、音乐设计、作曲等
- **DIRECTOR**: 剧团管理、演出策划、演员培训、传承教学等

**文件**: `lib/storage.ts`

更新存储系统中的职位类型和语言选项：
```typescript
language: LanguageType;  // zh | ja | fr
jobType: 'PERFORMER' | 'COMPOSER' | 'DIRECTOR';
```

**文件**: `components/job/job-type-provider.tsx`

更新默认职位类型：
```typescript
const [jobType, setJobType] = useState<JobType>('PERFORMER');
```

### 4. 修改语言支持

**文件**: `components/lang/language-provider.tsx`

更新支持的语言：
```typescript
export type LanguageType = "zh" | "ja" | "fr";
```

### 5. 创建多语言内容

创建三个语言目录：
- `content/zh/` - 中文内容
- `content/ja/` - 日语内容
- `content/fr/` - 法语内容

每个目录包含以下文件：
- `summary.ts` - 个人简介（按职位类型区分）
- `work-experience.ts` - 工作经历
- `projects.ts` - 项目经历
- `skills.ts` - 技能列表
- `education.ts` - 教育经历

#### 中文内容示例 (`content/zh/summary.ts`):
```typescript
export const summary: Summary = {
  performer: "璃月戏曲名角，云翰社当家。集剧作与演唱能力于一身的表演艺术家...",
  composer: "戏曲创作家，云翰社当家。在剧本创作与音乐设计方面有深厚造诣...",
  director: "云翰社当家，负责剧团全面管理与运营..."
};
```

### 6. 更新组件以使用新语言

修改以下组件，移除对旧语言（en, zh-hk）的引用：
- `components/section/summary-section.tsx`
- `components/section/skill-section.tsx`
- `components/section/education-section.tsx`
- `components/section/work-section.tsx`
- `components/section/project-section.tsx`

统一改为导入 zh, ja, fr 的内容。

### 7. 更新类型定义

**文件**: `types/summary.ts`

确保 Summary 类型包含新的职位类型：
```typescript
export type Summary = {
  performer: string;
  composer: string;
  director: string;
};
```

---

## 关键注意事项

### 引号嵌套问题

在 TypeScript 字符串中，避免在双引号字符串内直接使用双引号。解决方案：
- 使用中文引号「」代替英文引号 ""
- 或使用单引号包裹包含双引号的字符串

**错误示例**:
```typescript
"开创独特的"戏曲摇滚"风格"  // ❌ 语法错误
```

**正确示例**:
```typescript
"开创独特的「戏曲摇滚」风格"  // ✅ 使用中文引号
'开创独特的"戏曲摇滚"风格'    // ✅ 使用单引号包裹
```

### 语言切换实现

语言切换通过 `LanguageContext` 实现，组件通过 `useContext(LanguageContext)` 获取当前语言状态。

### 职位切换实现

职位切换通过 `JobTypeContext` 实现，组件通过 `useJobType()` 获取当前职位类型。

---

## 文件修改清单

### 配置文件
- [x] `content/config.ts` - 个人信息
- [x] `app/keywords.json` - 职位关键词
- [x] `lib/storage.ts` - 存储配置

### 组件文件
- [x] `components/job/job-switcher.tsx` - 职位切换UI
- [x] `components/job/job-type-provider.tsx` - 职位状态管理
- [x] `components/job/job-stack-keywords.ts` - 职位关键词获取
- [x] `components/lang/language-provider.tsx` - 语言状态管理

### 内容文件
- [x] `content/zh/summary.ts`
- [x] `content/zh/work-experience.ts`
- [x] `content/zh/projects.ts`
- [x] `content/zh/skills.ts`
- [x] `content/zh/education.ts`
- [x] `content/ja/summary.ts`
- [x] `content/ja/work-experience.ts`
- [x] `content/ja/projects.ts`
- [x] `content/ja/skills.ts`
- [x] `content/ja/education.ts`
- [x] `content/fr/summary.ts`
- [x] `content/fr/work-experience.ts`
- [x] `content/fr/projects.ts`
- [x] `content/fr/skills.ts`
- [x] `content/fr/education.ts`

### Section 组件
- [x] `components/section/summary-section.tsx`
- [x] `components/section/skill-section.tsx`
- [x] `components/section/education-section.tsx`
- [x] `components/section/work-section.tsx`
- [x] `components/section/project-section.tsx`
- [x] `components/section/header-section.tsx`

### 其他UI组件
- [x] `components/lang/language-switcher.tsx` - 语言切换按钮
- [x] `components/color/color-switcher.tsx` - 颜色切换
- [x] `components/font/font-switcher.tsx` - 字体切换
- [x] `components/theme/theme-switcher.tsx` - 主题切换
- [x] `components/ui/action-button.tsx` - 操作按钮
- [x] `components/footer.tsx` - 页脚

### 工具函数
- [x] `lib/utils.ts` - 更新 useLanguageMap 类型

### 类型定义
- [x] `types/summary.d.ts` - Summary 类型更新

### 删除的旧文件
- [x] `content/en/` - 英文内容目录（已删除）
- [x] `content/zh-hk/` - 繁体中文内容目录（已删除）

### 图片资源
- [x] `public/images/yunjin.png` - Header头像
- [x] `public/images/liyue.png` - 公司和学校图片1
- [x] `public/images/liyue2.png` - 公司和学校图片2

### 图标组件
- [x] `components/ui/icons.tsx` - 添加 Calendar, Palette, Heart, Database, Trophy 图标

---

## 云堇角色设定参考

### 基本信息
- **称号**: 红毹婵娟
- **所属**: 云翰社（璃月港戏曲剧团）
- **身份**: 当家（团长兼首席表演艺术家）

### 特点
- 集剧作与演唱能力于一身
- 唱腔甜美，扮相俏丽
- 表演灵动又富有情感
- 精通京剧、昆曲等传统戏曲
- 擅长花旦与青衣角色

### 代表作
- 《神女劈观》- 融合传统与现代的代表作

### 创新方向
- 探索将摇滚音乐元素融入传统戏曲
- 开创「戏曲摇滚」新流派

---

## 多语言关键词匹配方案

### 问题背景

对于戏曲这种专业领域，术语没有统一的英文缩写（不像计算机领域有 React、AWS 等通用缩写）。如何在一个代码库中维护多语言的关键词匹配？

### 解决方案

**使用中文关键词统一匹配，在其他语言内容中括号标注中文名词。**

#### 实现方式

1. **关键词文件** (`app/keywords.json`) 只使用中文关键词
2. **日语内容** 中在关键术语后标注中文：
   ```typescript
   "雲翰社（云翰社）の当主（当家）として..."
   "唱腔（唱腔）デザインは伝統と現代を融合..."
   ```
3. **法语内容** 中同样标注中文：
   ```typescript
   "Troupe Yunhan (云翰社)"
   "Directrice (当家)"
   "poème symphonique d'opéra (交响诗)"
   ```

#### 优势

- ✅ 一套中文关键词，三语通用
- ✅ 用户阅读时能理解专业术语的含义
- ✅ 代码维护简单，不需要维护三套关键词
- ✅ 关键词高亮功能在所有语言下都能正常工作

#### 示例对照

| 中文关键词 | 日语显示 | 法语显示 |
|-----------|---------|---------|
| 云翰社 | 雲翰社（云翰社） | Troupe Yunhan (云翰社) |
| 神女劈观 | 神女劈観（神女劈观） | La Divine Damoiselle du Désastre (神女劈观) |
| 当家 | 当主（当家） | Directrice (当家) |
| 唱腔 | 唱腔（唱腔） | chant (唱腔) |
| 戏曲进山区 | 戏曲進山区（戏曲进山区） | Opéra dans les Régions Montagneuses (戏曲进山区) |

---

## 关键词系统详解

### 关键词配置文件

**文件**: `app/keywords.json`

```json
{
  "PERFORMER": ["京剧", "昆曲", "花旦", "唱腔设计", ...],
  "COMPOSER": ["剧本创作", "唱词编写", "音乐设计", ...],
  "DIRECTOR": ["剧团管理", "演出策划", "演员培训", ...]
}
```

### 关键词匹配逻辑

1. **项目过滤**: 根据当前职位类型，过滤出包含相关关键词的项目
2. **技能过滤**: 根据当前职位类型，过滤出包含相关关键词的技能类别
3. **高亮显示**: 在 Experience 组件中使用 KeywordHighlighter 高亮匹配的关键词

### 如何添加新关键词

1. 从项目内容中提取专业术语
2. 从技能列表中提取技能名称
3. 根据术语所属的领域分类到 PERFORMER/COMPOSER/DIRECTOR
4. 确保日语和法语内容中也包含对应的中文括号标注

---

## 后续扩展建议

1. **添加更多语言**: 可以参照 ja/fr 的结构添加其他语言支持（如英语、韩语等）
2. **自定义主题**: 可以修改颜色配置以匹配云堇的角色配色（红色、金色系）
3. **添加图片**: 可以添加云堇的角色图片（注意版权问题）
4. **动画效果**: 可以添加戏曲相关的动画效果（如水袖飘动、脸谱变换）
5. **音频功能**: 可以添加戏曲唱段音频播放功能
6. **视频展示**: 可以嵌入戏曲表演视频

---

## 测试检查清单

- [ ] 中文内容显示正常
- [ ] 日语内容显示正常
- [ ] 法语内容显示正常
- [ ] 职位切换功能正常
- [ ] 语言切换功能正常
- [ ] 关键词过滤功能正常（切换职位时项目和技能正确过滤）
- [ ] 关键词高亮功能正常（匹配的关键词被正确高亮）
- [ ] 无控制台报错
- [ ] 移动端显示正常
- [ ] 构建成功 (`npm run build`)

---

## 常见问题排查

### 1. 引号嵌套导致的语法错误

**症状**: `Expected ',', got '戏曲摇滚'`

**原因**: 在双引号字符串中使用了英文双引号

**解决**: 使用中文引号「」或单引号包裹

### 2. 类型错误：LanguageType 不匹配

**症状**: `Type '"en"' is not assignable to type 'LanguageType'`

**原因**: 组件中使用了旧的语言类型（en, zh-hk）

**解决**: 更新组件，统一使用 zh, ja, fr

### 3. 图标未找到

**症状**: `Property 'Calendar' does not exist on type 'Icons'`

**原因**: 使用了未导入的图标

**解决**: 在 `components/ui/icons.tsx` 中添加缺失的图标导入和导出

### 4. 关键词不匹配

**症状**: 切换职位时，项目或技能没有正确过滤

**原因**: 关键词与内容中的术语不匹配

**解决**: 
- 检查 `app/keywords.json` 中是否包含对应关键词
- 检查日语/法语内容中是否有中文括号标注
- 确保关键词拼写与内容中的术语完全一致

### 5. 构建失败

**症状**: `npm run build` 报错

**常见原因**:
- TypeScript 类型错误
- 缺少导入
- 语法错误

**解决**:
```bash
# 先检查类型
npx tsc --noEmit

# 查看详细错误
npm run build 2>&1 | head -50
```

---

## 项目结构总结

```
shyu-resume/
├── app/
│   ├── keywords.json          # 职位关键词配置
│   └── ...
├── components/
│   ├── job/
│   │   ├── job-switcher.tsx   # 职位切换UI
│   │   ├── job-type-provider.tsx  # 职位状态管理
│   │   └── job-stack-keywords.ts  # 关键词获取
│   ├── lang/
│   │   ├── language-provider.tsx  # 语言状态管理
│   │   └── language-switcher.tsx  # 语言切换UI
│   ├── section/
│   │   ├── project-section.tsx    # 项目展示（含关键词过滤）
│   │   ├── skill-section.tsx      # 技能展示（含关键词过滤）
│   │   └── ...
│   └── ui/
│       └── icons.tsx          # 图标组件
├── content/
│   ├── zh/                    # 中文内容
│   ├── ja/                    # 日语内容
│   └── fr/                    # 法语内容
├── lib/
│   ├── keyword-utils.ts       # 关键词匹配工具
│   └── storage.ts             # 本地存储配置
├── public/
│   └── images/                # 图片资源
└── types/                     # TypeScript类型定义
```

---

## 核心设计模式

### 1. Context 模式

用于全局状态管理（语言、职位类型）：

```typescript
// 创建 Context
const LanguageContext = createContext<{
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}>({ language: "zh", setLanguage: () => {} });

// 使用 Context
const { language } = useContext(LanguageContext);
```

### 2. 自定义 Hook 模式

封装复杂逻辑，提供简洁接口：

```typescript
// useLanguageMap - 根据语言返回对应内容
const { data, title } = useLanguageMap({
  zh: { data: projectsZh, title: "项目经历" },
  ja: { data: projectsJa, title: "プロジェクト" },
  fr: { data: projectsFr, title: "Projets" },
}, language);
```

### 3. 关键词过滤模式

根据职位类型动态过滤内容：

```typescript
const filteredProjects = useMemo(() => {
  if (!keywords || keywords.length === 0) {
    return projects;
  }
  return projects.filter(project => 
    project.bullets?.some(bullet => hasKeywordMatches(bullet, keywords))
  );
}, [projects, keywords]);
```

---

## 性能优化建议

1. **useMemo**: 对过滤后的项目和技能使用 useMemo 缓存
2. **图片优化**: 使用 Next.js Image 组件优化图片加载
3. **代码分割**: 大型组件可以考虑动态导入
4. **字体优化**: 使用 next/font 优化字体加载

---

## 结语

本项目展示了如何将一个技术简历模板改造为戏曲艺术家的个人展示网站。通过合理的设计，实现了：

- 多语言支持（中/日/法）
- 多职位视角切换（表演/创作/管理）
- 智能关键词匹配与高亮
- 统一的关键词维护方案

希望这个教程对你有帮助！如有问题，欢迎交流。
