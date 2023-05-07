import React, { useEffect } from 'react';
import useTimerColectionStore from '../contexts/TimerColectionStore';
import { fetchInterval, fetchReports, fetchSelectedTimer, fetchTimers } from '../utils/timer';
import useTimerStore from '../contexts/TimerStore';
import useReportStore from '../contexts/ReportStore';
import { findValueBasedOnId } from '../utils';
import { Timer } from '../types';
import useIntervalStore from '../contexts/IntervalStore';

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
        if (reports !== null) onColectionChange('reports', reports); // Update reports
        if (timersData === null) return;
        // Variable of updated data
        const newSelected = selected || timersData[0].id;
        const newReports = reports || [{ id: timersData[0].id, name: timersData[0].title, report: [] }];
        // Update Colection
        onColectionChange('timers', timersData); // Update timers
        onColectionChange('selected', newSelected); // Update selected
        onColectionChange('reports', newReports); // Update reports
        //Update individual store based on fetched data
        onTimerChange(findValueBasedOnId(timers, newSelected) || timersData[0]); // update TimerStore
        onReportChange1(
          findValueBasedOnId(newReports, newSelected) || { id: timersData[0].id, name: timersData[0].title, report: [] }
        ); // update ReportStore
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
