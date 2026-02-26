This project is a 魔改 version of [Markdown-React-Resume](https://github.com/Crayon-ShinChan/mr-resume). This project is mainly for personal use, but you are welcome to take inspiration from it or adapt it for your own needs.

## What is 简历?

以言简意赅的言词描述出自己的经历, HR cares only about what aligns with the job description.

## What is new?

- [x] Support bilingual, Chinese and English.
- [x] Optimise A4 layout in PDF, using px for pdf and rem for web. Improved pagination with `break-inside` and `margin-top` tags.
- [x] Change theme color to red, and change logo.
- [x] Move text content to `data` folder.

## Troubleshooting

- [x] [By changing the `destination` field from `microsoft print to PDF` to `save as PDF` I can now click on the links.](https://github.com/MatthewHerbst/react-to-print/issues/507)
- [x] [The pdf's name can be put in \<title\> tag.](https://github.com/MatthewHerbst/react-to-print/issues/122) It works for Chrome, but not for Firefox.
- [x] Only Chrome's `save as PDF`(`另存为PDF`) fully support all features; Firefox and Edge do not.