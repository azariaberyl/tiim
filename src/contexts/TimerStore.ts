import React from 'react';
import { create } from 'zustand';
import { Timer } from '../types';
import { jsonComparer } from '../utils';
import { DEFAULT_TIMER } from '../utils/constants';
import { getSelected, getTimers } from '../utils/timer';

interface ITimerStore {
  timer: Timer;
  onTimerChange: (newTimer: Timer) => void;

  isStart: boolean;
  onStartChange: (val?: boolean) => void;
}

const useTimerStore = create<ITimerStore>()((set, get) => ({
  timer: getTimers().find((val) => val.id === (getSelected() || DEFAULT_TIMER.id)) || DEFAULT_TIMER,
  onTimerChange: (newTimer: Timer) => {
    if (jsonComparer(get().timer, newTimer)) return;
    set(() => ({ timer: newTimer }));
  },

  isStart: false,
  onStartChange(val = !get().isStart) {
    set(() => ({ isStart: val }));
  },
}));

export default useTimerStore;
