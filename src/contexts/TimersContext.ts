import React, { createContext } from 'react';
import { Timer } from '../types';

type TimerId = number;
interface TimersContext {
  timers: Timer[];
  selected: TimerId;
  onTimerChange: (index: number, timer: Timer) => void;
  onChangeSelected: (newId: number) => void;
  timer?: Timer;
}

const TimersContext = createContext<TimersContext>({
  timers: [],
  selected: 0,
  onTimerChange: () => {},
  onChangeSelected: () => {},
});

const TimersProvider = TimersContext.Provider;

export { TimersProvider };
export default TimersContext;
