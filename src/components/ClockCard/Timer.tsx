import React, { useCallback, useMemo } from 'react';
import { postReports, setReports, toSeconds } from '../../utils/timer';
import useTimerCountdown from '../../hooks/useTimerCountdown';
import TimersContext from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';
import useTabStore from '../../contexts/TabStore';
import useTimerBreakStore from '../../contexts/TimeBreakStore';
import useTimerColectionStore from '../../contexts/TimerColectionStore';

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
    const [onReportChange, report] = useReportStore((state) => [state.onReportChange, state.report]);
    const [onChangeTimerColection, reports] = useTimerColectionStore((s) => [s.onChange, s.reports]);

    const reportUpdateHandler = useCallback(() => {
      onReportChange((newReport) => {
        const isReportExist = reports.some((val) => val.id === newReport.id);
        if (isReportExist) {
          const newReports = reports.map((val) => {
            return val.id !== newReport.id ? val : newReport;
          });
          onChangeTimerColection('reports', newReports, postReports);
          setReports(newReports);
          return;
        }
        const newReports = [...reports, newReport];
        onChangeTimerColection('reports', newReports);
        setReports(newReports);
      });
    }, [report]);

    const initialValue = toSeconds(minutes, seconds);
    const time = useTimerCountdown(initialValue, isStart, isStartHandler, reportUpdateHandler);
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
