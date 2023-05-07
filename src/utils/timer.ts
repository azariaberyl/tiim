import { Timer, TimerReport, ITimerColectionLS } from '../types';
import { DEFAULT_REPORT, DEFAULT_TIMER } from './constants';

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

// Cloud, mock fetch data

export async function fetchReports(): Promise<TimerReport[] | null> {
  const data = localStorage.getItem('reports');
  const dataJson: TimerReport[] | null = data === null ? null : JSON.parse(data);
  return dataJson;
}

export async function fetchTimers() {
  const dataSjon = localStorage.getItem('timers');
  const data: Timer[] | null = dataSjon === null ? null : JSON.parse(dataSjon);
  return data;
}

export async function fetchSelectedTimer() {
  const data: string | null = localStorage.getItem('selectedTimer');
  return data;
}

export async function postReports(reports: TimerReport[]) {
  const dataString = JSON.stringify(reports);
  localStorage.setItem('reports', dataString);
}

export async function postSelected(id: string) {
  localStorage.setItem('selectedTimer', id);
}

export async function postTimers(timers: Timer[]) {
  const timersString = JSON.stringify(timers);
  localStorage.setItem('timers', timersString);
}

export async function postInterval(interval: number) {
  localStorage.setItem('interval', String(interval));
}

export async function fetchInterval() {
  const intervalString = localStorage.getItem('interval');
  if (intervalString !== null) return Number(intervalString);
  return false;
}

//Local Storage and Cloud
function getTimerColectionLS(): ITimerColectionLS {
  const data = localStorage.getItem('tc');
  return data ? JSON.parse(data) : null;
}

export function setTimerColectionLS(TimersData: ITimerColectionLS) {
  const data = localStorage.setItem('tc', JSON.stringify(TimersData));
}

export function getTimers() {
  const timer = getTimerColectionLS()?.timers;
  return timer || [DEFAULT_TIMER];
}

export function setTimers(timers: Timer[]) {
  const dataTimerColection = getTimerColectionLS();
  postTimers(timers);
  setTimerColectionLS({ ...dataTimerColection, timers });
}

export function getReports() {
  const report = getTimerColectionLS()?.reports;
  return report || [DEFAULT_REPORT];
}

export function setReports(reports: TimerReport[]) {
  const data = getTimerColectionLS();
  postReports(reports);
  setTimerColectionLS({ ...data, reports });
}

export function getSelected(): string | undefined {
  const data: string | undefined = getTimerColectionLS()?.selected;
  return data;
}

export function setSelected(selectedId: string) {
  const data = getTimerColectionLS();
  postSelected(selectedId);
  setTimerColectionLS({ ...data, selected: selectedId });
}

export { toMilliseconds, toSeconds, secondToString };
