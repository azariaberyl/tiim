import { create } from 'zustand';
import { getReport, setReport } from '../utils/timer';

interface IReport {
  report: number;
  onReportChange: () => void;
}

const useReportStore = create<IReport>()((set, get) => ({
  report: getReport(),
  onReportChange: () => {
    set((state) => ({ report: state.report + 1 }));
    setReport(get().report);
  },
}));

export default useReportStore;
