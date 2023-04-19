import React, { forwardRef, useContext, useMemo } from 'react';
import TimersContext from '../../contexts/TimerStore';
import Timer from './Timer';
import Menu from './Menu';
import useBoolean from '../../hooks/useBoolean';
import Description from './Description';
import Control from './Control';
import useTimerStore from '../../contexts/TimerStore';

function ClockCard(props: React.HTMLProps<HTMLDivElement>, ref: React.ForwardedRef<HTMLDivElement>) {
  const timer = useTimerStore((s) => s.timer);
  const isStartTimer = useTimerStore((s) => s.isStart);
  const isStartTimerHandler = useTimerStore((s) => s.onStartChange);

  return (
    <div ref={ref} {...props}>
      <div className='w-[600px] bg-[#CCFFDE]/90 flex flex-col items-center p-3 rounded-xl overflow-hidden shadow-xl shadow-default-light'>
        <Menu />
        <Timer
          isStart={isStartTimer}
          seconds={timer.seconds}
          minutes={timer.minutes}
          isStartHandler={isStartTimerHandler}
        />
        <Description title={timer.title} />

        <Control isStartTimer={isStartTimer} isStartTimerHandler={isStartTimerHandler} />
      </div>
    </div>
  );
}

export default forwardRef(ClockCard);
