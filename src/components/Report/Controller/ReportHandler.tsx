import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { DAYS_IN_WEEK } from '../../../utils/constants';
import { DetailData } from '../../../types/report';

const sortByDateDescending = (a: any, b: any) => {
  const dateA = new Date(a.date).getTime();
  const dateB = new Date(b.date).getTime();
  return dateB - dateA;
};

export default function ReportHandler() {
  const reports = useAppSelector((s) => s.data.timerReports);
  const timers = useAppSelector((s) => s.data.timers);

  const detailData: DetailData[] = reports.flatMap((report) =>
    report.reports.map((reportEntry) => {
      const timer = timers.find((timer) => timer.id === report.id_timer);
      return {
        id: timer?.id || new Date().toISOString(),
        title: timer?.title || 'Unknown Timer',
        date: reportEntry.date,
        report: reportEntry.report,
      };
    })
  );

  const sortedData = detailData.sort(sortByDateDescending);

  return sortedData;
}
