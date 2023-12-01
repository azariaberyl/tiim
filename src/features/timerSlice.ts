import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Timer1 } from '../types/timer';

type initialState = {
  second: number;
  start: boolean;
  pomodoroTimer: number;
  title: string;
  shortBreak: number;
  longBreak: number;
  tab: 1 | 2 | 3;
};

const initialState: initialState = {
  second: 1500,
  pomodoroTimer: 1500,
  start: false,
  shortBreak: 300,
  longBreak: 600,
  tab: 1,
  title: 'My Project',
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    decrement: (state) => {
      if (state.second > 0) {
        state.second -= 1;
        return;
      }
      state.start = false;
    },
    changeTimer: (state, action: PayloadAction<Timer1>) => {
      state.second = action.payload.seconds;
      state.pomodoroTimer = action.payload.seconds;
      state.shortBreak = action.payload.shortBreak;
      state.longBreak = action.payload.longBreak;
      state.title = action.payload.title;
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
  },
});

// Action creators are generated for each case reducer function
export const { decrement, changeTimer, startChange, changeTab } = timerSlice.actions;

export default timerSlice.reducer;
