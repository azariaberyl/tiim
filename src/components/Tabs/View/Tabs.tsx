import React from 'react';
import Tab from './Tab';

function Tabs() {
  return (
    <div className='flex justify-center'>
      <Tab name='Pomodoro' id={1} />
      <Tab name='Short Break' id={2} />
      <Tab name='Long Break' id={3} />
    </div>
  );
}

export default Tabs;
