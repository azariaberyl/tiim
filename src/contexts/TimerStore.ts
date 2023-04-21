import React from 'react';
import { create } from 'zustand';
import { Timer } from '../types';
import { getTimer, setTimer } from '../utils/timer';
import { jsonComparer } from '../utils';

interface ITimerStore {
  timer: Timer;
  onTimerChange: (newTimer: Timer) => void;

  isStart: boolean;
  onStartChange: (val?: boolean) => void;
}

const useTimerStore = create<ITimerStore>()((set, get) => ({
  timer: getTimer(),
  onTimerChange: (newTimer: Timer) => {
    if (jsonComparer(get().timer, newTimer)) return; // Compare if there is new change if not the do nothing
    setTimer(newTimer);
    set(() => ({ timer: newTimer }));
  },

  isStart: false,
  onStartChange(val = !get().isStart) {
    set(() => ({ isStart: val }));
  },
}));

export default useTimerStore;
