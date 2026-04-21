import { useCallback, useState } from 'react'
import { useCounter } from './hooks/useCounter'
import { useHistory } from './hooks/useHistory'
import { useTheme } from './hooks/useTheme'
import { Counter } from './components/Counter'
import { CounterButton } from './components/CounterButton'
import { HistoryList } from './components/HistoryList'
import { ThemeToggle } from './components/ThemeToggle'

type View = 'counter' | 'history'

function SideNavBar({ activeView, onNavigate }: { activeView: View; onNavigate: (v: View) => void }) {
  return (
    <nav className="hidden md:flex flex-col w-64 h-screen bg-background font-body text-sm tracking-wide border-r border-[#4a4455]/15 shrink-0 sticky top-0 z-20">
      <div className="p-8">
        <h1 className="text-primary font-black text-2xl tracking-tighter uppercase">Kinetic Sayaç</h1>
        <p className="text-on-surface-variant text-xs mt-1 font-mono uppercase tracking-widest">Minimalist Takip</p>
      </div>
      <div className="flex-1 px-4 space-y-2 mt-8">
        <button
          onClick={() => onNavigate('counter')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ease-in-out ${
            activeView === 'counter'
              ? 'bg-surface-container-highest text-primary border-r-2 border-primary'
              : 'text-on-surface/50 hover:text-on-surface hover:bg-surface-container-low/20'
          }`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: activeView === 'counter' ? "'FILL' 1" : "'FILL' 0" }}>
            add_circle
          </span>
          <span className="font-medium">Sayaç</span>
        </button>
        <button
          onClick={() => onNavigate('history')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ease-in-out ${
            activeView === 'history'
              ? 'bg-surface-container-low text-primary border-r-2 border-primary'
              : 'text-on-surface/50 hover:text-on-surface hover:bg-surface-container-low/20'
          }`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: activeView === 'history' ? "'FILL' 1" : "'FILL' 0" }}>
            history
          </span>
          <span className="font-medium">Geçmiş</span>
        </button>
      </div>
    </nav>
  )
}

function TopBar({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  return (
    <header className="flex justify-between items-center w-full px-6 h-16 bg-background/80 backdrop-blur-md font-body font-medium sticky top-0 z-40 border-b border-outline-variant/10">
      <div className="md:hidden">
        <h1 className="text-xl font-bold tracking-tighter text-on-background">SAYAÇ</h1>
      </div>
      <div className="hidden md:block flex-1" />
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}

function BottomNavBar({ activeView, onNavigate }: { activeView: View; onNavigate: (v: View) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 md:hidden bg-background/85 backdrop-blur-xl font-body text-[10px] font-medium uppercase tracking-widest rounded-t-2xl shadow-[-8px_0_32px_rgba(218,226,253,0.06)] border-t border-[#4a4455]/10">
      <button
        onClick={() => onNavigate('counter')}
        className={`flex flex-col items-center justify-center rounded-xl px-4 py-1 transition-all active:scale-90 ${
          activeView === 'counter' ? 'bg-primary/10 text-primary' : 'text-on-surface/40 hover:text-primary'
        }`}
      >
        <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: activeView === 'counter' ? "'FILL' 1" : "'FILL' 0" }}>
          add_circle
        </span>
        Sayaç
      </button>
      <button
        onClick={() => onNavigate('history')}
        className={`flex flex-col items-center justify-center rounded-xl px-4 py-1 transition-all active:scale-90 ${
          activeView === 'history' ? 'bg-primary/10 text-primary' : 'text-on-surface/40 hover:text-primary'
        }`}
      >
        <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: activeView === 'history' ? "'FILL' 1" : "'FILL' 0" }}>
          history
        </span>
        Geçmiş
      </button>
    </nav>
  )
}

export default function App() {
  const [view, setView] = useState<View>('counter')
  const { count, increment, decrement, reset } = useCounter()
  const { history, addEntry } = useHistory()
  const { theme, toggleTheme } = useTheme()

  const handleIncrement = useCallback(() => {
    increment()
    addEntry('increment', count + 1)
  }, [increment, addEntry, count])

  const handleDecrement = useCallback(() => {
    decrement()
    addEntry('decrement', count - 1)
  }, [decrement, addEntry, count])

  const handleReset = useCallback(() => {
    reset()
    addEntry('reset', 0)
  }, [reset, addEntry])

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SideNavBar activeView={view} onNavigate={setView} />
      <div className="flex-1 flex flex-col relative w-full pb-24 md:pb-0">
        <TopBar theme={theme} onToggleTheme={toggleTheme} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none" />

        {view === 'counter' ? (
          <div className="flex-1 flex flex-col lg:flex-row p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full">
            <div className="flex-1 flex flex-col items-center lg:items-start justify-center relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-container rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center lg:items-start">
                <Counter value={count} label="Aktif Değer">
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 w-full">
                    <CounterButton icon="add" label="Artır" onClick={handleIncrement} variant="primary" />
                    <CounterButton icon="remove" label="Azalt" onClick={handleDecrement} variant="secondary" />
                    <CounterButton icon="restart_alt" label="Sıfırla" onClick={handleReset} variant="outline" />
                  </div>
                </Counter>
              </div>
            </div>
            <HistoryList entries={history} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32 md:pb-12 z-10">
            <div className="mb-16 flex flex-col items-center">
              <div className="text-[6rem] md:text-[8rem] font-black leading-none text-primary tracking-tighter drop-shadow-[0_0_40px_rgba(124,58,237,0.15)]">
                {count}
              </div>
              <div className="text-on-surface-variant font-label text-xs uppercase tracking-[0.3em] mt-4 font-medium opacity-70">
                Güncel Sayaç
              </div>
            </div>
            <HistoryList entries={history} title="Son İşlemler" />
          </div>
        )}

        <BottomNavBar activeView={view} onNavigate={setView} />
      </div>
    </div>
  )
}

