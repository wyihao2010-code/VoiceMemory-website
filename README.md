# Voice Memory 网站

Voice Memory macOS 应用的公开介绍网站：[在线查看](https://wyihao2010-code.github.io/VoiceMemory-website/)。

## 网站内容

- 深色响应式页面，支持桌面和手机浏览。
- 可切换的应用界面示意：录音、项目、人物库、Agent 与事件。
- 录音转写的模拟播放、示例项目筛选与人物确认说明。
- 滚动入场动画，以及键盘导航和减少动态效果支持。

网站中的界面和内容均为示意，不读取麦克风或本机文件，也不连接 Voice Memory 的数据库。实际应用以 macOS 原生界面为准。

Voice Memory 目前是本地开发中的实验应用，尚未提供公开安装包。应用要求 macOS 14 或更新版本，以及 Apple Silicon Mac。网站不包含应用源码、用户录音、转写或声纹数据。

## 本地预览

这是一个无构建依赖的静态网站，在本目录运行：

```sh
python3 -m http.server 8000
```

打开 <http://localhost:8000>。
