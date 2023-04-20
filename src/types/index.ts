interface Timer {
  seconds: number;
  minutes: number;
  title: string;
  id: string;
}

interface TimerReport {
  id: string;
  name: string;
  report: any;
}

interface TimersData {
  timer: Timer;
  report: number;
}

interface BreakTime {
  min: number;
  sec: number;
}

export type tab = 1 | 2 | 3;

type ModalType = 'edit' | 'report' | '';

export type { Timer, TimersData, ModalType, BreakTime, TimerReport };
