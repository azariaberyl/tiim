import { Children, PropsWithChildren, useEffect, useState } from 'react';
import TimersContext from './TimersContext';
import { getTimersData } from '../../utils';
import { Timer, TimersData } from '../../types';

const defaulValue = {
  report: 0,
  timer: {
    category: 'My Project',
    minutes: 0,
    seconds: 10,
    title: 'My Project',
  },
};

const initialValue = getTimersData() || defaulValue;

function TimerContextProvider({ children }: PropsWithChildren) {
  const [timer, setTimer] = useState<Timer>(initialValue.timer);
  const [report, setReport] = useState(initialValue.report);

  const onReportChange = () => setReport((state) => state + 1);
  const onTimerChange = (newTimer: Timer) => setTimer(newTimer);

  useEffect(() => {
    const fetchTimer = async () => {};
  }, []);

  return (
    <TimersContext.Provider value={{ timer, report, onTimerChange, onReportChange }}>{children}</TimersContext.Provider>
  );
}

export default TimerContextProvider;
