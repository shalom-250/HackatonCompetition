import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import jobsReducer from './slices/jobsSlice';
import candidatesReducer from './slices/candidatesSlice';

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        candidates: candidatesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
