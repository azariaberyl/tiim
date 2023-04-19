import React, { useMemo } from 'react';
import { secondToString, toSeconds } from '../../utils/timer';
import useTimerCountdown from '../../hooks/useTimerCountdown';
import TimersContext from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';
import useTabStore from '../../contexts/TabStore';
import useTimerBreakStore from '../../contexts/TimeBreakStore';

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
  const currentTab = useTabStore((state) => state.tab);
  if (currentTab === 1) {
    const onReportChange = useReportStore((state) => state.onReportChange);
    const initialValue = toSeconds(minutes, seconds);
    const time = useTimerCountdown(initialValue, isStart, isStartHandler, onReportChange);
    return <DisplayTimer time={time} />;
  }

  const { longBreak, shortBreak } = useTimerBreakStore();
  if (currentTab === 2) {
    const initialValue = toSeconds(shortBreak.min, shortBreak.sec);
    const time = useTimerCountdown(initialValue, isStart, isStartHandler);
    return <DisplayTimer time={time} />;
  }

  const initialValue = toSeconds(longBreak.min, longBreak.sec);
  const time = useTimerCountdown(initialValue, isStart, isStartHandler);
  return <DisplayTimer time={time} />;
}

export default React.memo(Timer);
