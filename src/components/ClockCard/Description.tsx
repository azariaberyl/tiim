import React, { memo, useMemo } from 'react';
import { Timer } from '../../types';
import useTimers from '../../hooks/useTimers';
import Dropdown from '../Dropdown';
import { getReports, getTimers, setSelectedAll } from '../../utils/timer';
import useTimerStore from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';
import { DEFAULT_REPORT } from '../../utils/constants';

function ContentElement({ children, id }: { children: React.ReactNode; id: string }) {
  const onTimerChange = useTimerStore((s) => s.onTimerChange);
  const onReportUpdate = useReportStore((s) => s.reportUpdate);
  const onClick = () => {
    // Change selected
    setSelectedAll(id);
    // Change TimerStore to new selected timer
    onTimerChange(getTimers().find((val) => val.id === id) || getTimers()[0]);
    // Change report to current timer
    onReportUpdate(getReports().find((val) => val.id === id) || { ...DEFAULT_REPORT, id: getTimers()[0].id });
  };

  return (
    <button className='w-full border-b border-b-default-light' onClick={onClick}>
      {children}
    </button>
  );
}

interface props {
  id: string;
}
/**
 * Component of title and category
 * @param title The title of the component
 * @param category The category of the component
 */
function Description({ id }: props) {
  const timers = useTimers();

  return (
    <div className='gap-1 mb-4 h-16 flex justify-center flex-col items-center'>
      {/* <p className='w-fit font-medium text-3xl capitalize'>{title}</p> */}
      <Dropdown currentId={id} data={timers} ContentElement={ContentElement} />
    </div>
  );
}

export default memo(Description);
