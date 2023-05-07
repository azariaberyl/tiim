import { create } from 'zustand';
import { Timer, TimerReport } from '../types';
import { DEFAULT_REPORT, DEFAULT_TIMER } from '../utils/constants';
import { getReports, getSelected, getTimers } from '../utils/timer';

type TimerColectionState = 'timers' | 'selected' | 'reports';

interface props {
  timers: Timer[];
  selected: string; // Select string id
  reports: TimerReport[];

  onChange: (type: TimerColectionState, val: Timer[] | string | TimerReport[]) => void;
}

const useTimerColectionStore = create<props>()((set, get) => ({
  timers: getTimers() || [DEFAULT_TIMER],
  reports: getReports() || [DEFAULT_REPORT],
  selected: getSelected() || DEFAULT_TIMER.id,
  onChange(type, val) {
    set(() => ({ [type]: val }));
  },
}));

export default useTimerColectionStore;
