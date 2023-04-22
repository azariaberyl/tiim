import { Timer, TimerReport } from '../types';

export const DEFAULT_TIMER: Timer = {
  id: '-1',
  minutes: 10,
  seconds: 0,
  title: 'My Project',
};
export const DEFAULT_REPORT: TimerReport = {
  id: '-1',
  name: DEFAULT_TIMER.title,
  report: [],
};
