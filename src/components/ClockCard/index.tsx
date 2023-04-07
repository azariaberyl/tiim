import React, { useContext, useMemo } from 'react';
import TimersContext from '../../contexts/TimerStore';
import Timer from './Timer';
import Menu from './Menu';
import useBoolean from '../../hooks/useBoolean';
import useContextMemo from '../../hooks/useContextMemo';
import Description from './Description';
import Control from './Control';
import useTimerStore from '../../contexts/TimerStore';

function ClockCard(props: React.HTMLProps<HTMLDivElement>) {
  console.log('~Render ClockCard');

  const timer = useTimerStore((s) => s.timer);
  const [isStartTimer, isStartTimerHandler] = useBoolean(false);

  return (
    <div {...props}>
      <div className=' bg-white flex flex-col items-center p-3 shadow border-gray-100 border rounded-xl overflow-hidden'>
        <Menu />
        <Timer
          isStart={isStartTimer}
          seconds={timer.seconds}
          minutes={timer.minutes}
          isStartHandler={isStartTimerHandler}
        />
        <Description category={timer.category} title={timer.title} />

        <Control isStartTimer={isStartTimer} isStartTimerHandler={isStartTimerHandler} />
      </div>
    </div>
  );
}

export default ClockCard;
