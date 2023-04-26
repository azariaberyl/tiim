import React, { useEffect } from 'react';
import useTimerColectionStore from '../contexts/TimerColectionStore';
import { fetchReports, fetchSelectedTimer, fetchTimers } from '../utils/timer';
import useTimerStore from '../contexts/TimerStore';
import { DEFAULT_TIMER } from '../utils/constants';
import useReportStore from '../contexts/ReportStore';

/**
 * function that fetches initial TimersColection from cloud
 * and return the Timers
 */
function useTimers() {
  const timers = useTimerColectionStore((s) => s.timers);
  const onTimerChange = useTimerStore((s) => s.onTimerChange);
  const onReportUpdate = useReportStore((s) => s.reportUpdate);
  const onColectionChange = useTimerColectionStore((s) => s.onChange);

  useEffect(() => {
    async function init() {
      try {
        const data = await fetchTimers();
        const selected = await fetchSelectedTimer();
        const reports = await fetchReports();
        if (data === null) return;
        onColectionChange('timers', data); // Update timers
        onColectionChange('selected', selected || data[0].id); // Update selected
        onColectionChange('reports', reports || [{ id: data[0].id, name: data[0].title, report: [] }]); // Update reports

        onTimerChange(data.find((t) => t.id == selected) || data[0]); // update TimerStore
        onReportUpdate(reports?.find((t) => t.id == selected) || { id: data[0].id, name: data[0].title, report: [] }); // update ReportStore
      } catch {
        return;
      }
    }

    init();
  }, []);

  return timers;
}

export default useTimers;
