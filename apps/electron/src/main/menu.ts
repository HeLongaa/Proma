import { BrowserWindow, Menu, shell } from 'electron'
import { getSettings } from './lib/settings-service'

/**
 * 将内部快捷键格式转为 Electron accelerator 格式
 *
 * @example 'meta+n' => 'CmdOrCtrl+N'
 * @example 'ctrl+shift+n' => 'CmdOrCtrl+Shift+N'
 */
function toAccelerator(shortcut: string): string {
  if (!shortcut) return 'CmdOrCtrl+N'
  const parts = shortcut.toLowerCase().split('+')
  const key = parts[parts.length - 1] ?? 'n'
  const modifiers = parts.slice(0, -1)

  const modMap: Record<string, string> = {
    meta: 'CmdOrCtrl',
    ctrl: 'CmdOrCtrl',
    alt: 'Alt',
    shift: 'Shift',
  }
  const modStr = modifiers.map((m) => modMap[m] ?? m).join('+')
  return modStr ? `${modStr}+${key.toUpperCase()}` : `CmdOrCtrl+${key.toUpperCase()}`
}

export function createApplicationMenu(): Menu {
  const isMac = process.platform === 'darwin'
  const settings = getSettings()
  const newConvAccelerator = toAccelerator(settings.newConversationShortcut || (isMac ? 'meta+n' : 'ctrl+n'))

  const template: Electron.MenuItemConstructorOptions[] = [
    // 应用菜单 (仅 macOS)
    ...(isMac
      ? [
          {
            label: 'Proma',
            submenu: [
              { role: 'about' as const, label: '关于 Proma' },
              { type: 'separator' as const },
              {
                label: '偏好设置…',
                accelerator: 'CmdOrCtrl+,',
                click: () => {
                  const win = BrowserWindow.getFocusedWindow()
                  if (win && !win.isDestroyed()) {
                    win.webContents.send('menu:navigate-settings')
                  }
                },
              },
              { type: 'separator' as const },
              { role: 'services' as const, label: '服务' },
              { type: 'separator' as const },
              { role: 'hide' as const, label: '隐藏 Proma' },
              { role: 'hideOthers' as const, label: '隐藏其他' },
              { role: 'unhide' as const, label: '显示全部' },
              { type: 'separator' as const },
              { role: 'quit' as const, label: '退出 Proma' },
            ],
          },
        ]
      : []),

    // 文件菜单
    {
      label: '文件',
      submenu: [
        {
          label: '新建对话',
          accelerator: newConvAccelerator,
          click: () => {
            const win = BrowserWindow.getFocusedWindow()
            if (win && !win.isDestroyed()) {
              win.webContents.send('menu:new-conversation')
            }
          },
        },
        { type: 'separator' as const },
        isMac ? { role: 'close' as const, label: '关闭窗口' } : { role: 'quit' as const, label: '退出' },
      ],
    },

    // 编辑菜单
    {
      label: '编辑',
      submenu: [
        { role: 'undo' as const, label: '撤销' },
        { role: 'redo' as const, label: '重做' },
        { type: 'separator' as const },
        { role: 'cut' as const, label: '剪切' },
        { role: 'copy' as const, label: '复制' },
        { role: 'paste' as const, label: '粘贴' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' as const, label: '粘贴并匹配样式' },
              { role: 'delete' as const, label: '删除' },
              { role: 'selectAll' as const, label: '全选' },
            ]
          : [{ role: 'delete' as const, label: '删除' }, { type: 'separator' as const }, { role: 'selectAll' as const, label: '全选' }]),
      ],
    },

    // 视图菜单
    {
      label: '视图',
      submenu: [
        { role: 'reload' as const, label: '重新加载' },
        { role: 'forceReload' as const, label: '强制重新加载' },
        { role: 'toggleDevTools' as const, label: '切换开发者工具' },
        { type: 'separator' as const },
        { role: 'resetZoom' as const, label: '重置缩放' },
        { role: 'zoomIn' as const, label: '放大' },
        { role: 'zoomOut' as const, label: '缩小' },
        { type: 'separator' as const },
        { role: 'togglefullscreen' as const, label: '切换全屏' },
      ],
    },

    // 窗口菜单
    {
      label: '窗口',
      submenu: [
        { role: 'minimize' as const, label: '最小化' },
        { role: 'zoom' as const, label: '缩放' },
        ...(isMac
          ? [
              { type: 'separator' as const },
              { role: 'front' as const, label: '前置全部窗口' },
              { type: 'separator' as const },
              { role: 'window' as const, label: '窗口' },
            ]
          : [{ role: 'close' as const, label: '关闭' }]),
      ],
    },

    // 帮助菜单
    {
      label: '帮助',
      role: 'help' as const,
      submenu: [
        {
          label: '了解更多',
          click: async () => {
            await shell.openExternal('https://github.com/yourusername/proma')
          },
        },
      ],
    },
  ]

  return Menu.buildFromTemplate(template)
}
