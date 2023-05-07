import React, { useCallback, useMemo } from 'react';
import { postReports, setReports, toSeconds } from '../../utils/timer';
import useTimerCountdown from '../../hooks/useTimerCountdown';
import TimersContext from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';
import useTabStore from '../../contexts/TabStore';
import useTimerBreakStore from '../../contexts/TimeBreakStore';
import useTimerColectionStore from '../../contexts/TimerColectionStore';
import { tab } from '../../types';

function DisplayTimer({ time }: { time: string }) {
  return <p className='w-fit font-medium text-8xl my-4'>{time}</p>;
}

interface props {
  isStart: boolean;
  seconds: number;
  minutes: number;
  isStartHandler: (val?: boolean) => void;
  tab: tab;
}
/**
 * The timer clock itself, example 25:00
 * @param isStart is the timer started or not
 */

function Timer({ isStart, seconds, minutes, isStartHandler, tab }: props) {
  const [report] = useReportStore((state) => [state.report]);
  const { longBreak, shortBreak } = useTimerBreakStore();

  if (tab === 1) {
    const initialValue = toSeconds(minutes, seconds);
    const time = useTimerCountdown(initialValue, isStart, isStartHandler, report.id, tab, true);
    return <DisplayTimer time={time} />;
  }

  if (tab === 2) {
    const initialValue = toSeconds(shortBreak.min, shortBreak.sec);
    const time = useTimerCountdown(initialValue, isStart, isStartHandler, report.id, tab);
    return <DisplayTimer time={time} />;
  }

  const initialValue = toSeconds(longBreak.min, longBreak.sec);
  const time = useTimerCountdown(initialValue, isStart, isStartHandler, report.id, tab);
  return <DisplayTimer time={time} />;
}

export default React.memo(Timer);
