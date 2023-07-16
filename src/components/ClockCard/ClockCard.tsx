import React, { forwardRef, useEffect } from 'react';
import TimersContext from '../../contexts/TimerStore';
import Timer from './Timer';
import Menu from './Menu';
import useBoolean from '../../hooks/useBoolean';
import Description from './Description';
import Control from './Control';
import useTimerStore from '../../contexts/TimerStore';
import useTabStore from '../../contexts/TabStore';

function ClockCard(props: React.HTMLProps<HTMLDivElement>, ref: React.ForwardedRef<HTMLDivElement>) {
  const [isStartTimer, isStartTimerHandler, timer] = useTimerStore((s) => [s.isStart, s.onStartChange, s.timer]);
  const tab = useTabStore((s) => s.tab);

  return (
    <div className='w-screen md:w-auto' ref={ref} {...props}>
      <div className='md:w-[600px] md:m-0 mx-auto w-[95%] bg-[#CCFFDE]/90 flex flex-col items-center p-3 rounded-xl overflow-hidden shadow-xl shadow-default-light'>
        <Menu />
        <Timer
          isStart={isStartTimer}
          seconds={timer.seconds}
          minutes={timer.minutes}
          isStartHandler={isStartTimerHandler}
          tab={tab}
        />
        <Description id={timer.id} />

        <Control isStartTimer={isStartTimer} isStartTimerHandler={isStartTimerHandler} />
      </div>
    </div>
  );
}

export default forwardRef(ClockCard);
