import { useState, useCallback, useEffect } from 'react'
import { Theme } from '../types'
import { getItem, setItem } from '../utils/storage'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    return getItem<Theme>('theme', 'dark')
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      setItem('theme', next)
      return next
    })
  }, [])

  return {
    theme,
    toggleTheme,
  }
}
