interface Timer {
  seconds: number;
  minutes: number;
  title: string;
  category: string;
}

interface TimersData {
  selected: number;
  timers: Timer[];
  reports: number[];
}

export type { Timer, TimersData };
