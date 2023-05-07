import React, { memo, useState } from 'react';
import useTimerColectionStore from '../../contexts/TimerColectionStore';
import { DEFAULT_TIMER } from '../../utils/constants';
import { setReports, setSelected, setTimers } from '../../utils/timer';
import useTimerStore from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';

function Add({ setIsOpen }: { setIsOpen: (val?: boolean) => void }) {
  const [onChangeTimerColection, timers, reports] = useTimerColectionStore((s) => [s.onChange, s.timers, s.reports]);
  const onReportChange1 = useReportStore((s) => s.reportChange1);
  const [onTimerChange, onStartChange] = useTimerStore((s) => [s.onTimerChange, s.onStartChange]);

  const onClick = () => {
    onStartChange(false);
    const id = '' + +new Date();
    const newTimer = { ...DEFAULT_TIMER, id };
    const newTimers = [...timers, newTimer];
    const newReport = { id: newTimer.id, name: newTimer.title, report: [] };
    const newReports = [...reports, newReport];
    // Update TimerColectionStore
    onChangeTimerColection('timers', newTimers);
    onChangeTimerColection('selected', newTimer.id);
    onChangeTimerColection('reports', newReports);
    // Update current timer and report
    onTimerChange(newTimer);
    onReportChange1(newReport);
    // Set Local Storage
    setSelected(id);
    setTimers(newTimers);
    setReports(newReports);
    setIsOpen(false);
  };

  return (
    <button onClick={onClick} className='w-full'>
      +
    </button>
  );
}

export default memo(Add);
