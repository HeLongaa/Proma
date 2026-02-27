/**
 * ChatTokenBadge — 当前对话 Token 用量指示器
 *
 * 显示最近一次交互的输入（上传）/输出（下载）token 数。
 * 放在消息区域与输入框之间，仅在有数据时渲染。
 */

import * as React from 'react'
import { useAtomValue } from 'jotai'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { currentChatTokenUsageAtom } from '@/atoms/chat-atoms'

/** 格式化 token 数为可读字符串 */
function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

export function ChatTokenBadge(): React.ReactElement | null {
  const usage = useAtomValue(currentChatTokenUsageAtom)

  if (!usage || (usage.inputTokens === undefined && usage.outputTokens === undefined)) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-3 py-1 text-[11px] text-muted-foreground/60 select-none">
      {usage.inputTokens !== undefined && (
        <span className="flex items-center gap-0.5" title="输入（上传）Token">
          <ArrowUp size={11} />
          {formatTokens(usage.inputTokens)}
        </span>
      )}
      {usage.outputTokens !== undefined && (
        <span className="flex items-center gap-0.5" title="输出（下载）Token">
          <ArrowDown size={11} />
          {formatTokens(usage.outputTokens)}
        </span>
      )}
    </div>
  )
}
