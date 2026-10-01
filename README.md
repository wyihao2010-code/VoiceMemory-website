# Voice Memory 网站

Voice Memory macOS 应用的公开介绍网站：[在线查看](https://wyihao2010-code.github.io/VoiceMemory-website/)。

## 网站内容

- 深色响应式页面，用随滚动展开的动画介绍产品机制，不提供可操作的网页模拟软件。
- 以声纹识别、人工确认、纠错反馈和有条件的自动优化为叙事核心；本机录音与转写是形成声纹记忆的基础。
- 展示按需通过 API 或 ChatGPT 订阅额度生成 AI 摘要，以及 Agent 摘要草稿经应用内审核后反写录音的流程。
- 区分本机处理与主动触发的云端摘要；iCloud 同步暂不作为可用功能宣传。
- 录音阶段使用不含用户录音的真实 App 界面局部截图，人物和摘要阶段使用设计化动画。页面上的人物与摘要文字均为虚构示意；网站不读取麦克风、本机文件或应用数据库。
- 支持键盘导航和减少动态效果设置。

Voice Memory 仍处于本地开发阶段，暂无公开安装包。应用要求 macOS 14 或更新版本及 Apple Silicon Mac。

## 本地预览

这是一个无构建依赖的静态网站，在本目录运行：

```sh
python3 -m http.server 8000
```

打开 <http://localhost:8000>。发布前运行 `node --check script.js` 与 `git diff --check`，并检查桌面、手机和减少动态效果模式。
