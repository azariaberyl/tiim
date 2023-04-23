import React, { useEffect } from 'react';
import useReportStore from '../contexts/ReportStore';
import useTimerColectionStore from '../contexts/TimerColectionStore';
import useTimerStore from '../contexts/TimerStore';
import { TimerReport } from '../types';
import { fetchReports } from '../utils/timer';

/**
 * Fetch initial data of reports
 */

export default function useReportColection() {
  const timer = useTimerStore((s) => s.timer);
  const onReportUpdate = useReportStore((s) => s.reportUpdate);
  const [onChangeTimerColection, selected] = useTimerColectionStore((s) => [
    s.onChange,
    s.selected,
  ]);

  useEffect(() => {
    async function init() {
      const reports: TimerReport[] = (await fetchReports()) || [
        {
          id: timer.id,
          name: timer.title,
          report: [],
        },
      ];

      onReportUpdate(reports.find((val) => val.id === selected) || reports[0]);
      onChangeTimerColection('reports', reports);
    }
    init();
  }, [timer]);

  return <div>useReports</div>;
}
