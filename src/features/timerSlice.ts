import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Timer1 } from '../types/timer';
import { Report } from '../types';

type initialState = {
  second: number;
  start: boolean;
  pomodoroTimer: number;
  title: string;
  shortBreak: number;
  longBreak: number;
  tab: 1 | 2 | 3;
  report: { date: string; report: number };
};

const initialState: initialState = {
  second: 1500,
  pomodoroTimer: 1500,
  start: false,
  shortBreak: 300,
  longBreak: 600,
  tab: 1,
  title: 'My Project',
  // TODO: This will create a new object whenever the app is opened, not when the day changes.
  report: { date: new Date().toLocaleDateString(), report: -1 },
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    decrement: (state) => {
      if (state.second > 0) {
        state.second -= 1;
        state.report.report === -1 ? (state.report.report = 1) : (state.report.report += 1);
        return;
      }
      state.start = false;
    },
    changeTimer: (state, action: PayloadAction<Timer1>) => {
      state.pomodoroTimer = action.payload.seconds;
      state.shortBreak = action.payload.shortBreak;
      state.longBreak = action.payload.longBreak;
      state.title = action.payload.title;
      if (state.tab === 1) {
        state.second = action.payload.seconds;
        return;
      }
      if (state.tab === 2) {
        state.second = action.payload.shortBreak;
        return;
      }
      if (state.tab === 3) {
        state.second = action.payload.longBreak;
        return;
      }
    },
    startChange: (state, action: PayloadAction<boolean | undefined>) => {
      state.start = action.payload ?? !state.start;
    },
    changeTab: (state, action: PayloadAction<1 | 2 | 3>) => {
      document.title = 'Pomodoro Timer';
      state.start = false;
      switch (action.payload) {
        case 1:
          state.second = state.pomodoroTimer;
          state.tab = 1;
          break;
        case 2:
          state.second = state.shortBreak;
          state.tab = 2;
          break;
        case 3:
          state.second = state.longBreak;
          state.tab = 3;
          break;

        default:
          break;
      }
    },
    resetReport: (state) => {
      state.report = { date: new Date().toLocaleDateString(), report: -1 };
    },
    changeTimerReport: (state, action: PayloadAction<{ date: string; report: number } | undefined>) => {
      if (action.payload === undefined) return;
      state.report = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { decrement, changeTimer, startChange, changeTab, resetReport, changeTimerReport } = timerSlice.actions;

export default timerSlice.reducer;
