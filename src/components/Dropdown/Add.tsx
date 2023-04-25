import React, { memo, useState } from 'react';
import useTimerColectionStore from '../../contexts/TimerColectionStore';

function Add() {
  const onChangeTimerColection = useTimerColectionStore((s) => s.onChange);

  const onClick = () => {
    const id = '' + +new Date();
    console.log(id);
  };

  return (
    <button onClick={onClick} className='w-full'>
      +
    </button>
  );
}

export default memo(Add);
