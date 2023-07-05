import { useCallback, useEffect, useState } from 'react';
import { postReports, secondToString } from '../utils/timer';
import useReportStore from '../contexts/ReportStore';
import { tab } from '../types';
import useTimerColectionStore from '../contexts/TimerColectionStore';
import useIntervalStore from '../contexts/IntervalStore';
import useTabStore from '../contexts/TabStore';
import useTimerStore from '../contexts/TimerStore';

/**
 * Count down logic
 * @param sec initial seconds
 * @param isStart is the timer started yet
 * @param isStartHandler handler function to change the start state
 * @param isReportChange handler function to add report to the context
 */
function useTimerCountdown(
  sec: number,
  isStart: boolean,
  isStartHandler: (val?: boolean) => void,
  id: string,
  tab: tab,
  isReportChange: boolean = false
) {
  const [time, setTime] = useState(sec);
  const [onReportUpdate] = useReportStore((s) => [s.onReportChange]);
  const onChangeTab = useTabStore((s) => s.onChangeTab);
  const [onChangeTimerColection, reports] = useTimerColectionStore((s) => [s.onChange, s.reports]);
  const [updateInterval, interval] = useIntervalStore((s) => [s.updateInterval, s.interval]);
  const timer = useTimerStore((s) => s.timer);

  const reportUpdateHandler = useCallback(() => {
    onReportUpdate((newReport) => {
      const isReportExist = reports.some((val) => val.id_timer === newReport.id_timer);

      if (isReportExist) {
        const newReports = reports.map((val) => {
          return val.id_timer !== newReport.id_timer ? val : newReport;
        });
        onChangeTimerColection('reports', newReports);
        postReports(newReports);
        return;
      }

      const newReports = [...reports, newReport];
      // Update the cloud and local storage
      onChangeTimerColection('reports', newReports);
    }, timer);
  }, [reports]);

  // Handle timer countdown when it is started
  useEffect(() => {
    if (!isStart) return;
    const interval = setInterval(() => {
      setTime((prev) => {
        const a = prev - 1;
        document.title = secondToString(a);
        return a;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isStart]);

  //Handle if the timer finish and reporting
  useEffect(() => {
    if (time === 0) {
      document.title = 'Tiimz - Finish!!';
      if (tab === 1) onTimerFinish(onChangeTab, updateInterval, interval);
      else onChangeTab(1);
      setTime(sec);
      isStartHandler(false);
      reportUpdateHandler();
      return;
    }
    if (isStart && isReportChange) {
      reportUpdateHandler();
      // if (isReportChange !== undefined) {
      //   isReportChange();
      // }
    }
  }, [time]);

  //Handle if the sec parameter change
  useEffect(() => {
    setTime(sec);
  }, [sec, id]);

  return secondToString(time);
}

export default useTimerCountdown;

function onTimerFinish(onChangeTab: (val: tab) => void, updateInterval: (val?: number) => void, interval: number) {
  console.log(interval);
  if (interval <= 1) {
    onChangeTab(3);
    updateInterval(4);
    return;
  }
  updateInterval();
  onChangeTab(2);
  return;
}
