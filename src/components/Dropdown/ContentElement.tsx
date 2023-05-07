import React from 'react';
import useTimerStore from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';
import { getReports, getTimers, setSelected } from '../../utils/timer';
import { DEFAULT_REPORT } from '../../utils/constants';

function ContentElement({
  children,
  id,
  openDropdownHandler,
}: {
  children: React.ReactNode;
  id: string;
  openDropdownHandler: (val?: boolean) => void;
}) {
  const [onTimerChange, onStartChange] = useTimerStore((s) => [s.onTimerChange, s.onStartChange]);
  const onReportChange1 = useReportStore((s) => s.reportChange1);
  const onClick = () => {
    onStartChange(false);
    // Change selected
    setSelected(id);
    // Change TimerStore to new selected timer
    const newTimer = getTimers().find((val) => val.id === id) || getTimers()[0];
    onTimerChange(newTimer);
    // Change report to current timer
    onReportChange1(getReports().find((val) => val.id === id) || { ...DEFAULT_REPORT, id: getTimers()[0].id });
    openDropdownHandler(false);
  };

  return (
    <button className='w-full border-b border-b-default-light' onClick={onClick}>
      {children}
    </button>
  );
}

export default ContentElement;
