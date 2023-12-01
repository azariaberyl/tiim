import { configureStore } from '@reduxjs/toolkit';
import timerReducer from '../features/timerSlice';
import dataReducer from '../features/dataSlice';

const store = configureStore({
  reducer: {
    timer: timerReducer,
    data: dataReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
