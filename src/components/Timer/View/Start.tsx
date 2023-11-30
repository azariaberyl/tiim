interface startProps {
  isStartTimerHandler: () => void;
  isStartTimer: boolean;
}

const Start = ({ isStartTimer, isStartTimerHandler }: startProps) => {
  return (
    <StartContainer>
      <StartButton isStartTimerHandler={isStartTimerHandler} isStartTimer={isStartTimer} />
    </StartContainer>
  );
};

function StartContainer({ children }: { children: React.ReactNode }) {
  return <div className='flex w-full items-center justify-center my-2 relative z-0'>{children}</div>;
}

function StartButton({
  isStartTimerHandler,
  isStartTimer,
}: {
  isStartTimerHandler: () => void;
  isStartTimer: boolean;
}) {
  return (
    <button
      onClick={() => isStartTimerHandler()}
      className='px-20 py-3 font-semibold bg-default-dark rounded text-default-light text-3xl hover:bg-black hover:drop-shadow-xl'
    >
      {isStartTimer ? 'PAUSE' : 'START'}
    </button>
  );
}

export default Start;
