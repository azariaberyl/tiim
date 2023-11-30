import React, { forwardRef } from 'react';
import Start from './Start';
import ProjectTitle from './ProjectTitle';
import Setting from './Setting';
import TimerHandler from '../Controller';

function Timer(props: React.HTMLProps<HTMLDivElement>, ref: React.ForwardedRef<HTMLDivElement>) {
  const time = TimerHandler();

  return (
    <div className='w-screen md:w-auto' ref={ref} {...props}>
      <div className='md:w-[600px] md:m-0 mx-auto w-[95%] bg-[#CCFFDE]/90 flex flex-col items-center p-3 rounded-xl overflow-hidden shadow-xl shadow-default-light'>
        <Setting />
        <DisplayTimer time={`${time.minutes}:${time.seconds}`} />
        <ProjectTitle id='1' />
        <Start />
      </div>
    </div>
  );
}

function DisplayTimer({ time }: { time: string }) {
  return (
    <p data-test='display-timer' className='w-fit font-medium text-8xl my-4'>
      {time}
    </p>
  );
}

export default forwardRef(Timer);
