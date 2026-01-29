import { createSlice } from "@reduxjs/toolkit";
import { getTicketById } from "../../services/ticket/getTicketByIdApi";

const initialState = {
  loading: false,
  ticket: null,
  error: null,
};

const getTicketByIdSlice = createSlice({
  name: "getTicketById",
  initialState,
  reducers: {
    resetTicketDetails: state => {
      state.loading = false;
      state.ticket = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTicketById.pending, state => { state.loading = true; state.error = null; })
      .addCase(getTicketById.fulfilled, (state, action) => { state.loading = false; state.ticket = action.payload; })
      .addCase(getTicketById.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || "Failed to fetch ticket"; });
  },
});

export const { resetTicketDetails } = getTicketByIdSlice.actions;
export default getTicketByIdSlice.reducer;
