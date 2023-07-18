import { create } from 'zustand';
import { Report, Timer } from '../types';
import { jsonComparer } from '../utils';
import { DEFAULT_REPORT, TODAY_STRING_DATE } from '../utils/constants';

interface IReport {
  report: Report;
  today: string;

  onReportChange: (
    onUpdateReport: (newReport: Report) => void,
    timer: Timer,
    num?: number
  ) => void;
  reportChange1: (val: Report) => void;
}

const useReportStore = create<IReport>()((set, get) => ({
  today: TODAY_STRING_DATE,
  report: DEFAULT_REPORT,

  onReportChange: (onUpdateReport, timer, num = 1) => {
    const today = TODAY_STRING_DATE;
    const prevReport = get().report;
    const isTodayReportExist = prevReport?.date === today;
    
    if (isTodayReportExist) {
      set(() => {
        const newState: { report: Report } = {
          report: {
            ...prevReport,
            report: prevReport.report + num,
          },
        };
        onUpdateReport(newState.report); // Update the cloud
        return newState;
      });
      return;
    }
    
    set((s) => {
      const newReport: Report = {
        date: TODAY_STRING_DATE,
        id_timer: timer.id,
        report: 0,
        title: timer.title,
        id: '' + +new Date(),
      };
      onUpdateReport(newReport);
      return {
        report: newReport,
      };
    });
  },

  reportChange1(val) {
    const prevReport = get().report;
    if (jsonComparer(prevReport, val)) return;
    set(() => ({ report: val }));
  },
}));

export default useReportStore;
