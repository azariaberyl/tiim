import React, { useCallback, useState, useMemo, useContext } from 'react';
import { MdOutlineReplay } from 'react-icons/md';
import TimersContext from '../../contexts/TimerContext/TimersContext';
import { getTimersData, setTimersData } from '../../utils';
import Timer from './Timer';
import Header from './Header';

function ClockCard(props: React.HTMLProps<HTMLDivElement>) {
  console.log('~Render ClockCard');
  const { report, timer, onRefresh } = useContext(TimersContext);
  console.log(report, timer, onRefresh);

  // const [refresh, setRefresh] = useState<boolean>(false);
  // const fetchedTimers = useMemo(() => getTimersData(), [refresh]);
  // console.log(fetchedTimers);

  // const [timers, setTimers] = useState(fetchedTimers.timer);
  const [isStartTimer, setStartTimer] = useState<boolean>(false);

  // const { minutes, seconds, category, title } = useMemo(() => timers, [timers]);

  // const onReportChange = useCallback((num: number) => {
  //   fetchedTimers.report = num + 1;
  //   const newTimers = fetchedTimers;
  //   setTimersData(newTimers);
  // }, []);

  const startHandler = () => setStartTimer((prev) => !prev);

  // const onRefresh = () => setRefresh((prev) => !prev);

  // const contextVal = React.useMemo(
  //   () => ({
  //     report: fetchedTimers.report,
  //     timer: { minutes, seconds, category, title },
  //   }),
  //   [timers]
  // );

  return (
    <div {...props}>
      {/* <TimersProvider value={contextVal}> */}
      <div className=' bg-white flex flex-col items-center p-3 shadow border-gray-100 border rounded-xl overflow-hidden'>
        <Header />

        {/* <Timer
            isStart={isStartTimer}
            seconds={seconds}
            minutes={minutes}
            refresh={refresh}
            onStart={startHandler}
            report={fetchedTimers.report}
            onReportChange={onReportChange}
          /> */}

        <div className='gap-1 my-4 flex justify-center flex-col items-center'>
          {/* <p className='w-fit font-medium text-3xl capitalize'>{title || 'My Project'}</p>
          <p className='w-fit font-medium text-secondary-dark text-xl capitalize'>{category || 'My Project'}</p> */}
        </div>

        <div className='flex w-full items-center justify-center my-2 relative z-0'>
          <button
            onClick={startHandler}
            className='px-20 py-3 font-medium bg-primary-dark rounded text-primary-light text-3xl hover:bg-neutral-600 hover:drop-shadow-md'
          >
            {isStartTimer ? 'PAUSE' : 'START'}
          </button>
          {/* <button className='absolute top-3 right-24 z-0' onClick={onRefresh} title='Refresh'>
              <MdOutlineReplay className='text-4xl text-primary-dark hover:text-gray-900' />
            </button> */}
        </div>
      </div>
      {/* </TimersProvider> */}
    </div>
  );
}

export default ClockCard;
