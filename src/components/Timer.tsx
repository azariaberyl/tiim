import React, { useEffect, useState } from 'react';
import { secondToString, toSeconds } from '../utils';

interface Timer {
  isStart: boolean;
}

function Timer({ isStart }: Timer) {
  console.log('Render ~~Timer');

  const [time, setTime] = useState(toSeconds(25, 0));

  useEffect(() => {
    if (isStart) {
      if (time === 0) return;
      const timeout = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isStart, time]);

  return (
    <p className='w-fit font-medium text-8xl my-4'>{secondToString(time)}</p>
  );
}

export default Timer;
