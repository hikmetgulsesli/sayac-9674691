import { Theme } from '../types'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors active:scale-95 duration-150"
      aria-label={theme === 'dark' ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
        dark_mode
      </span>
    </button>
  )
}
