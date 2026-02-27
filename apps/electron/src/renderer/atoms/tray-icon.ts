/**
 * 状态栏图标（托盘）状态管理
 *
 * 管理托盘图标的显示/隐藏开关，持久化到应用设置。
 */

import { atom } from 'jotai'

/** 是否显示状态栏图标 */
export const showTrayIconAtom = atom<boolean>(true)

/**
 * 从主进程加载托盘图标设置
 */
export async function initializeTrayIcon(
  setEnabled: (enabled: boolean) => void
): Promise<void> {
  try {
    const settings = await window.electronAPI.getSettings()
    setEnabled(settings.showTrayIcon ?? true)
  } catch (error) {
    console.error('[托盘图标] 初始化失败:', error)
  }
}

/**
 * 更新托盘图标开关并持久化
 */
export async function updateShowTrayIcon(show: boolean): Promise<void> {
  try {
    await window.electronAPI.updateSettings({ showTrayIcon: show })
  } catch (error) {
    console.error('[托盘图标] 更新设置失败:', error)
  }
}
