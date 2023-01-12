import React, { useEffect, useState } from 'react';
import { secondToString, toSeconds } from '../utils';

interface Timer {
  isStart: boolean;
  seconds: number;
  minutes: number;
  refresh: boolean;
  onStart: Function;
  report: number;
}

function Timer({ isStart, seconds, minutes, refresh, onStart, report }: Timer) {
  const [time, setTime] = useState(toSeconds(minutes, seconds));
  const [reportstate, setReport] = useState(report - 2);

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
      onStart();
      setTime(toSeconds(minutes, seconds));
      return;
    }

    setReport((prev) => prev + 1);
  }, [time]);

  useEffect(() => {
    setTime(toSeconds(minutes, seconds));
    document.title = 'Tiimz';
  }, [refresh]);

  return (
    <p className='w-fit font-medium text-8xl my-4'>{secondToString(time)}</p>
  );
}

export default Timer;
