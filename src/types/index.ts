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

export type { Timer, TimersData };
