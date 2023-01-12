import React, { createContext } from 'react';
import { Timer } from '../types';

type TimerId = number;
interface TimersContext {
  selected: TimerId;
  reports: number[];
  onTimerChange: (index: number, timer: Timer) => void;
  onChangeSelected: (newId: number) => void;
  timer?: Timer;
}

const TimersContext = createContext<TimersContext>({
  selected: 0,
  reports: [],
  onTimerChange: () => {},
  onChangeSelected: () => {},
});

const TimersProvider = TimersContext.Provider;

export { TimersProvider };
export default TimersContext;
