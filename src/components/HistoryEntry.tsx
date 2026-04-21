import { HistoryEntry as HistoryEntryType } from '../types'
import { formatTime } from '../utils/time'

interface HistoryEntryProps {
  entry: HistoryEntryType
  previousValue: number
}

export function HistoryEntry({ entry, previousValue }: HistoryEntryProps) {
  const iconMap: Record<string, { icon: string; fill: number; bgClass: string; textClass: string; label: string }> = {
    increment: { icon: 'add', fill: 1, bgClass: 'bg-primary-container/20', textClass: 'text-primary', label: 'Artırma' },
    decrement: { icon: 'remove', fill: 1, bgClass: 'bg-secondary-container/20', textClass: 'text-secondary', label: 'Azaltma' },
    reset: { icon: 'restart_alt', fill: 0, bgClass: 'bg-surface-container-highest', textClass: 'text-on-surface', label: 'Sıfırlama' },
  }

  const style = iconMap[entry.action || 'reset']

  return (
    <div className="flex justify-between items-center py-3 border-b border-outline-variant/10 last:border-0 group">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full ${style.bgClass} flex items-center justify-center`}>
          <span className={`material-symbols-outlined text-sm font-bold ${style.textClass}`} style={{ fontVariationSettings: `'FILL' ${style.fill}` }}>
            {style.icon}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{style.label}</p>
          <p className="text-xs font-mono text-outline mt-1">
            {entry.action === 'reset' ? `${previousValue} → 0` : `${previousValue} → ${entry.value}`}
          </p>
        </div>
      </div>
      <span className="font-mono text-sm text-on-surface-variant">{formatTime(entry.timestamp)}</span>
    </div>
  )
}
