import { createSlice } from "@reduxjs/toolkit";
import {
  adminActivateLead,
  adminDeactivateLead,
} from "../../services/lead/adminToggleLeadStatusApi";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const adminToggleLeadStatusSlice = createSlice({
  name: "adminToggleLeadStatus",
  initialState,
  reducers: {
    resetAdminToggleLeadStatus: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminActivateLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminActivateLead.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminActivateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(adminDeactivateLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminDeactivateLead.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminDeactivateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminToggleLeadStatus } =
  adminToggleLeadStatusSlice.actions;

export default adminToggleLeadStatusSlice.reducer;
