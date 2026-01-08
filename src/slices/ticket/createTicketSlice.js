import { createSlice } from "@reduxjs/toolkit";
import { createTicketThunk } from "../../services/ticket/createTicketApi";

const initialState = {
  loading: false,
  ticket: null,
  success: false,
  error: null,
};

const createTicketSlice = createSlice({
  name: "createTicket",
  initialState,
  reducers: {
    resetCreateTicketState: (state) => {
      state.loading = false;
      state.ticket = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicketThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTicketThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload;
        state.success = true;
      })
      .addCase(createTicketThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetCreateTicketState } = createTicketSlice.actions;
export default createTicketSlice.reducer;
