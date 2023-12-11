import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { decrement } from '../../../features/timerSlice';
import { updateReport } from '../../../features/dataSlice';
import { getDatabase, ref, set } from 'firebase/database';
import { updateReportFirebase } from '../../../utils/firebase';

type TimerHandler = () => {
  minutes: string;
  seconds: string;
};

function writeUserData() {
  const db = getDatabase();
  set(ref(db, 'users/' + 'userId'), {
    username: 'Hallo dek',
  });
}

const TimerHandler: TimerHandler = () => {
  const second = useAppSelector((state) => state.timer.second);
  const isStart = useAppSelector((state) => state.timer.start);
  const report = useAppSelector((state) => state.timer.report);
  const id = useAppSelector((s) => s.data.activeTimerId);
  const user = useAppSelector((s) => s.data.user);
  const dispatch = useAppDispatch();

  const minutes = Math.floor(second / 60);
  const remainingSeconds = second % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  const time = { minutes: formattedMinutes, seconds: formattedSeconds };

  useEffect(() => {
    let timerId: any;

    if (isStart) {
      timerId = setInterval(() => {
        dispatch(decrement());
      }, 1000); // Update every second
    }
    // Update the report in here, basically when the button pressed it will be updated
    // console.log(report);
    dispatch(updateReport(report));
    updateReportFirebase(user?.uid, report, id);
    return () => clearInterval(timerId); // Cleanup interval on component unmount or when isStart is toggled off
  }, [isStart]);

  return time;
};

export default TimerHandler;
