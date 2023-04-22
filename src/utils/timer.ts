import { Timer, TimerReport, TimersData } from '../types';
import { DEFAULT_REPORT, DEFAULT_TIMER } from './constants';

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

function getTimerData(): TimersData {
  const data = localStorage.getItem('td');
  return data ? JSON.parse(data) : null;
}

export function setTimerData(TimersData: TimersData) {
  const data = localStorage.setItem('td', JSON.stringify(TimersData));
}

export function getTimer() {
  const timer = getTimerData()?.timer;
  return timer || DEFAULT_TIMER;
}

export function setTimer(timer: Timer) {
  const data = getTimerData();
  setTimerData({ ...data, timer });
}

export function getReport() {
  const report = getTimerData()?.report;
  return report || DEFAULT_REPORT;
}

export function setReport(report: TimerReport) {
  const data = getTimerData();
  setTimerData({ ...data, report });
}

export async function fetchTimers() {
  const dataSjon = localStorage.getItem('timers');
  const data: Timer[] =
    dataSjon === null
      ? [{ id: '-1', minutes: 5, seconds: 0, title: 'My Project' }]
      : JSON.parse(dataSjon);

  return data;
}

export async function fetchSelectedTimer() {
  const data: string = localStorage.getItem('selectedTimer') || '-1';

  return data;
}

export { toMilliseconds, toSeconds, secondToString };
