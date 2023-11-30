import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    second: 1500,
    start: false,
  },
  reducers: {
    decrement: (state) => {
      if (state.second == 0) return;
      state.second -= 1;
    },
    changeTime: (state, action) => {
      state.second += action.payload;
    },
    startChange: (state, action: PayloadAction<boolean | undefined>) => {
      state.start = action.payload ?? !state.start;
    },
  },
});

// Action creators are generated for each case reducer function
export const { decrement, changeTime, startChange } = timerSlice.actions;

export default timerSlice.reducer;
