import React, { useCallback, useState, useMemo } from 'react';
import { MdOutlineReplay } from 'react-icons/md';
import { TimersProvider } from '../../contexts/TimersContext';
import { Timer as TimerType } from '../../types';
import { getTimersData, setTimersData } from '../../utils';
import Timer from '../Timer';
import Header from './Header';

function ClockCard(props: React.HTMLProps<HTMLDivElement>) {
  console.log('~Render ClockCard');
  const [refresh, setRefresh] = useState<boolean>(false);
  const fetchedTimers = useMemo(() => getTimersData(), [refresh]);

  const [timers, setTimers] = useState(fetchedTimers.timers);
  const [selected, setSelected] = useState(fetchedTimers.selected);
  const [isStartTimer, setStartTimer] = useState<boolean>(false);

  const { minutes, seconds, category, title } = useMemo(
    () => timers[selected],
    [selected, timers]
  );

  const onTimerChange = useCallback((index: number, timer: TimerType) => {
    const newTimers = timers.map((t, i) => (i === index ? timer : t));
    setTimers(newTimers);
    setTimersData({ ...fetchedTimers, timers: newTimers });
  }, []);

  const onChangeSelected = useCallback((newId: number) => {
    setSelected(newId);
    setTimersData({ ...fetchedTimers, selected: newId });
  }, []);

  const onReportChange = useCallback((num: number) => {
    fetchedTimers.reports[selected] = num + 1;
    const newTimers = fetchedTimers;
    setTimersData(newTimers);
  }, []);

  const startHandler = () => setStartTimer((prev) => !prev);

  const onRefresh = () => setRefresh((prev) => !prev);

  const contextVal = React.useMemo(
    () => ({
      reports: fetchedTimers.reports,
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
            onStart={startHandler}
            report={fetchedTimers.reports[selected]}
            onReportChange={onReportChange}
          />

          <div className='gap-1 my-4 flex justify-center flex-col items-center'>
            <p className='w-fit font-medium text-3xl capitalize'>{title}</p>
            <p className='w-fit font-medium text-secondary-dark text-xl capitalize'>
              {category}
            </p>
          </div>

          <div className='flex w-full items-center justify-center my-2 relative z-0'>
            <button
              onClick={startHandler}
              className='px-20 py-3 font-medium bg-primary-dark rounded text-primary-light text-3xl hover:bg-neutral-600 hover:drop-shadow-md'
            >
              {isStartTimer ? 'PAUSE' : 'START'}
            </button>
            <button
              className='absolute top-3 right-24 z-0'
              onClick={onRefresh}
              title='Refresh'
            >
              <MdOutlineReplay className='text-4xl text-primary-dark hover:text-gray-900' />
            </button>
          </div>
        </div>
      </TimersProvider>
    </div>
  );
}

export default ClockCard;
