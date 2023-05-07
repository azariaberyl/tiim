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

export const TODAY_STRING_DATE = new Date().toDateString();

export const DEFAULT_INTERVAL = 4;
