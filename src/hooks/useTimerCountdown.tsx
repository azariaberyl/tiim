import { useEffect, useState } from 'react';
import { secondToString } from '../utils';

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
  onReportChange: () => void
) {
  const [time, setTime] = useState(sec);

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

  useEffect(() => {
    if (time === 0) {
      document.title = 'Tiimz - Finish!!';
      setTime(sec);
      isStartHandler(false);
      return;
    }
    if (isStart) {
      onReportChange();
    }
  }, [time]);

  return secondToString(time);
}

export default useTimerCountdown;
