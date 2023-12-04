import React from 'react';
import useTimerStore from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';
import { DEFAULT_REPORT } from '../../utils/constants';
import useTimerColectionStore from '../../contexts/TimerColectionStore';
import { postSelected, postSelectedFirebase } from '../../utils/timer';
import { Timer1 } from '../../types/timer';
import { useAppDispatch } from '../../app/hooks';
import { changeTimer, changeTimerReport } from '../../features/timerSlice';
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
    openDropdownHandler(false);
  };

  return (
    <button className='w-full border-b border-b-default-light' onClick={onClick}>
      {children}
    </button>
  );
}

export default ContentElement;
