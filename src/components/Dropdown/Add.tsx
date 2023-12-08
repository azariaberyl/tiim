import { memo, useId } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addTimer } from '../../features/dataSlice';
import { DEFAULT_TIMER } from '../../utils/constants';
import { changeTimer, resetReport, startChange } from '../../features/timerSlice';
function Add({ setIsOpen }: { setIsOpen: (val?: boolean) => void }) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    const newTimer = DEFAULT_TIMER();
    dispatch(addTimer(newTimer));
    dispatch(changeTimer(newTimer));
    dispatch(resetReport());
    dispatch(startChange(false));
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
