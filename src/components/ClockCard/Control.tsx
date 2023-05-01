import React from 'react';

interface props {
  isStartTimerHandler: () => void;
  isStartTimer: boolean;
}

/**
 * Clock control like start, pause
 */
function Control({ isStartTimer, isStartTimerHandler }: props) {
  return (
    <ControlContainer>
      <StartButton isStartTimerHandler={isStartTimerHandler} isStartTimer={isStartTimer}  />
    </ControlContainer>
  );
}

export default React.memo(Control);

function ControlContainer({children}: {children: React.ReactNode}) {
  return <div className='flex w-full items-center justify-center my-2 relative z-0'>{children}</div>

}

function StartButton({isStartTimerHandler, isStartTimer}: {isStartTimerHandler: () => void, isStartTimer: boolean}) {
  return (<button onClick={() => isStartTimerHandler()} className='px-20 py-3 font-semibold bg-default-dark rounded text-default-light text-3xl hover:bg-black hover:drop-shadow-xl'>
    {isStartTimer ? 'PAUSE' : 'START'}
  </button>);
}
