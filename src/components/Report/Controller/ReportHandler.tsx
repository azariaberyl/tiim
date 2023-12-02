import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { DAYS_IN_WEEK } from '../../../utils/constants';
import { DetailData } from '../../../types/report';

export default function ReportHandler() {
  const reports = useAppSelector((s) => s.data.timerReports);
  const timers = useAppSelector((s) => s.data.timers);

  const detailData: DetailData[] = reports.flatMap((report) =>
    report.reports.map((reportEntry) => {
      const timer = timers.find((timer) => timer.id === report.id_timer);
      return {
        title: timer?.title || 'Unknown Timer',
        date: reportEntry.date,
        report: reportEntry.report,
      };
    })
  );

  // const data = {
  //   labels: DAYS_IN_WEEK,
  //   datasets: timers.map((timer) => ({
  //     label: timer.title,
  //     data: DAYS_IN_WEEK.map((day) => {
  //       const theDateReport = reports.find((r) => r.id_timer === timer.id && r.date === day);
  //       if (theDateReport) {
  //         return (theDateReport.reports[0].report / 3600).toFixed(1);
  //       }
  //       return 0;
  //     }),
  //   })),
  // };

  return detailData;
}
