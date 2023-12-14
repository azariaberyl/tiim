import { Timer1 } from '../types/timer';

export const DEFAULT_TIMER = (): Timer1 => {
  const date = new Date().toISOString();
  const id = date.replaceAll(':', '-').replaceAll('.', '-');
  return {
    id,
    shortBreak: 5 * 60,
    longBreak: 10 * 60,
    seconds: 25 * 60,
    title: 'My Project',
  };
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

export const TODAY_STRING_DATE = new Date().toLocaleDateString();

export const DEFAULT_INTERVAL = 4;
