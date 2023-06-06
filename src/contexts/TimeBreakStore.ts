import { create } from 'zustand';
import { BreakTime } from '../types';

interface props {
  shortBreak: BreakTime;
  longBreak: BreakTime;
  changeBreak: (type: 'shortBreak' | 'longBreak', val: number) => void;
}

const useTimerBreakStore = create<props>()((set) => ({
  longBreak: { min: 0, sec: 10, id: 2 },
  shortBreak: { min: 0, sec: 5, id: 1 },
  changeBreak(type, val) {
    set((state) => ({ [type]: { ...state[type], min: val } }));
  },
}));

export default useTimerBreakStore;
