# Proma (Personal Custom Fork)

> A personal fork of [ErlichLiu/Proma](https://github.com/ErlichLiu/Proma) with UI refinements, interaction improvements, and feature enhancements.

Next-generation AI desktop app with integrated agents. Local-first, multi-provider, fully open source.

[中文](./README.md)

![Proma Poster](https://img.erlich.fun/personal-blog/uPic/pb.png)

---

## Fork Changelog

This fork includes the following modifications and customizations on top of the original Proma project:

### Dependency Upgrades

- **Electron** 39.x → 40.x
- **electron-builder** 25.x → 26.x

### Features & UI Enhancements

- Conversation list dropdown menu (Rename / Pin / Share / Export / Delete), channel icon picker
- Redesigned new-conversation button + configurable shortcut (default ⌘N / Ctrl+N), synced to menu bar
- Chat token monitoring, Markdown export, tray icon toggle, ⌘, to open Settings
- Unified rounded-corner frosted-glass style for mode switcher and menus

### Simplifications

- Removed official provider and commercial references
- Removed context token badge from Agent view

---

## Original Project

The following content is from the original [Proma](https://github.com/ErlichLiu/Proma) project.

## Screenshots

### Chat Mode
Chat mode with multi-model switching and file attachment support.

![Proma Chat Mode](https://img.erlich.fun/personal-blog/uPic/tBXRKI.png)

### Agent Mode
Agent mode with general-purpose agent capabilities. Supports the full Claude series, MiniMax M2.1, Kimi K2.5, Zhipu GLM, and third-party channels. Elegant, clean, smooth, and confident streaming output.

![Proma Agent Mode](https://img.erlich.fun/personal-blog/uPic/3ZHWyA.png)

### Skill & MCP
Built-in Brainstorming and office suite Skills with MCP support. Automatically helps you find and install Skills through conversation.

![Proma Default Skills and Mcp](https://img.erlich.fun/personal-blog/uPic/PNBOSt.png)

### Memory
Shared memory across Chat and Agent modes — AI truly understands you and remembers your preferences and habits.

![Proma memory settings](https://img.erlich.fun/personal-blog/uPic/94B0LN.png)

![Proma memory demo](https://img.erlich.fun/personal-blog/uPic/Wi8QfB.png)

### Channel Configuration

Full-protocol LLM channel support for all domestic and international providers, configured via Base URL + API Key.

![Proma Mutili Provider Support](https://img.erlich.fun/personal-blog/uPic/uPPazd.png)

## Features

- **Multi-Provider Support** — Anthropic, OpenAI, Google, DeepSeek, MiniMax, Kimi, Zhipu GLM, and any OpenAI-compatible endpoint
- **AI Agent Mode** — Autonomous general agent powered by Claude Agent SDK
- **Streaming & Thinking** — Real-time streaming output with extended thinking visualization
- **Rich Rendering** — Mermaid diagrams, syntax-highlighted code blocks, Markdown
- **Attachments & Documents** — Upload images and parse PDF/Office/text files in conversations
- **Memory** — Shared memory across Chat and Agent, AI remembers your preferences, habits, and context across sessions
- **Local-First** — All data stored locally in `~/.proma/`, no database, fully portable
- **Themes** — Light and dark mode with system preference detection

## Getting Started

### Build from Source

```bash
# Clone the repository
git clone https://github.com/ErlichLiu/Proma.git
cd Proma

# Install dependencies
bun install

# Development mode
bun run dev

# Build distribution
cd apps/electron
bun run dist:mac    # macOS
bun run dist:win    # Windows
bun run dist:linux  # Linux
```

### Download Original Release

**[Download Proma](https://github.com/ErlichLiu/Proma/releases)**

## Configuration

### Adding a Channel

Go to **Settings > Channels**, click **Add Channel**, select a provider, and enter your API Key. Proma will auto-fill the correct API endpoint. Click **Test Connection** to verify, then **Fetch Models** to load available models.

### Agent Mode

Agent mode requires an **Anthropic** channel (or compatible endpoint). After adding one, go to **Settings > Agent** to select your channel and preferred model (Claude Sonnet 4 / Opus 4 recommended). The agent uses [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk) under the hood.

### Special Provider Endpoints

MiniMax, Kimi (Moonshot), and Zhipu GLM use dedicated API endpoints — these are auto-configured when you select the provider:

| Provider | Chat Mode | Agent Mode | Note |
|----------|----------|----------|------|
| MiniMax | `https://api.minimaxi.com/v1` | `https://api.minimaxi.com/anthropic` | Supports MiniMax Pro membership |
| Kimi | `https://api.moonshot.cn/v1` | `https://api.moonshot.cn/anthropic` | Supports Moonshot developer plan |
| Zhipu GLM | `https://open.bigmodel.cn/api/paas/v4` | `https://open.bigmodel.cn/api/anthropic` | Supports Zhipu developer plan |

## Tech Stack

- **Runtime** — Bun
- **Framework** — Electron 40 + React 18
- **State** — Jotai
- **Styling** — Tailwind CSS + shadcn/ui
- **Build** — Vite (renderer) + esbuild (main/preload)
- **Language** — TypeScript

## Credits

Proma is built on the shoulders of these great projects:

- [Shiki](https://shiki.style/) — Syntax highlighting
- [Beautiful Mermaid](https://github.com/lukilabs/beautiful-mermaid) — Diagram rendering
- [Cherry Studio](https://github.com/CherryHQ/cherry-studio) — Inspiration for multi-provider desktop AI
- [Lobe Icons](https://github.com/lobehub/lobe-icons) — AI/LLM brand icon set
- [Craft Agents OSS](https://github.com/lukilabs/craft-agents-oss) — Agent SDK integration patterns
- [MemOS](https://memos.openmem.net) — Memory feature implementation

## Contributing

Contributions welcome at the original project: [ErlichLiu/Proma](https://github.com/ErlichLiu/Proma)

## License

[MIT](./LICENSE)
