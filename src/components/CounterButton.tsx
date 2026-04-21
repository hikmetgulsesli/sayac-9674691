interface CounterButtonProps {
  icon: string
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
}

export function CounterButton({ icon, label, onClick, variant = 'outline', disabled }: CounterButtonProps) {
  const variantClasses = {
    primary: 'bg-primary-container text-on-primary-container hover:bg-inverse-primary shadow-[0_8px_32px_rgba(124,58,237,0.2)]',
    secondary: 'bg-secondary-container text-on-secondary-container hover:bg-secondary',
    outline: 'border border-outline-variant text-on-surface hover:bg-surface-container-highest',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-8 py-5 rounded-xl font-semibold tracking-wide transition-all active:scale-95 ${variantClasses[variant]} ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
    >
      <span className="material-symbols-outlined font-bold">{icon}</span>
      {label}
    </button>
  )
}
