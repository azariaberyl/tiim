import { Report } from '../types';
import { Timer1 } from '../types/timer';

export function jsonComparer(json1: {}, json2: {}) {
  const sJson1 = JSON.stringify(json1);
  const sJson2 = JSON.stringify(json2);

  return sJson1 == sJson2;
}

export function findValueBasedOnId<T extends { id: string }>(dataArray: T[] | null, id: string | null): T | undefined {
  if (dataArray === null) return;
  if (id === null) return;
  return dataArray.find((val) => val.id === id);
}

export function toMinutesAndString(val: number) {
  const value = val;
  const minutes = Math.floor(value / 60);
  const remainingValues = value % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedValues = String(remainingValues).padStart(2, '0');
  return { min: formattedMinutes, sec: formattedValues };
}

export function init() {
  const activeTimerId: string = localStorage.getItem('activeTimerId') || '-1';
  const timerReports: Report[] = JSON.parse(
    localStorage.getItem('timerReports') ||
      JSON.stringify([{ id_timer: '-1', reports: [{ date: new Date().toLocaleDateString(), report: -1 }] }])
  ); // Gak mungkin null cok
  const timers: Timer1[] = JSON.parse(
    localStorage.getItem('timers') ||
      JSON.stringify([
        {
          id: '-1',
          longBreak: 600,
          seconds: 1500,
          shortBreak: 300,
          title: 'My Project',
        },
      ])
  );
  return { activeTimerId, timerReports, timers };
}
