import React, { createContext } from 'react';
import { Timer } from '../types';

type TimerId = number;
interface TimersContext {
  timers: Timer[];
  selected: TimerId;
  onTimerChange: Function;
  onChangeSelected: Function;
}

const TimersContext = createContext<TimersContext>({
  timers: [],
  selected: 1,
  onTimerChange: () => {},
  onChangeSelected: () => {},
});

const TimersProvider = TimersContext.Provider;
const TimersConsumer = TimersContext.Consumer;

export { TimersProvider, TimersConsumer };
export default TimersContext;
