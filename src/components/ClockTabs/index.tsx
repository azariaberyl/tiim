import React, { memo } from 'react';
import Tab from './Tab';

function ClockTabs() {
  return (
    <div className='flex justify-center'>
      <Tab name='Pomodoro' id={1} />
      <Tab name='Short Break' id={2} />
      <Tab name='Long Break' id={3} />
    </div>
  );
}

export default memo(ClockTabs);
