import { memo, useId } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addTimer } from '../../features/dataSlice';
import { DEFAULT_TIMER1 } from '../../utils/constants';
import { changeTimer, resetReport } from '../../features/timerSlice';
function Add({ setIsOpen }: { setIsOpen: (val?: boolean) => void }) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    const newTimer = DEFAULT_TIMER1();
    dispatch(addTimer(newTimer));
    dispatch(changeTimer(newTimer));
    dispatch(resetReport());
    setIsOpen(false);
    document.title = 'Pomodoro Timer';
  };

  return (
    <button data-test='add-timer' onClick={onClick} className='w-full'>
      +
    </button>
  );
}

export default memo(Add);
