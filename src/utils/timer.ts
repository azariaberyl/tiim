import { Timer, TimersData } from '../types';

const toMilliseconds = (hrs: number = 0, min: number = 0, sec: number = 0) => (hrs * 60 * 60 + min * 60 + sec) * 1000;

const toSeconds = (min: number = 0, sec: number = 0) => min * 60 + sec;

const secondToString = (sec: number) => {
  let minutes: number = 0;
  let second: number = sec;
  for (second; second >= 60; second -= 60) {
    minutes++;
  }
  return `${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
};

export function getTimerData(): TimersData {
  const data = localStorage.getItem('td');
  return data ? JSON.parse(data) : null;
}

export function setTimerData(TimersData: TimersData) {
  const data = localStorage.setItem('td', JSON.stringify(TimersData));
}

export function getTimer() {
  const timer = getTimerData()?.timer;
  return timer || { category: 'My project', minutes: 25, seconds: 0, title: 'My Project' };
}

export function setTimer(timer: Timer) {
  const data = getTimerData();
  setTimerData({ ...data, timer });
}

export function getReport() {
  const report = getTimerData()?.report;
  return report || 0;
}

export function setReport(report: number) {
  const data = getTimerData();
  setTimerData({ ...data, report });
}

export { toMilliseconds, toSeconds, secondToString };
