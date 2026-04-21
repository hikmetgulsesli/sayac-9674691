import { HistoryEntry as HistoryEntryType } from '../types'
import { HistoryEntry } from './HistoryEntry'

interface HistoryListProps {
  entries: HistoryEntryType[]
  title?: string
  showEmpty?: boolean
  emptyMessage?: string
}

export function HistoryList({ entries, title = 'İşlem Geçmişi', showEmpty = true, emptyMessage }: HistoryListProps) {
  return (
    <div className="w-full lg:w-[400px] flex flex-col bg-surface-container-low rounded-2xl p-6 border border-outline-variant/15 relative overflow-hidden">
      <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">history</span>
        {title}
      </h2>

      {entries.length === 0 ? (
        showEmpty ? (
          <div className="relative w-full bg-surface-container-low rounded-[12px] p-10 flex flex-col items-center text-center">
            <div className="absolute inset-0 border border-outline-variant/15 rounded-[12px] pointer-events-none" />
            <div className="w-16 h-16 rounded-[12px] bg-surface-container-highest flex items-center justify-center mb-6 shadow-[0_8px_32px_rgba(218,226,253,0.04)] relative">
              <div className="absolute inset-0 border border-outline-variant/20 rounded-[12px] pointer-events-none" />
              <span className="material-symbols-outlined text-primary text-3xl opacity-80" style={{ fontVariationSettings: "'FILL' 0" }}>
                history
              </span>
            </div>
            <h2 className="text-on-surface font-headline text-xl font-medium mb-3">Henüz işlem yapılmadı</h2>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed max-w-[250px]">
              {emptyMessage || 'İlk işleminizi yapmak için butonları kullanın'}
            </p>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-on-surface-variant text-sm">Henüz işlem yok</p>
          </div>
        )
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 max-h-[614px] lg:max-h-none">
          {entries.map((entry, idx) => {
            const prevVal = idx === entries.length - 1
              ? (entry.action === 'reset' ? entry.value : entry.value - 1)
              : entries[idx + 1]?.value ?? 0
            return <HistoryEntry key={entry.id} entry={entry} previousValue={prevVal} />
          })}
        </div>
      )}
    </div>
  )
}
