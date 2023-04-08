import React from 'react';
import { create } from 'zustand';
import { Timer } from '../types';
import { getTimer, setTimer } from '../utils/timer';

interface ITimerStore {
  timer: Timer;
  onTimerChange: (newTimer: Timer) => void;
}

const useTimerStore = create<ITimerStore>()((set) => ({
  timer: getTimer(),
  onTimerChange: (newTimer: Timer) => {
    setTimer(newTimer);
    set(() => ({ timer: newTimer }));
  },
}));

export default useTimerStore;
