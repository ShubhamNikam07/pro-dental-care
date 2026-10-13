import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false, submitted: false };
const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    openAppointment(state) { state.isOpen = true; state.submitted = false; },
    closeAppointment(state) { state.isOpen = false; },
    submitAppointment(state) { state.submitted = true; },
  },
});
export const { openAppointment, closeAppointment, submitAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
