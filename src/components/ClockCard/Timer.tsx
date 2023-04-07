import { useMemo } from 'react';
import { toSeconds } from '../../utils';
import useTimerCountdown from '../../hooks/useTimerCountdown';
import useContextMemo from '../../hooks/useContextMemo';
import TimersContext from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';

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
  const onReportChange = useReportStore((state) => state.onReportChange);
  const time = useTimerCountdown(initialValue, isStart, isStartHandler, onReportChange);

  return <DisplayTimer time={time} />;
}

export default Timer;
