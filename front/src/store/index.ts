import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authSlice from './features/auth-slice';
import bookSlice from './features/book-slice';
import paymentSlice from './features/payment-slice';
import dashboardSlice from './features/dashboard-slice';
export const store = configureStore({
  reducer: { authSlice, bookSlice, paymentSlice, dashboardSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
