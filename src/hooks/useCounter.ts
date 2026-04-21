import { useState, useCallback } from 'react'
import { getItem, setItem } from '../utils/storage'

export const MAX_LIMIT = 999999

export interface CounterState {
  count: number
}

const INITIAL_STATE: CounterState = { count: 0 }

export function useCounter() {
  const [state, setState] = useState<CounterState>(() => {
    return getItem<CounterState>('counter', INITIAL_STATE)
  })

  const atMax = state.count >= MAX_LIMIT
  const atMin = state.count <= 0

  const increment = useCallback(() => {
    setState(prev => {
      if (prev.count >= MAX_LIMIT) return prev
      const next = { count: prev.count + 1 }
      setItem('counter', next)
      return next
    })
  }, [])

  const decrement = useCallback(() => {
    setState(prev => {
      if (prev.count <= 0) return prev
      const next = { count: prev.count - 1 }
      setItem('counter', next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    const next = { count: 0 }
    setItem('counter', next)
    setState(next)
  }, [])

  return {
    count: state.count,
    atMax,
    atMin,
    increment,
    decrement,
    reset,
  }
}
