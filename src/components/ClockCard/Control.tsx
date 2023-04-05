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
    <div className='flex w-full items-center justify-center my-2 relative z-0'>
      <button
        onClick={() => isStartTimerHandler()}
        className='px-20 py-3 font-medium bg-primary-dark rounded text-primary-light text-3xl hover:bg-neutral-600 hover:drop-shadow-md'
      >
        {isStartTimer ? 'PAUSE' : 'START'}
      </button>
      {/* <button className='absolute top-3 right-24 z-0' onClick={onRefresh} title='Refresh'>
    <MdOutlineReplay className='text-4xl text-primary-dark hover:text-gray-900' />
  </button> */}
    </div>
  );
}

export default Control;
