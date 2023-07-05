import React, { useEffect } from 'react';
import useTimerColectionStore from '../contexts/TimerColectionStore';
import { fetchInterval, fetchReports, fetchSelectedTimer, fetchTimers, postTimers } from '../utils/timer';
import useTimerStore from '../contexts/TimerStore';
import useReportStore from '../contexts/ReportStore';
import { findValueBasedOnId } from '../utils';
import { Reports, Timer } from '../types';
import useIntervalStore from '../contexts/IntervalStore';
import { DEFAULT_TIMER, TODAY_STRING_DATE } from '../utils/constants';

/**
 * function that fetches initial TimersColection from cloud
 * and return the Timers
 */
function useTimers() {
  const timers = useTimerColectionStore((s) => s.timers);
  const onTimerChange = useTimerStore((s) => s.onTimerChange);
  const onReportChange1 = useReportStore((s) => s.reportChange1);
  const onColectionChange = useTimerColectionStore((s) => s.onChange);
  const updateInterval = useIntervalStore((s) => s.updateInterval);

  useEffect(() => {
    async function init() {
      try {
        const timersData = await fetchTimers();
        const selected = await fetchSelectedTimer();
        const reports = await fetchReports();
        const interval = await fetchInterval();

        if (interval) updateInterval(interval);
        if (selected) onColectionChange('selected', selected);
        if (reports !== null) onColectionChange('reports', reports); // Update reports
        if (timersData === null) {
          postTimers([DEFAULT_TIMER]);
          return;
        }
        // Variable of updated data
        const newSelected = selected || timersData[0].id;
        const newReports: Reports = reports || [
          { id_timer: timersData[0].id, title: timersData[0].title, date: TODAY_STRING_DATE, report: 0 },
        ];

        // Update Colection
        onColectionChange('timers', timersData); // Update timers
        onColectionChange('selected', newSelected); // Update selected
        onColectionChange('reports', newReports); // Update reports
        //Update individual store based on fetched data
        onTimerChange(findValueBasedOnId(timersData, newSelected) || timersData[0]); // update TimerStore
        onReportChange1(newReports.find((report) => report.id_timer === selected) || newReports[0]); // update ReportStore
        // Update Local Storage
      } catch {
        return;
      }
    }

    init();
  }, []);

  return timers;
}

export default useTimers;
