import { useMemo } from 'react';
import { toSeconds } from '../../utils';
import useTimer from '../../hooks/useTimer';
import useContextMemo from '../../hooks/useContextMemo';
import TimersContext from '../../contexts/TimerContext/TimersContext';

function DisplayTimer({ time }: { time: string }) {
  return <p className='w-fit font-medium text-8xl my-4'>{time}</p>;
}

interface props {
  isStart: boolean;
  seconds: number;
  minutes: number;
  isStartHandler: (val?: boolean) => void;
}
/**
 * The timer clock itself, example 25:00
 * @param isStart is the timer started or not
 */

function Timer({ isStart, seconds, minutes, isStartHandler }: props) {
  const initialValue = useMemo(() => toSeconds(minutes, seconds), []);
  const { onReportChange } = useContextMemo(TimersContext);
  const time = useTimer(initialValue, isStart, isStartHandler, onReportChange);

  return <DisplayTimer time={time} />;
}

export default Timer;
