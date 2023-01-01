import React, { useEffect, useState, useContext } from 'react';
import TimersContext from '../contexts/TimersContext';
import { secondToString, toSeconds } from '../utils';

function Timer({ isStart }: { isStart: boolean }) {
  const [time, setTime] = useState(toSeconds(2, 0));
  console.log('Render Timer', time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const a = prev > 0 ? prev - 1 : 0;
        document.title = secondToString(a);
        return a;
      });
    }, 1000);

    if (!isStart) clearTimeout(interval);
    return () => clearTimeout(interval);
  }, [isStart]);

  return (
    <p className='w-fit font-medium text-8xl my-4'>{secondToString(time)}</p>
  );
}

export default Timer;
