import React, { useEffect, useMemo, useState } from 'react';
import useBoolean from '../../../hooks/useBoolean';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { decrement, startChange } from '../../../features/timerSlice';

type TimerHandler = () => {
  minutes: string;
  seconds: string;
};

const TimerHandler: TimerHandler = () => {
  const second = useAppSelector((state) => state.timer.second);
  const isStart = useAppSelector((state) => state.timer.start);
  const dispatch = useAppDispatch();

  const minutes = Math.floor(second / 60);
  const remainingSeconds = second % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  const time = { minutes: formattedMinutes, seconds: formattedSeconds };
  // const start = useMemo(() => ({ isStart, Handler }), [isStart]);

  useEffect(() => {
    let timerId: any;

    if (isStart) {
      timerId = setInterval(() => {
        dispatch(decrement());
        if (second <= 0) {
          dispatch(startChange(false));
        }
      }, 1000); // Update every second
    }

    return () => clearInterval(timerId); // Cleanup interval on component unmount or when isStart is toggled off
  }, [isStart]);

  return time;
};

export default TimerHandler;
