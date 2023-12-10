import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { Timer1 } from '../types/timer';
import { Report } from '../types';
import { deleteTimerFirebase, updateActiveTimerIdFirebase, writeTimers } from '../utils/firebase';

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
  timerReports: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateTimers: (state, action: PayloadAction<Timer1>) => {
      const newTimers = state.timers.map((val) => (val.id === state.activeTimerId ? action.payload : val));
      state.timers = newTimers;
      localStorage.setItem('timers', JSON.stringify(newTimers));
      writeTimers(state.user?.uid, state.timers);
    },
    //Create a reducer to update the D-day report only; it should update when the timer finishes.
    updateReport: (
      state,
      action: PayloadAction<
        | {
            date: string;
            report: number;
          }
        | undefined
      >
    ) => {
      if (action.payload === undefined) return;
      // Find the related timer
      const report = state.timerReports.find((report) => report.id_timer === state.activeTimerId);
      // If no report create new report if the timer exists
      // console.log(report);
      if (report === undefined) {
        state.timerReports.push({ id_timer: state.activeTimerId, reports: [action.payload] });
        localStorage.setItem(
          // Save to local storage
          'timerReports',
          JSON.stringify(state.timerReports)
        );
        return;
      }
      const newReports = report?.reports.map((val) => (val.date === action.payload?.date ? action.payload : val));
      const ifTodaysReport = newReports.some((val) => val.date === action.payload?.date);
      // if the day changes
      if (!ifTodaysReport) {
        newReports.push(action.payload);
      }
      // Update today's report
      const newReport: Report = { ...report, reports: newReports }; // Update specific timer's reports
      const newTimerReports = state.timerReports.map((val) => (val.id_timer === newReport.id_timer ? newReport : val)); // Insert the new timer's report into timerReports
      state.timerReports = newTimerReports;
      localStorage.setItem('timerReports', JSON.stringify(newTimerReports));
    },
    addTimer: (state, action: PayloadAction<Timer1>) => {
      state.timers.push(action.payload);
      state.activeTimerId = action.payload.id;

      localStorage.setItem('timers', JSON.stringify([...state.timers]));
      localStorage.setItem('activeTimerId', action.payload.id);
      writeTimers(state.user?.uid, state.timers);
      updateActiveTimerIdFirebase(state.user?.uid, action.payload.id);
    },
    changeTimerId: (state, action: PayloadAction<string>) => {
      state.activeTimerId = action.payload;

      // Save to local storage
      localStorage.setItem('activeTimerId', action.payload);
      updateActiveTimerIdFirebase(state.user?.uid, action.payload);
    },

    changeTimerReports: (state, action: PayloadAction<Report[] | undefined>) => {
      if (action.payload === undefined) return;
      state.timerReports = action.payload;
    },

    changeTimers: (state, action: PayloadAction<Timer1[] | undefined>) => {
      if (action.payload === undefined) return;
      state.timers = action.payload;
    },

    deleteTimer: (state) => {
      const newTimers = state.timers.filter((timer) => timer.id !== state.activeTimerId);
      const newReports = state.timerReports.filter((timer) => timer.id_timer !== state.activeTimerId);
      const removedId = state.activeTimerId;
      if (newTimers.length === 0) {
        state.timers = [
          {
            id: '-1',
            longBreak: 600,
            seconds: 1500,
            shortBreak: 300,
            title: 'My Project',
          },
        ];
        state.activeTimerId = '-1';
        state.timerReports = newReports;
      } else {
        state.timers = newTimers;
        state.activeTimerId = newTimers[0].id;
        state.timerReports = newReports;
      }
      localStorage.setItem('timers', JSON.stringify(state.timers));
      localStorage.setItem('activeTimerId', JSON.stringify(state.activeTimerId));
      localStorage.setItem('timerReports', JSON.stringify(state.timerReports));
      deleteTimerFirebase(state.user?.uid, removedId, state.activeTimerId, state.timers);
    },
    updateUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});
export const {
  updateTimers,
  updateReport,
  addTimer,
  changeTimerId,
  changeTimerReports,
  changeTimers,
  deleteTimer,
  updateUser,
} = dataSlice.actions;
export default dataSlice.reducer;
