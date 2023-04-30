import React, { memo, useState } from 'react';
import useTimerColectionStore from '../../contexts/TimerColectionStore';
import { DEFAULT_TIMER } from '../../utils/constants';
import { postSelected, postTimers, setSelected, setTimers } from '../../utils/timer';
import useTimerStore from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';

function Add({ setIsOpen }: { setIsOpen: (val?: boolean) => void }) {
  const [onChangeTimerColection, timers] = useTimerColectionStore((s) => [s.onChange, s.timers]);
  const onReportUpdate = useReportStore((s) => s.reportUpdate);
  const [onTimerChange, onStartChange] = useTimerStore((s) => [s.onTimerChange, s.onStartChange]);

  const onClick = () => {
    onStartChange(false);
    const id = '' + +new Date();
    const newTimer = { ...DEFAULT_TIMER, id };
    const newTimers = [...timers, newTimer];
    // Update TimerColectionStore
    onChangeTimerColection('timers', newTimers);
    onChangeTimerColection('selected', newTimer.id);
    // Update current timer and report
    onTimerChange(newTimer);
    onReportUpdate({ id: newTimer.id, name: newTimer.title, report: [] });
    // Set Local Storage
    setSelected(id);
    setTimers(newTimer);
    // Update cloud
    postTimers(newTimers);
    postSelected(id);
    setIsOpen(false);
  };

  return (
    <button onClick={onClick} className='w-full'>
      +
    </button>
  );
}

export default memo(Add);
