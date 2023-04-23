import { create } from 'zustand';
import { Timer, TimerReport } from '../types';
import { DEFAULT_TIMER } from '../utils/constants';

type TimerColectionState = 'timers' | 'selected' | 'reports';

interface props {
  timers: Timer[];
  selected: string; // Select string id
  reports: TimerReport[];

  onChange: (
    type: TimerColectionState,
    val: Timer[] | string | TimerReport[]
  ) => void;
}

const useTimerColectionStore = create<props>()((set, get) => ({
  timers: [DEFAULT_TIMER],
  reports: [],
  selected: '-1',
  onChange(type, val) {
    set(() => ({ [type]: val }));
  },
}));

export default useTimerColectionStore;
