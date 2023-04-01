import React, { createContext } from 'react';
import { Timer } from '../../types';
import { getTimersData } from '../../utils';

interface TimersContext {
  report: number;
  timer?: Timer;

  /**
   * Refresh fetch
   */
  onRefresh?: () => void;
}

const TimersContext = createContext<TimersContext>({
  report: 0,
  onRefresh: undefined,
  timer: undefined,
});
// export const TimersProvider = TimersContext.Provider;

export default TimersContext;
