import { Timer, Report } from '../types';

export const DEFAULT_TIMER: Timer = {
  id: '-1',
  minutes: 10,
  seconds: 0,
  title: 'My Project',
};
export const DEFAULT_REPORT: Report = {
  id_timer: '-1',
  title: DEFAULT_TIMER.title,
  date: new Date().toDateString(),
  report: 0,
  id: '' + +new Date(),
};

export const TODAY_STRING_DATE = new Date().toDateString();

export const DEFAULT_INTERVAL = 4;
