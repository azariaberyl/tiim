import { Children, PropsWithChildren, useEffect, useState } from 'react';
import TimersContext from './TimersContext';
import { getTimersData } from '../../utils';
import { TimersData } from '../../types';

const defaulValue = {
  report: 0,
  timer: {
    category: 'My Project',
    minutes: 25,
    seconds: 0,
    title: 'My Project',
  },
};

function TimerContextProvider({ children }: PropsWithChildren) {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [timerData, setTimerData] = useState<TimersData>(getTimersData() || defaulValue);

  const onRefresh = () => setRefresh((val) => !val);

  useEffect(() => {
    const fetchTimer = async () => {};
  }, []);

  return <TimersContext.Provider value={{ ...timerData, onRefresh }}>{children}</TimersContext.Provider>;
}

export default TimerContextProvider;
