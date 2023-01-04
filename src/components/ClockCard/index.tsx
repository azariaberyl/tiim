import React, { useCallback, useState, useMemo } from 'react';
import { TimersProvider } from '../../contexts/TimersContext';
import { Timer as TimerType } from '../../types';
import {
  getSelectedTimer,
  getTimers,
  setSelectedTimer,
  setTimers as setLocalStorageTimers,
} from '../../utils';
import Timer from '../Timer';
import Header from './Header';

function ClockCard(props: React.HTMLProps<HTMLDivElement>) {
  console.log('~Render ClockCard');

  const [timers, setTimers] = useState(getTimers());
  const [selected, setSelected] = useState(getSelectedTimer());
  const [isStartTimer, setStartTimer] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const { minutes, seconds, category, title } = useMemo(
    () => timers[selected],
    [selected, timers]
  );

  const onTimerChange = useCallback((index: number, timer: TimerType) => {
    const newTimers = timers.map((t, i) => (i === index ? timer : t));
    setLocalStorageTimers(newTimers);
    setTimers(getTimers());
  }, []);

  const onChangeSelected = useCallback((newId: number) => {
    setSelectedTimer(newId);
    setSelected(newId);
  }, []);

  const startHandler = () => setStartTimer((prev) => !prev);

  const contextVal = React.useMemo(
    () => ({
      timers,
      selected,
      onTimerChange,
      onChangeSelected,
      timer: { minutes, seconds, category, title },
    }),
    [timers]
  );

  return (
    <div {...props}>
      <TimersProvider value={contextVal}>
        <div
          style={{ boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.25)' }}
          className=' bg-white flex flex-col items-center p-3 rounded-xl overflow-hidden'
        >
          <Header />

          <Timer
            isStart={isStartTimer}
            seconds={seconds}
            minutes={minutes}
            refresh={refresh}
          />

          <div className='gap-1 my-4 flex justify-center flex-col items-center'>
            <p className='w-fit font-medium text-2xl'>{title}</p>
            <p className='w-fit font-medium text-secondary-dark text-xl'>
              {category}
            </p>
          </div>

          <div className='flex w-full items-center justify-center my-2'>
            <button
              onClick={startHandler}
              className='px-20 py-3 font-medium bg-primary-dark rounded text-primary-light text-3xl hover:bg-neutral-600 hover:drop-shadow-md'
            >
              {isStartTimer ? 'PAUSE' : 'START'}
            </button>
            <button onClick={() => setRefresh((prev) => !prev)}>refresh</button>
          </div>
        </div>
      </TimersProvider>
    </div>
  );
}

export default ClockCard;
