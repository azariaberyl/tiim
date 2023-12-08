interface Timer1 {
  seconds: number;
  shortBreak: number;
  longBreak: number;
  title: string;
  id: string;
}

interface BreakTime {
  id: number;
  min: number;
  sec: number;
}

export type tab = 1 | 2 | 3;

type ModalType = 'edit' | 'report' | '';

export type { ModalType, BreakTime, Timer1 };
