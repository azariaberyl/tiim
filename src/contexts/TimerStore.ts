import React, { createContext, useDebugValue } from 'react';
import { create } from 'zustand';
import { Timer } from '../types';

// const TimersContext = createContext({
//   report: 0,
//   timer: { category: '', minutes: 0, seconds: 0, title: '' },
//   onReportChange: () => {},
//   onTimerChange: (newTimer: Timer) => {},
// });

// export default TimersContext;
interface ITimerStore {
  timer: Timer;
  onTimerChange: (newTimer: Timer) => void;
}

const useTimerStore = create<ITimerStore>((set) => ({
  timer: { category: '', minutes: 25, seconds: 0, title: '' },
  onTimerChange: (newTimer: Timer) => set((state) => ({ timer: newTimer })),
}));

export default useTimerStore;
