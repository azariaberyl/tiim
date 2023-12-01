import { Reports } from './report';

interface Timer {
  seconds: number;
  minutes: number;
  title: string;
  id: string;
}

interface Timer1 {
  seconds: number;
  shortBreak: number;
  longBreak: number;
  title: string;
  id: string;
}

interface ITimerColectionLS {
  timers: Timer[];
  selected: string; // Select string id
  reports: Reports;
}

interface BreakTime {
  id: number;
  min: number;
  sec: number;
}

interface FetchedData {
  timers: Timer[] | null;
  selected: string | null; // Select string id
  reports: Reports | null;
}

export type tab = 1 | 2 | 3;

type ModalType = 'edit' | 'report' | '';

export type { Timer, ITimerColectionLS, ModalType, BreakTime, FetchedData, Timer1 };
