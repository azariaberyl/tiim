import { useEffect, useState } from 'react';
import { secondToString } from '../utils/timer';

/**
 * Count down logic
 * @param sec initial seconds
 * @param isStart is the timer started yet
 * @param isStartHandler handler function to change the start state
 * @param onReportChange handler function to add report to the context
 */
function useTimerCountdown(
  sec: number,
  isStart: boolean,
  isStartHandler: (val?: boolean) => void,
  id: string,
  onReportChange?: () => void
) {
  const [time, setTime] = useState(sec);

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
    if (isStart) {
      if (onReportChange !== undefined) {
        onReportChange();
      }
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
