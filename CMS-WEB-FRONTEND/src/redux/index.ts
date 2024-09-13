import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import { apiReducer } from '@/api';
import { snackbarReducer } from './snackbar/snackbar.slice';

const store = configureStore({
    reducer: {
        api: apiReducer,
        snackbar: snackbarReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
 
export default store;
