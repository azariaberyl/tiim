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

function getDaysInWeek(options?: any) {
  const date = new Date();
  date.setDate(date.getDate() - 6);

  const DAYS_IN_WEEK: String[] = [];
  for (let index = 0; index < 7; index++) {
    if (options !== undefined) {
      DAYS_IN_WEEK.push(date.toLocaleDateString(undefined, options));
    } else {
      DAYS_IN_WEEK.push(date.toLocaleDateString());
    }
    date.setDate(date.getDate() + 1);
  }
  return DAYS_IN_WEEK;
}
const options = { day: 'numeric', month: 'short', weekday: 'short' };

export const DAYS_IN_WEEK = getDaysInWeek();
export const DAYS_IN_WEEK_LABEL = getDaysInWeek(options);

export const TODAY_STRING_DATE = new Date().toDateString();

export const DEFAULT_INTERVAL = 4;
