interface Timer {
  seconds: number;
  minutes: number;
  title: string;
  category: string;
}

interface TimersData {
  timer: Timer;
  report: number;
}

export type tab = 1 | 2 | 3;

type ModalType = 'edit' | 'report' | '';

export type { Timer, TimersData, ModalType };
