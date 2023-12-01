import { dataChangeTimer } from '../../../features/dataSlice';
import { changeTimer } from '../../../features/timerSlice';
import { toSeconds } from '../../../utils/timer';
interface Props {
  (
    e: React.FormEvent<HTMLFormElement>,
    dispatch: any,
    timer: {
      time: {
        min: string;
        sec: string;
      };
      shortBreak: {
        min: string;
        sec: string;
      };
      longBreak: {
        min: string;
        sec: string;
      };
    },
    title: string,
    interval: number,
    activeTimerId: string
  ): void;
}

const onSubmit: Props = (e, dispatch, timer, title, inverval, activeTimerId) => {
  e.preventDefault();
  const longBreak = toSeconds(parseInt(timer.longBreak.min)) + parseInt(timer.longBreak.sec);
  const shortBreak = toSeconds(parseInt(timer.shortBreak.min)) + parseInt(timer.shortBreak.sec);
  const seconds = toSeconds(parseInt(timer.time.min)) + parseInt(timer.time.sec);
  const timerObject = { id: activeTimerId, longBreak, shortBreak, seconds, title };

  dispatch(changeTimer(timerObject));
  dispatch(dataChangeTimer(timerObject));
};

export default onSubmit;
