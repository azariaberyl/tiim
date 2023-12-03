import React, { memo, useState } from 'react';
import useTimerColectionStore from '../../contexts/TimerColectionStore';
import { DEFAULT_TIMER } from '../../utils/constants';
import useTimerStore from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';
import { Report } from '../../types';
import { postSelected, postSelectedFirebase, postTimers, postTimersFirebase } from '../../utils/timer';
function Add({ setIsOpen }: { setIsOpen: (val?: boolean) => void }) {
  const [onChangeTimerColection, timers, reports] = useTimerColectionStore((s) => [s.onChange, s.timers, s.reports]);
  const onReportChange1 = useReportStore((s) => s.reportChange1);
  const [onTimerChange, onStartChange] = useTimerStore((s) => [s.onTimerChange, s.onStartChange]);

  const onClick = () => {
    onStartChange(false);
    const id = '' + +new Date();
    const newTimer = { ...DEFAULT_TIMER, id };
    const newTimers = [...timers, newTimer];
    const newReport: Report = {
      id_timer: newTimer.id,
      title: newTimer.title,
      report: 0,
      date: new Date().toDateString(),
      id: '' + +new Date(),
    };
    const newReports = [newReport, ...reports];
    setIsOpen(false);

    // Update TimerColectionStore
    onChangeTimerColection('timers', newTimers);
    onChangeTimerColection('selected', newTimer.id);
    onChangeTimerColection('reports', newReports);
    // Update firebase
    postTimersFirebase(newTimers);
    postSelectedFirebase(newTimer.id);
    // Update current timer and report
    onTimerChange(newTimer);
    onReportChange1(newReport);
    //Update Selected
    postSelected(newTimer.id);
    postTimers(newTimers);
    document.title = 'Pomodoro Timer';
  };

  return (
    <button onClick={onClick} className='w-full'>
      +
    </button>
  );
}

export default memo(Add);
