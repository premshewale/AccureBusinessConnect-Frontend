import { createSlice } from "@reduxjs/toolkit";
import { updateTicket } from "../../services/ticket/updateTicketApi";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const updateTicketSlice = createSlice({
  name: "updateTicket",
  initialState,
  reducers: {
    resetUpdateTicketState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateTicket.pending, state => { state.loading = true; state.error = null; })
      .addCase(updateTicket.fulfilled, state => { state.loading = false; state.success = true; })
      .addCase(updateTicket.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { resetUpdateTicketState } = updateTicketSlice.actions;
export default updateTicketSlice.reducer;
