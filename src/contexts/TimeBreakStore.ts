import { create } from 'zustand';
import { BreakTime } from '../types';

interface props {
  shortBreak: BreakTime;
  longBreak: BreakTime;
}

const useTimerBreakStore = create<props>()((set) => ({
  longBreak: { min: 0, sec: 10, id: 2 },
  shortBreak: { min: 0, sec: 5, id: 1 },
}));

export default useTimerBreakStore;
