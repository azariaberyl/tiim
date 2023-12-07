import React from 'react';
import { Timer1 } from '../../../types/timer';
import { deleteTimer } from '../../../features/dataSlice';
import { changeSecond, changeTimer, changeTimerReport, startChange } from '../../../features/timerSlice';
import { Report } from '../../../types';

function onDelete(dispatch: any, id: string, timers: Timer1[], timerReports: Report[]) {
  dispatch(deleteTimer());

  let newTimers = timers.filter((timer) => timer.id !== id);
  const newReports = timerReports.filter((reports) => reports.id_timer !== id);
  const reports = newReports.find((reports) => reports.id_timer === newTimers[0].id);
  const todayReport = reports?.reports.find((report) => report.date === new Date().toLocaleDateString());
  if (newTimers.length === 0) {
    newTimers = [
      {
        id: '-1',
        longBreak: 600,
        seconds: 1500,
        shortBreak: 300,
        title: 'My Project',
      },
    ];
  }

  dispatch(changeTimer(newTimers[0]));
  dispatch(changeTimerReport(todayReport));
  dispatch(changeSecond(newTimers[0].seconds));
  dispatch(startChange(false));
}

export default onDelete;
