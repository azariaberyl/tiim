import React, { useEffect, useMemo, useState } from 'react';
import useBoolean from '../../../hooks/useBoolean';

type TimerHandler = (initialSecond?: number) => [
  { isStart: boolean; Handler: (val?: boolean | undefined) => void },
  {
    minutes: string;
    seconds: string;
  }
];

const TimerHandler: TimerHandler = (initialSecond = 1500) => {
  const [isStart, Handler] = useBoolean(false);
  const [second, setSecond] = useState(initialSecond); // Timer in second

  const minutes = Math.floor(second / 60);
  const remainingSeconds = second % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  const time = { minutes: formattedMinutes, seconds: formattedSeconds };
  const start = useMemo(() => ({ isStart, Handler }), [isStart]);

  useEffect(() => {
    let timerId: any;

    if (isStart) {
      let timeLeft = second;
      timerId = setInterval(() => {
        setSecond((val) => {
          timeLeft = val - 1;
          return timeLeft <= 0 ? 0 : timeLeft;
        });
        if (timeLeft <= 0) {
          Handler(false);
        }
      }, 1000); // Update every second
    }

    return () => clearInterval(timerId); // Cleanup interval on component unmount or when isStart is toggled off
  }, [isStart]);

  return [start, time];
};

export default TimerHandler;
