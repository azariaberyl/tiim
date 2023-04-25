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
  timer: getTimers().find((val) => val.id === getSelected()) || DEFAULT_TIMER,
  onTimerChange: (newTimer: Timer) => {
    /**
     * TODO
     * Add function if timer changed, change the colection
     */
    if (jsonComparer(get().timer, newTimer)) return; // Compare if there is new change if not the do nothing
    set(() => ({ timer: newTimer }));
  },

  isStart: false,
  onStartChange(val = !get().isStart) {
    set(() => ({ isStart: val }));
  },
}));

export default useTimerStore;
