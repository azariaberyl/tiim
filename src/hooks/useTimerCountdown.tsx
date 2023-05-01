import { useCallback, useEffect, useState } from 'react';
import { postReports, secondToString, setReports } from '../utils/timer';
import useReportStore from '../contexts/ReportStore';
import { TimerReport } from '../types';
import useTimerColectionStore from '../contexts/TimerColectionStore';

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
  isReportChange: boolean = false
) {
  const [time, setTime] = useState(sec);
  const [onReportUpdate] = useReportStore(s => [s.onReportChange])
  const [onChangeTimerColection, reports] = useTimerColectionStore((s) => [s.onChange, s.reports])

  const reportUpdateHandler = useCallback(() => {
    onReportUpdate((newReport) => {
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
      // Update the cloud and local storage
      onChangeTimerColection('reports', newReports);
      setReports(newReports)
    })
  },[reports])

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
      setTime(sec);
      isStartHandler(false);
      return;
    }
    if (isStart && isReportChange) {
      reportUpdateHandler()
      // if (isReportChange !== undefined) {
      //   isReportChange();
      // }
    }
  }, [time]);

  //Handle if the sec parameter change
  useEffect(() => {
    setTime(sec);
    console.log('sec changed');
  }, [sec, id]);

  return secondToString(time);
}

export default useTimerCountdown;
