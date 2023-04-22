import { create } from 'zustand';
import { TimerReport } from '../types';
import { getReport, setReport } from '../utils/timer';

interface IReport {
  report: TimerReport;
  onReportChange: () => void;
  today: Date;
}

const useReportStore = create<IReport>()((set, get) => ({
  today: new Date(),
  report: getReport(),
  onReportChange: () => {
    set((state) => ({
      report: {
        ...state.report,
        report: state.report.report.map((val) =>
          val.date !== state.today ? val : { ...val, report: val.report + 1 }
        ),
      },
    }));
    setReport(get().report);
  },
}));

export default useReportStore;
