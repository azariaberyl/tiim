import { create } from 'zustand';
import { TimerReport } from '../types';
import { jsonComparer } from '../utils';
import { DEFAULT_REPORT, DEFAULT_TIMER, TODAY_STRING_DATE } from '../utils/constants';
import { getReports, getSelected } from '../utils/timer';

interface IReport {
  report: TimerReport;
  today: string;

  onReportChange: (onUpdateReport: (newReport: TimerReport) => void, num?: number) => void;
  reportChange1: (val: TimerReport) => void;
}

const getReportFromLocalStorage = () => {
  const val = getReports().find((val) => {
    return val.id === (getSelected() ? getSelected() : DEFAULT_TIMER.id);
  });
  return val || DEFAULT_REPORT;
};
const defaultReport = getReportFromLocalStorage();

const useReportStore = create<IReport>()((set, get) => ({
  today: TODAY_STRING_DATE,
  report: defaultReport,

  onReportChange: (onUpdateReport, num = 1) => {
    const today = TODAY_STRING_DATE;
    const timerReport = get().report.report;
    const isTodayReportExist = timerReport.some((val) => val.date == today);

    if (isTodayReportExist) {
      set((state) => {
        const newState = {
          report: {
            ...state.report,
            report: state.report.report.map((val) => (val.date !== today ? val : { ...val, report: val.report + num })),
          },
        };
        onUpdateReport(newState.report); // Update the cloud
        return newState;
      });
      return;
    }

    set((s) => ({ report: { ...s.report, report: [...s.report.report, { date: today, report: num }] } }));
  },

  reportChange1(val) {
    if (jsonComparer(get().report, val)) return;
    set(() => ({ report: val }));
  },
}));

export default useReportStore;
