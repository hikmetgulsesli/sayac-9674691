import { useState, useCallback } from 'react'
import { HistoryEntry } from '../types'
import { getItem, setItem } from '../utils/storage'

const MAX_HISTORY = 10

function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    return getItem<HistoryEntry[]>('history', [])
  })

  const addEntry = useCallback((action: HistoryEntry['action'], value: number) => {
    const entry: HistoryEntry = {
      id: generateId(),
      value,
      timestamp: Date.now(),
      action,
    }
    setHistory(prev => {
      const next = [entry, ...prev].slice(0, MAX_HISTORY)
      setItem('history', next)
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    setItem('history', [])
    setHistory([])
  }, [])

  return {
    history,
    addEntry,
    clearHistory,
  }
}
