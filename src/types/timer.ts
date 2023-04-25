interface Timer {
  seconds: number;
  minutes: number;
  title: string;
  id: string;
}

interface TimerReport {
  id: string;
  name: string;
  report: { date: string; report: number }[];
}

interface ITimerColectionLS {
  timers: Timer[];
  selected: string; // Select string id
  reports: TimerReport[];
}

interface BreakTime {
  min: number;
  sec: number;
}

export type tab = 1 | 2 | 3;

type ModalType = 'edit' | 'report' | '';

export type { Timer, ITimerColectionLS, ModalType, BreakTime, TimerReport };
