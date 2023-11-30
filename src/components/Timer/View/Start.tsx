import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { startChange } from '../../../features/timerSlice';

const Start = () => {
  return (
    <StartContainer>
      <StartButton />
    </StartContainer>
  );
};

function StartContainer({ children }: { children: React.ReactNode }) {
  return <div className='flex w-full items-center justify-center my-2 relative z-0'>{children}</div>;
}

function StartButton() {
  const isStart = useAppSelector((state) => state.timer.start);

  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(startChange())}
      className='px-20 py-3 font-semibold bg-default-dark rounded text-default-light text-3xl hover:bg-black hover:drop-shadow-xl'
    >
      {isStart ? 'PAUSE' : 'START'}
    </button>
  );
}

export default Start;
