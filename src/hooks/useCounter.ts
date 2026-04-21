import { useState, useCallback } from 'react'
import { getItem, setItem } from '../utils/storage'

export interface CounterState {
  count: number
}

const INITIAL_STATE: CounterState = { count: 0 }

export function useCounter() {
  const [state, setState] = useState<CounterState>(() => {
    return getItem<CounterState>('counter', INITIAL_STATE)
  })

  const increment = useCallback(() => {
    setState(prev => {
      const next = { count: prev.count + 1 }
      setItem('counter', next)
      return next
    })
  }, [])

  const decrement = useCallback(() => {
    setState(prev => {
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
    increment,
    decrement,
    reset,
  }
}
