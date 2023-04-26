import React, { memo, useState } from 'react';
import useTimerColectionStore from '../../contexts/TimerColectionStore';
import { DEFAULT_TIMER } from '../../utils/constants';
import { postSelected, postTimers, setSelected, setTimers } from '../../utils/timer';
import useTimerStore from '../../contexts/TimerStore';

function Add() {
  const [onChangeTimerColection, timers] = useTimerColectionStore((s) => [s.onChange, s.timers]);
  const onTimerChange = useTimerStore((s) => s.onTimerChange);
  console.log(timers);

  const onClick = () => {
    const id = '' + +new Date();
    const newTimer = { ...DEFAULT_TIMER, id };
    const newTimers = [...timers, newTimer];
    // Update TimerColectionStore
    onChangeTimerColection('timers', newTimers);
    onChangeTimerColection('selected', newTimer.id);
    onTimerChange(newTimer);
    // Set Local Storage
    setSelected(id);
    setTimers(newTimer);
    // Update cloud
    postTimers(newTimers);
    postSelected(id);
  };

  return (
    <button onClick={onClick} className='w-full'>
      +
    </button>
  );
}

export default memo(Add);
