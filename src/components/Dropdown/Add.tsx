import { memo, useId } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addTimer } from '../../features/dataSlice';
import { DEFAULT_TIMER1 } from '../../utils/constants';
import { changeTimer } from '../../features/timerSlice';
function Add({ setIsOpen }: { setIsOpen: (val?: boolean) => void }) {
  const id = useId();
  const dispatch = useAppDispatch();

  const onClick = () => {
    console.log('Clicked dude');
    dispatch(addTimer(DEFAULT_TIMER1(id)));
    dispatch(changeTimer(DEFAULT_TIMER1(id)));
    setIsOpen(false);
    document.title = 'Pomodoro Timer';
  };

  return (
    <button onClick={onClick} className='w-full'>
      +
    </button>
  );
}

export default memo(Add);
