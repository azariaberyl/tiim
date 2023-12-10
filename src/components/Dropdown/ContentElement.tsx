import React from 'react';
import { Timer1 } from '../../types/timer';
import { useAppDispatch } from '../../app/hooks';
import { changeTimer, changeTimerReport, startChange } from '../../features/timerSlice';
import { Report } from '../../types';
import { changeTimerId } from '../../features/dataSlice';

interface ContentElementI {
  children: React.ReactNode;
  openDropdownHandler: (val?: boolean) => void;
  data: Timer1;
  reports: Report;
}

function ContentElement({ children, data, openDropdownHandler, reports }: ContentElementI) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    const curretReport = reports.reports.find((val) => val.date === new Date().toLocaleDateString()) || {
      date: new Date().toLocaleDateString(),
      report: -1,
    };
    dispatch(changeTimer(data));
    dispatch(changeTimerId(data.id));
    dispatch(changeTimerReport(curretReport));
    dispatch(startChange(false));
    openDropdownHandler(false);
  };

  return (
    <button className='w-full border-b border-b-default-light' data-test='timer' onClick={onClick}>
      {children}
    </button>
  );
}

export default ContentElement;
