import React from 'react';
import { Timer1 } from '../../../types/timer';
import { deleteTimer } from '../../../features/dataSlice';
import { changeTimer, changeTimerReport } from '../../../features/timerSlice';
import { Report } from '../../../types';

function onDelete(dispatch: any, id: string, timers: Timer1[], timerReports: Report[]) {
  dispatch(deleteTimer());

  const newTimers = timers.filter((timer) => timer.id !== id);
  const newReports = timerReports.filter((reports) => reports.id_timer !== id);
  const reports = newReports.find((reports) => reports.id_timer === newTimers[0].id);
  const todayReport = reports?.reports.find((report) => report.date === new Date().toLocaleDateString());

  dispatch(changeTimer(newTimers[0]));
  dispatch(changeTimerReport(todayReport));
}

export default onDelete;
