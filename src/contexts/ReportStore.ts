import { create } from 'zustand';

interface IReport {
  report: number;
  onReportChange: () => void;
}

const useReportStore = create<IReport>()((set) => ({
  report: 0,
  onReportChange: () => set((state) => ({ report: state.report + 1 })),
}));

export default useReportStore;
