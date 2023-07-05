import React from 'react';
import useTimerStore from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';
import { DEFAULT_REPORT } from '../../utils/constants';
import useTimerColectionStore from '../../contexts/TimerColectionStore';
import { postSelected } from '../../utils/timer';

interface ContentElementI {
  children: React.ReactNode;
  id: string;
  openDropdownHandler: (val?: boolean) => void;
}

function ContentElement({ children, id, openDropdownHandler }: ContentElementI) {
  const [onTimerChange, onStartChange] = useTimerStore((s) => [s.onTimerChange, s.onStartChange]);
  const [timers, reports] = useTimerColectionStore((s) => [s.timers, s.reports]);
  const onReportChange1 = useReportStore((s) => s.reportChange1);

  const onClick = () => {
    onStartChange(false);
    // Change TimerStore to new selected timer
    const newTimer = timers.find((val) => val.id === id) || timers[0];
    onTimerChange(newTimer);
    // Change report to current timer
    onReportChange1(reports.find((val) => val.id_timer === id) || { ...DEFAULT_REPORT, id_timer: timers[0].id });
    openDropdownHandler(false);
    // Update selected
    postSelected(newTimer.id);
  };

  return (
    <button className='w-full border-b border-b-default-light' onClick={onClick}>
      {children}
    </button>
  );
}

export default ContentElement;
