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

function getDaysInWeek() {
  const date = new Date();
  date.setDate(date.getDate() - 6);

  const DAYS_IN_WEEK: String[] = [];
  for (let index = 0; index < 7; index++) {
    DAYS_IN_WEEK.push(date.toDateString());
    date.setDate(date.getDate() + 1);
  }
  return DAYS_IN_WEEK;
}

export const DAYS_IN_WEEK = getDaysInWeek();

export const TODAY_STRING_DATE = new Date().toDateString();

export const DEFAULT_INTERVAL = 4;
