# Voice Memory 网站

Voice Memory macOS 应用的公开介绍网站：[在线查看](https://wyihao2010-code.github.io/VoiceMemory-website/)。

## 网站内容

- 深色响应式页面，用随滚动展开的动画介绍产品机制，不提供可操作的网页模拟软件。
- 以声纹识别、人工确认、纠错反馈和有条件的自动优化为叙事核心；本机录音与转写是形成声纹记忆的基础。
- 展示按需通过 API 或 ChatGPT 订阅额度生成 AI 摘要，以及 Agent 摘要草稿经应用内审核后反写录音的流程。
- 区分本机处理与主动触发的云端摘要；iCloud 同步暂不作为可用功能宣传。
- 「产品一览」使用设计稿渲染的主视觉图，页面已就地标注，不宣称其为真实界面截图。
- 录音阶段使用不含用户录音的真实 App 界面局部截图，人物和摘要阶段使用设计化动画。页面上的人物与摘要文字均为虚构示意；网站不读取麦克风、本机文件或应用数据库。
- 支持键盘导航和减少动态效果设置。

Voice Memory 仍处于本地开发阶段，暂无公开安装包。应用要求 macOS 14 或更新版本及 Apple Silicon Mac。

## 目录结构

- `index.html`、`styles.css`、`script.js`：无构建依赖的静态页面。
- `assets/`：图标、主视觉与截图。位图以 WebP 为主；`voice-memory-icon.png`、`voice-memory-recording.png` 保留为 `<picture>` 的兼容回退格式。
- `assets/og-cover.jpg`：社交分享卡片图（1200×630）。
- `sitemap.xml`、`robots.txt`：搜索引擎入口。

## 交互约定

- 视口 ≤820px 时导航收起为汉堡菜单。面板以 `aria-expanded` / `aria-controls` 标记状态，支持 Esc 关闭、点击链接自动收起、点击面板外收起，回到宽视口自动复位。
- 滚动时按章节高亮当前导航项，写入 `aria-current="true"`。
- `prefers-reduced-motion: reduce` 下停用全部动画与过渡。

## 本地预览

这是一个无构建依赖的静态网站，在本目录运行：

```sh
python3 -m http.server 8000
```

打开 <http://localhost:8000>。

## 发布前检查

```sh
node --check script.js
git diff --check
```

并在 1440 / 1024 / 820 / 390 四档宽度下确认：无横向溢出、图片全部加载、汉堡菜单可开合且自动收起、滚动高亮与所在章节一致、减少动态效果模式下内容不隐藏。
