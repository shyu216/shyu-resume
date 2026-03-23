# 2026-03-23 yunjin-resume 分支 Rebase 与 UI 适配计划

## 任务概览
将 main 分支的最新改动同步到 yunjin-resume 分支，并适配以下 UI 特性：
1. 职位选择器带 X 按钮的 UI（桌面端 + 移动端）
2. Summary Edit UI（可编辑的个人简介）
3. 保持 yunjin-resume 特有的内容（正文、三语支持、职位类型）

---

## 一、Git 操作流程

### 1. 当前分支状态
- **main 分支**: 最新版本，包含完整的 summary edit、job switcher with X、mobile UI
- **yunjin-resume 分支**: 基于旧版本，包含 yunjin 的定制化内容（日语/法语/中文三语，Performer/Composer/Director 职位）

### 2. Rebase 步骤
```bash
# 1. 确保在 yunjin-resume 分支
git checkout yunjin-resume

# 2. 拉取最新代码
git pull origin yunjin-resume

# 3. 获取 main 分支最新代码
git fetch origin main

# 4. 执行 rebase
git rebase origin/main
```

### 3. 预期冲突文件及解决方案

| 文件 | 冲突原因 | 解决方案 |
|------|---------|---------|
| `components/job/job-switcher.tsx` | main 有 X 按钮实现，yunjin 有旧版本 | 保留 main 的 X 按钮 UI，但适配 yunjin 的职位类型 |
| `components/job/job-switcher-mobile.tsx` | main 有 mobile 实现，yunjin 可能没有 | 保留 main 的 mobile UI |
| `components/section/summary-section.tsx` | main 有 edit UI，yunjin 是静态展示 | 保留 main 的 edit UI，但使用 yunjin 的内容数据 |
| `lib/job-types.ts` | main 是技术职位，yunjin 是艺术职位 | 保留 yunjin 的 Performer/Composer/Director |
| `content/*/summary.ts` | main 是技术简历内容，yunjin 是艺术内容 | 保留 yunjin 的艺术相关内容 |
| `content/*/*.ts` | 多语言内容差异 | 保留 yunjin 的日/法/中三语内容 |

---

## 二、Main 分支实现方法记录

### 1. Job Switcher with X Button (Desktop)
**文件**: `components/job/job-switcher.tsx`

**核心实现**:
- 使用 `useState` 记录 `previousJobType`，点击 X 时可在"全部"和"之前选择的职位"间切换
- X 按钮使用条件样式：`color: isNoneActive ? 'var(--color-white)' : 'var(--color-text-primary)'`
- 背景滑动条通过 `barPosition` 和 `barWidth` 状态控制，实现平滑过渡动画
- 使用 `document.fonts.ready` 确保字体加载后再计算位置

**关键代码模式**:
```tsx
const [previousJobType, setPreviousJobType] = useState<JobType>('FULLSTACK');

useEffect(() => {
  if (!isNoneActive) {
    setPreviousJobType(jobType);
  }
}, [jobType, isNoneActive]);

// X 按钮点击处理
onClick={() => {
  if (isNoneActive) {
    onJobTypeChange(previousJobType);
  } else {
    onJobTypeChange('NONE');
  }
}}
```

### 2. Job Switcher Mobile
**文件**: `components/job/job-switcher-mobile.tsx`

**核心实现**:
- 左右箭头切换职位，中间显示当前选中项
- 使用 `animatingJobType` 和 `animationDirection` 实现滑动动画
- 通过 `prevIndex` 和 `nextIndex` 计算循环导航

### 3. Summary Edit UI
**文件**: 
- `components/summary/summary-edit-provider.tsx` - 状态管理
- `components/summary/summary-edit-button.tsx` - 编辑按钮
- `components/summary/summary-bubbles.tsx` - 历史版本气泡
- `components/section/summary-section.tsx` - 编辑/展示切换

**核心实现**:
- 使用 React Context 管理编辑状态 `isEditing` 和 `editedContent`
- localStorage 存储历史版本，按 `jobType` 和 `language` 分类
- 编辑时使用 `<textarea>`，展示时使用 `<div>`
- 历史版本以彩色气泡形式展示在右侧

**关键代码模式**:
```tsx
const SummaryEditContext = createContext<{
  isEditing: boolean;
  editedContent: string;
  updateContent: (content: string) => void;
  getCurrentContent: () => string;
} | null>(null);
```

### 4. 三语支持架构
**文件**: `components/lang/language-provider.tsx`

**核心实现**:
- 支持 'en' | 'zh' | 'zh-hk' 三种语言
- 使用 Context 全局共享语言状态
- `useLanguageMap` hook 用于根据语言获取对应内容

---

## 三、适配计划

### 阶段 1: Rebase 并解决冲突
1. 执行 rebase
2. 对每个冲突文件，保留 main 的 UI 实现，但使用 yunjin 的内容
3. 推送更新后的分支

### 阶段 2: UI 适配
1. **Job Switcher**: 保留 X 按钮功能，但职位选项改为 yunjin 的 Performer/Composer/Director
2. **Mobile Job Switcher**: 直接采用 main 的实现
3. **Summary Edit**: 保留编辑功能，但 placeholder 和内容使用 yunjin 的艺术相关文本

### 阶段 3: 验证
1. 桌面端职位切换 + X 按钮功能正常
2. 移动端职位切换功能正常
3. Summary 编辑、保存、历史版本功能正常
4. 三语切换功能正常

---

## 四、文件修改清单

### 需要保留 Main 实现的文件（UI 组件）:
- `components/job/job-switcher.tsx` - 带 X 的桌面端职位切换器
- `components/job/job-switcher-mobile.tsx` - 移动端职位切换器
- `components/job/job-switcher-wrapper.tsx` - 响应式包装器
- `components/summary/summary-edit-provider.tsx` - 编辑状态管理
- `components/summary/summary-edit-button.tsx` - 编辑按钮
- `components/summary/summary-bubbles.tsx` - 历史版本气泡

### 需要保留 Yunjin 实现的文件（内容）:
- `lib/job-types.ts` - yunjin 的职位类型定义
- `content/ja/*.ts` - 日语内容
- `content/fr/*.ts` - 法语内容
- `content/zh/*.ts` - 中文内容（艺术相关）

### 需要合并的文件:
- `components/section/summary-section.tsx` - main 的 UI + yunjin 的内容
- `app/page.tsx` - 可能需要调整布局
- `app/layout.tsx` - 可能需要调整 provider

---

## 五、执行命令汇总

```bash
# 1. 切换到 yunjin-resume 分支
git checkout yunjin-resume

# 2. 拉取远程更新
git pull origin yunjin-resume

# 3. 获取 main 分支
git fetch origin main

# 4. 开始 rebase
git rebase origin/main

# 5. 解决冲突后，标记为已解决
git add .
git rebase --continue

# 6. 强制推送（因为 rebase 重写了历史）
git push origin yunjin-resume --force-with-lease
```

---

## 六、回滚方案

如果 rebase 出现问题，可以回滚：
```bash
# 查看 rebase 前的提交哈希
git reflog

# 回滚到 rebase 前的状态
git reset --hard <commit-hash-before-rebase>

# 强制推送恢复远程分支
git push origin yunjin-resume --force-with-lease
```
