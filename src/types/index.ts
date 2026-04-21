export interface HistoryEntry {
  id: string;
  value: number;
  timestamp: number;
  action?: 'increment' | 'decrement' | 'reset';
}

export interface CounterState {
  count: number;
  history: HistoryEntry[];
}

export type Theme = 'dark' | 'light';
