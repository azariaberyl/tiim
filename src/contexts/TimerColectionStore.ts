import { create } from 'zustand';
import { Reports, Timer } from '../types';
import { DEFAULT_REPORT, DEFAULT_TIMER } from '../utils/constants';

type TimerColectionState = 'timers' | 'selected' | 'reports';

interface props {
  timers: Timer[];
  selected: string; // Select string id
  reports: Reports;

  onChange: (type: TimerColectionState, val: Timer[] | string | Reports | null) => void;
}

const useTimerColectionStore = create<props>()((set, get) => ({
  timers: [DEFAULT_TIMER],
  reports: [],
  selected: DEFAULT_TIMER.id,
  onChange(type, val) {
    if (val === null) return;
    set(() => ({ [type]: val }));
  },
}));

export default useTimerColectionStore;
