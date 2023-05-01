import React, { useEffect } from 'react';
import useTimerColectionStore from '../contexts/TimerColectionStore';
import { fetchReports, fetchSelectedTimer, fetchTimers } from '../utils/timer';
import useTimerStore from '../contexts/TimerStore';
import useReportStore from '../contexts/ReportStore';
import { findValueBasedOnId } from '../utils';
import { Timer } from '../types';

/**
 * function that fetches initial TimersColection from cloud
 * and return the Timers
 */
function useTimers() {
  const timers = useTimerColectionStore((s) => s.timers);
  const onTimerChange = useTimerStore((s) => s.onTimerChange);
  const onReportChange1 = useReportStore((s) => s.reportChange1);
  const onColectionChange = useTimerColectionStore((s) => s.onChange);

  useEffect(() => {
    async function init() {
      try {
        const timersData = await fetchTimers();
        const selected = await fetchSelectedTimer();
        const reports = await fetchReports();
        if (reports !== null) onColectionChange('reports', reports); // Update reports
        if (timersData === null) return;
        onColectionChange('timers', timersData); // Update timers
        onColectionChange('selected', selected || timersData[0].id); // Update selected
        onColectionChange('reports', reports || [{ id: timersData[0].id, name: timersData[0].title, report: [] }]); // Update reports

        onTimerChange(findValueBasedOnId(timers, selected) || timersData[0]); // update TimerStore
        onReportChange1(findValueBasedOnId(reports, selected) || { id: timersData[0].id, name: timersData[0].title, report: [] }); // update ReportStore
      } catch {
        return;
      }
    }

    init();
  }, []);

  return timers;
}

export default useTimers;
