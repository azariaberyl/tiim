import { create } from 'zustand';
import { TimerReport } from '../types';
import { jsonComparer } from '../utils';
import { getReport, setReport } from '../utils/timer';

interface IReport {
  report: TimerReport;
  today: string;

  onReportChange: (onUpdateReport: (newReport: TimerReport) => void, num?: number) => void;
  reportUpdate: (val: TimerReport) => void;
}

const useReportStore = create<IReport>()((set, get) => ({
  today: new Date().toDateString(),
  report: getReport(),

  onReportChange: (onUpdateReport, num = 1) => {
    const timerReport = get().report.report;
    const isTodayReportExist = timerReport.some((val) => val.date == get().today);
    if (isTodayReportExist) {
      set((state) => {
        const newState = {
          report: {
            ...state.report,
            report: state.report.report.map((val) =>
              val.date !== state.today ? val : { ...val, report: val.report + num }
            ),
          },
        };
        onUpdateReport(newState.report);
        return newState;
      });
      return;
    }
    set((s) => ({ report: { ...s.report, report: [...s.report.report, { date: s.today, report: num }] } }));
  },

  reportUpdate(val) {
    if (jsonComparer(get().report, val)) return;
    set(() => ({ report: val }));
  },
}));

export default useReportStore;
