import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { Timer1 } from '../types/timer';

type initialState = {
  user: User | null;
  timers: Timer1[];
  activeTimerId: string;
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
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changeTimer: (state, action: PayloadAction<Timer1>) => {
      state.timers = state.timers.map((val) => (val.id === state.activeTimerId ? action.payload : val));
    },
  },
});
export const { changeTimer: dataChangeTimer } = dataSlice.actions;
export default dataSlice.reducer;
