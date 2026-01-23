import { createSlice } from "@reduxjs/toolkit";
import { adminUpdateLeadStatusApi } from "../../services/lead/adminUpdateLeadStatusApi";

const initialState = {
  loading: false,
  success: false,
  updatedLead: null,
  error: null,
};

const adminUpdateLeadStatusSlice = createSlice({
  name: "adminUpdateLeadStatus",
  initialState,
  reducers: {
    resetUpdateLeadStatusState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUpdateLeadStatusApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminUpdateLeadStatusApi.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updatedLead = action.payload;
      })
      .addCase(adminUpdateLeadStatusApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateLeadStatusState } = adminUpdateLeadStatusSlice.actions;
export default adminUpdateLeadStatusSlice.reducer;
