import React, { useEffect, useState } from 'react';
import { secondToString, toSeconds } from '../utils';

function Timer({
  isStart,
  seconds,
  minutes,
  refresh,
}: {
  isStart: boolean;
  seconds: number;
  minutes: number;
  refresh: boolean;
}) {
  const [time, setTime] = useState(toSeconds(minutes, seconds));
  console.log('Render Timer', time);

  useEffect(() => {
    if (!isStart) return;
    const interval = setInterval(() => {
      setTime((prev) => {
        const a = prev > 0 ? prev - 1 : 0;
        document.title = secondToString(a);
        return a;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStart]);

  useEffect(() => {
    setTime(toSeconds(minutes, seconds));
  }, [refresh]);

  return (
    <p className='w-fit font-medium text-8xl my-4'>{secondToString(time)}</p>
  );
}

export default Timer;
