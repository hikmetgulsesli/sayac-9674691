import { ReactNode } from 'react'

interface CounterProps {
  value: number
  label?: string
  children?: ReactNode
}

export function Counter({ value, label, children }: CounterProps) {
  return (
    <div className="flex flex-col items-center">
      {label && (
        <p className="text-outline uppercase tracking-[0.2em] text-sm font-semibold mb-8">
          {label}
        </p>
      )}
      <div className="text-[8rem] md:text-[12rem] font-black text-primary leading-none tracking-tighter mb-16 drop-shadow-[0_0_40px_rgba(210,187,255,0.1)]">
        {value}
      </div>
      {children}
    </div>
  )
}
