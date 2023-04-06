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

type ModalType = 'edit' | 'report' | '';

export type { Timer, TimersData, ModalType };
