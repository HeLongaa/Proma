/**
 * 快捷键原子状态
 *
 * 管理"新建对话"的快捷键绑定，支持持久化到设置文件。
 */

import { atom } from 'jotai'

/** 快捷键 atom（内部格式如 "meta+n"、"ctrl+n"、"ctrl+shift+n"） */
export const newConversationShortcutAtom = atom<string>('')

/** 检测是否为 macOS */
const isMac =
  typeof navigator !== 'undefined' &&
  navigator.platform.toLowerCase().includes('mac')

/** 平台默认快捷键 */
export const DEFAULT_SHORTCUT = isMac ? 'meta+n' : 'ctrl+n'

/**
 * 将快捷键字符串格式化为用户可读的显示文本
 *
 * @example formatShortcutDisplay('meta+n') => '⌘N' (macOS) 或 'Win+N' (其他)
 * @example formatShortcutDisplay('ctrl+shift+n') => '⌃⇧N' (macOS) 或 'Ctrl+Shift+N' (其他)
 */
export function formatShortcutDisplay(shortcut: string): string {
  if (!shortcut) return ''

  const parts = shortcut.toLowerCase().split('+')
  const key = parts[parts.length - 1] ?? ''
  const modifiers = parts.slice(0, -1)

  if (isMac) {
    const modMap: Record<string, string> = {
      meta: '⌘',
      ctrl: '⌃',
      alt: '⌥',
      shift: '⇧',
    }
    const modStr = modifiers.map((m) => modMap[m] ?? m).join('')
    return `${modStr} ${key.toUpperCase()}`
  }

  const modMap: Record<string, string> = {
    meta: 'Win',
    ctrl: 'Ctrl',
    alt: 'Alt',
    shift: 'Shift',
  }
  const modStr = modifiers.map((m) => modMap[m] ?? m).join('+')
  return modStr ? `${modStr}+${key.toUpperCase()}` : key.toUpperCase()
}

/**
 * 检查 KeyboardEvent 是否匹配快捷键字符串
 */
export function matchesShortcut(e: KeyboardEvent, shortcut: string): boolean {
  if (!shortcut) return false

  const parts = shortcut.toLowerCase().split('+')
  const key = parts[parts.length - 1] ?? ''
  const modifiers = new Set(parts.slice(0, -1))

  // 检查按键
  if (e.key.toLowerCase() !== key) return false

  // 检查修饰键
  if (modifiers.has('meta') !== e.metaKey) return false
  if (modifiers.has('ctrl') !== e.ctrlKey) return false
  if (modifiers.has('alt') !== e.altKey) return false
  if (modifiers.has('shift') !== e.shiftKey) return false

  return true
}

/**
 * 从 KeyboardEvent 构建快捷键字符串
 *
 * 用于快捷键录制器。
 */
export function shortcutFromEvent(e: KeyboardEvent): string | null {
  // 忽略单独的修饰键
  const ignoredKeys = new Set(['Meta', 'Control', 'Alt', 'Shift', 'CapsLock', 'Tab', 'Escape'])
  if (ignoredKeys.has(e.key)) return null

  const parts: string[] = []
  if (e.metaKey) parts.push('meta')
  if (e.ctrlKey) parts.push('ctrl')
  if (e.altKey) parts.push('alt')
  if (e.shiftKey) parts.push('shift')

  // 至少需要一个修饰键
  if (parts.length === 0) return null

  parts.push(e.key.toLowerCase())
  return parts.join('+')
}

/**
 * 初始化快捷键设置
 *
 * 从主进程加载设置，写入 atom。
 */
export async function initializeShortcut(
  setShortcut: (value: string) => void,
): Promise<void> {
  try {
    const settings = await window.electronAPI.getSettings()
    setShortcut(settings.newConversationShortcut || DEFAULT_SHORTCUT)
  } catch {
    setShortcut(DEFAULT_SHORTCUT)
  }
}

/**
 * 更新快捷键设置
 *
 * 同时更新 atom 和持久化到文件。
 */
export async function updateShortcut(shortcut: string): Promise<void> {
  await window.electronAPI.updateSettings({ newConversationShortcut: shortcut })
}
