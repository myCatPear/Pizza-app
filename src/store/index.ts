import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    filter:filterReducer,
  }
});

export type RootStateType = ReturnType<typeof store.getState>;