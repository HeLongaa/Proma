# Proma（个人定制版）

> 基于 [ErlichLiu/Proma](https://github.com/ErlichLiu/Proma) 的个人定制分支，在原始项目基础上进行了 UI 优化、交互改进和功能增强。

下一代集成通用 Agent 的 AI 桌面应用。本地优先、多供应商支持、完全开源。

[English](./README.en.md)

![Proma 海报](https://img.erlich.fun/personal-blog/uPic/pb.png)

---

## 本分支改动说明

本分支在原始 Proma 项目基础上进行了以下修改和个性化定制：

### 依赖升级

- **Electron** 39.x → 40.x
- **electron-builder** 25.x → 26.x

### 功能与 UI 增强

- 对话列表下拉菜单（重命名 / 置顶 / 分享 / 导出 / 删除）、渠道图标选择器
- 新建对话按钮重设计 + 可配置快捷键（默认 ⌘N / Ctrl+N）、菜单栏同步
- 对话 Token 监控、导出 Markdown、托盘图标开关、⌘, 快速打开设置
- 模式切换器与菜单统一圆角毛玻璃风格

### 精简

- 移除了官方 Provider 和商业化相关引用
- 移除了 Agent 视图中的上下文 Token 徽章

---

## 原始项目信息

以下内容来自原始 [Proma](https://github.com/ErlichLiu/Proma) 项目。

## Proma 截图

### Chat 模式
Proma 的聊天模式，支持多模型切换，支持附加文件对话。

![Proma Chat Mode](https://img.erlich.fun/personal-blog/uPic/tBXRKI.png)

### Agent 模式
Proma Agent 模式，通用 Agent 能力，支持 Claude 全系列、MiniMax M2.1、Kimi K2.5、智谱 GLM 等模型，支持第三方渠道。优雅、简洁、丝滑、确信的流式输出。

![Proma Agent Mode](https://img.erlich.fun/personal-blog/uPic/3ZHWyA.png)

### Skill & MCP
Proma Skills 和 MCP，默认内置 Brainstorming 和办公软件 Skill，支持通过对话就能自动帮助你寻找和安装 Skills。

![Proma Default Skills and Mcp](https://img.erlich.fun/personal-blog/uPic/PNBOSt.png)

### 记忆能力
Proma 记忆功能，Chat 和 Agent 共享记忆，让 AI 真正了解你、记住你的偏好和习惯。

![Proma memory settings](https://img.erlich.fun/personal-blog/uPic/94B0LN.png)

![Proma memory demo](https://img.erlich.fun/personal-blog/uPic/Wi8QfB.png)

### Proma 渠道配置功能

Proma 全协议大模型渠道支持，支持国内外所有渠道模型，通过 Base URL + API KEY 配置。

![Proma Mutili Provider Support](https://img.erlich.fun/personal-blog/uPic/uPPazd.png)

## 特性

- **多供应商支持** — Anthropic、OpenAI、Google、DeepSeek、MiniMax、Kimi、智谱 GLM，以及任何 OpenAI 兼容端点
- **AI Agent 模式** — 基于 Claude Agent SDK 的自主通用 Agent
- **流式输出 & 思考模式** — 实时流式响应，可视化扩展思考过程
- **丰富渲染** — Mermaid 图表、语法高亮代码块、Markdown
- **附件 & 文档解析** — 上传图片，解析 PDF/Office/文本文件内容到对话中
- **记忆功能** — Chat 和 Agent 共享记忆，AI 记住你的偏好、习惯和上下文，跨会话持续理解你
- **本地优先** — 所有数据存储在 `~/.proma/`，无数据库，完全可移植
- **主题切换** — 亮色/暗色模式，跟随系统偏好

## 快速开始

### 从源码构建

```bash
# 克隆仓库
git clone https://github.com/ErlichLiu/Proma.git
cd Proma

# 安装依赖
bun install

# 开发模式
bun run dev

# 构建分发包
cd apps/electron
bun run dist:mac    # macOS
bun run dist:win    # Windows
bun run dist:linux  # Linux
```

### 下载原始版本

**[下载 Proma](https://github.com/ErlichLiu/Proma/releases)**

## 配置指南

### 添加渠道

进入 **设置 > 渠道管理**，点击 **添加渠道**，选择供应商并输入 API Key。Proma 会自动填充正确的 API 地址。点击 **测试连接** 验证，然后 **获取模型** 加载可用模型列表。

### Agent 模式

Agent 模式需要一个 **Anthropic** 渠道（或兼容端点）。添加后，进入 **设置 > Agent** 选择渠道和模型（推荐 Claude Sonnet 4 / Opus 4）。底层使用 [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk)。

### 特殊供应商端点

MiniMax、Kimi（Moonshot）和智谱 GLM 使用专用 API 端点 — 选择供应商时会自动配置：

| 供应商 | Chat 模式 | Agent 模式 | 备注 |
|--------|----------|-----------|------|
| MiniMax | `https://api.minimaxi.com/v1` | `https://api.minimaxi.com/anthropic` | 支持 MiniMax Pro 会员 |
| Kimi | `https://api.moonshot.cn/v1` | `https://api.moonshot.cn/anthropic` | 支持 Moonshot 开发者套餐 |
| 智谱 GLM | `https://open.bigmodel.cn/api/paas/v4` | `https://open.bigmodel.cn/api/anthropic` | 支持智谱开发者套餐 |

## 技术栈

- **运行时** — Bun
- **框架** — Electron 40 + React 18
- **状态管理** — Jotai
- **样式** — Tailwind CSS + shadcn/ui
- **构建** — Vite（渲染进程）+ esbuild（主进程/预加载）
- **语言** — TypeScript

## 致谢

Proma 的诞生离不开这些优秀的开源项目：

- [Shiki](https://shiki.style/) — 语法高亮
- [Beautiful Mermaid](https://github.com/lukilabs/beautiful-mermaid) — 图表渲染
- [Cherry Studio](https://github.com/CherryHQ/cherry-studio) — 多供应商桌面 AI 的灵感来源
- [Lobe Icons](https://github.com/lobehub/lobe-icons) — AI/LLM 品牌图标集
- [Craft Agents OSS](https://github.com/lukilabs/craft-agents-oss) — Agent SDK 集成模式参考
- [MemOS](https://memos.openmem.net) — Proma 的记忆功能实现

## 参与贡献

欢迎参与原始项目的开发：[ErlichLiu/Proma](https://github.com/ErlichLiu/Proma)

## 开源许可

[MIT](./LICENSE)
