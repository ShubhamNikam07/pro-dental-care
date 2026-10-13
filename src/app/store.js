import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from '../features/appointment/appointmentSlice';

export const store = configureStore({
  reducer: { appointment: appointmentReducer },
});
