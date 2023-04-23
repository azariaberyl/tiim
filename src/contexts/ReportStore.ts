import { create } from 'zustand';
import { TimerReport } from '../types';
import { jsonComparer } from '../utils';
import { getReport, setReport } from '../utils/timer';

interface IReport {
  report: TimerReport;
  today: Date;

  onReportChange: (num?: number) => void;
  reportUpdate: (val: TimerReport) => void;
}

const useReportStore = create<IReport>()((set, get) => ({
  today: new Date(),
  report: getReport(),

  onReportChange: (num = 1) => {
    set((state) => ({
      report: {
        ...state.report,
        report: state.report.report.map((val) =>
          val.date !== state.today ? val : { ...val, report: val.report + num }
        ),
      },
    }));
    setReport(get().report);
  },
  reportUpdate(val) {
    if (jsonComparer(get().report, val)) return;
    set(() => ({ report: val }));
  },
}));

export default useReportStore;
