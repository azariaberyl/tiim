import { Timer } from '../types';

const toMilliseconds = (hrs: number = 0, min: number = 0, sec: number = 0) =>
  (hrs * 60 * 60 + min * 60 + sec) * 1000;

const toSeconds = (min: number = 0, sec: number = 0) => min * 60 + sec;

const secondToString = (sec: number) => {
  let minutes: number = 0;
  let second: number = sec;
  for (second; second >= 60; second -= 60) {
    minutes++;
  }
  return `${minutes.toString().padStart(2, '0')}:${second
    .toString()
    .padStart(2, '0')}`;
};

function setTimers(timers: Timer[]) {
  const timersString = JSON.stringify(timers);
  try {
    localStorage.setItem('timers', timersString);
    return { success: true };
  } catch (e) {
    return e;
  }
}

function getTimers(): Timer[] {
  const timers = localStorage.getItem('timers');
  return timers ? JSON.parse(timers) : [];
}

function setSelectedTimer(timerId: number) {
  const selectedTimerId = JSON.stringify(timerId);
  try {
    localStorage.setItem('selected_timer', selectedTimerId);
    return { success: true };
  } catch (e) {
    return e;
  }
}

function getSelectedTimer(): number {
  const selectedTimerId = localStorage.getItem('selected_timer');
  return selectedTimerId ? JSON.parse(selectedTimerId) : 0;
}

export {
  toMilliseconds,
  toSeconds,
  secondToString,
  setTimers,
  getTimers,
  getSelectedTimer,
  setSelectedTimer,
};
