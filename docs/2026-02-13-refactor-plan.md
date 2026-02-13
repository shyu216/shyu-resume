# 简历数据文件索引（以 content 文件夹为准）

```
/content/
├── zh/
│   ├── work-experience.ts      # 工作经历（母语唯一源，9条，字段锁定）
│   ├── projects.ts             # 项目经历（rank 1/2/3，PDF仅印rank 1）
│   ├── education.ts            # 教育经历（墨大优异/WAM/院长名单/ELITE/奖学金）
│   ├── skills.ts               # 技能（AI/计算机视觉、云计算与运维、软件工程、语言）
├── en/
│   ├── work-experience.ts      # 英文版（字段、顺序、rank与中文完全一致）
│   ├── projects.ts
│   ├── education.ts
│   ├── skills.ts
├── zh-hk/
│   ├── work-experience.ts      # 繁体版（香港惯用语，字段、顺序、rank与中文完全一致）
│   ├── projects.ts
│   ├── education.ts
│   ├── skills.ts
```

# AI常见错误总结

- 不要重建 I18nText 对象，不要合并三语内容
- 不要适配器层，直接翻译字段内容，不改数据结构
- 不要直译中式表达，注意“优异”→“with Distinction”等
- 不要擅自加技能、加项目、加数据库、加 Docker/K8s/CUDA
- 不要增减字段、顺序、rank，三语内容必须一一对应
- 公司/学校名、技术名不译
- 如遇歧义或新内容，先暂停并反馈，由本人确认

# 简历内容方针

**后续任何修改，必须经过本人确认。**  
**未列出的技能，默认他不会。**  
**列出的技能，默认他能被拷打10分钟。**