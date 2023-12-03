import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { Timer1 } from '../types/timer';
import { Report } from '../types';

type initialState = {
  user: User | null;
  timers: Timer1[];
  activeTimerId: string;
  timerReports: Report[];
};

const initialState: initialState = {
  user: null,
  timers: [
    {
      id: '-1',
      longBreak: 600,
      seconds: 1500,
      shortBreak: 300,
      title: 'My Project',
    },
  ],
  activeTimerId: '-1',
  timerReports: [{ id_timer: '-1', reports: [{ date: new Date().toLocaleDateString(), report: -1 }] }],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changeTimer: (state, action: PayloadAction<Timer1>) => {
      state.timers = state.timers.map((val) => (val.id === state.activeTimerId ? action.payload : val));
    },
    //Create a reducer to update the D-day report only; it should update when the timer finishes.
    updateReport: (
      state,
      action: PayloadAction<{
        date: string;
        report: number;
      }>
    ) => {
      const report = state.timerReports.find((report) => report.id_timer === state.activeTimerId);
      if (report === undefined) return;

      const newReports = report?.reports.map((val) => (val.date === action.payload.date ? action.payload : val));
      const newReport: Report = { ...report, reports: newReports };
      state.timerReports = state.timerReports.map((val) => (val.id_timer === newReport.id_timer ? newReport : val));
    },
  },
});
export const { changeTimer: dataChangeTimer, updateReport } = dataSlice.actions;
export default dataSlice.reducer;
