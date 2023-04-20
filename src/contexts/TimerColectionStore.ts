import { create } from 'zustand';
import { Timer, TimerReport } from '../types';

type TimerColectionState = 'timers' | 'selected' | 'reports';

interface props {
  timers: Timer[];
  selected: string; // Select string id
  reports: TimerReport[];

  onChange: (type: TimerColectionState, val: Timer[] | string | TimerReport[]) => void;
}

const useTimerColectionStore = create<props>()((set, get) => ({
  timers: [{ id: '999', minutes: 10, seconds: 0, title: 'My Project' }],
  reports: [],
  selected: '999',
  onChange(type, val) {
    set(() => ({ [type]: val }));
  },
}));

export default useTimerColectionStore;
