import React, { createContext, useDebugValue } from 'react';
import { Timer } from '../../types';

const TimersContext = createContext({
  report: 0,
  timer: { category: '', minutes: 0, seconds: 0, title: '' },
  onReportChange: () => {},
  onTimerChange: (newTimer: Timer) => {},
});

export default TimersContext;
