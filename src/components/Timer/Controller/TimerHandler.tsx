import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { decrement } from '../../../features/timerSlice';
import { updateReport } from '../../../features/dataSlice';

type TimerHandler = () => {
  minutes: string;
  seconds: string;
};

const TimerHandler: TimerHandler = () => {
  const second = useAppSelector((state) => state.timer.second);
  const isStart = useAppSelector((state) => state.timer.start);
  const report = useAppSelector((state) => state.timer.report);
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
      }, 1000); // Update every second
    }
    // Update the report in here, basically when the button pressed it will be updated
    console.log(report);
    dispatch(updateReport(report));
    return () => clearInterval(timerId); // Cleanup interval on component unmount or when isStart is toggled off
  }, [isStart]);

  return time;
};

export default TimerHandler;
