// store.ts
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../store/reducers/bookSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
