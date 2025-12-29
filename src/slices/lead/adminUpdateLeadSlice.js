import { createSlice } from "@reduxjs/toolkit";
import { adminUpdateLeadApi } from "../../services/lead/adminUpdateLeadApi";

const initialState = {
  loading: false,
  success: false,
  updatedLead: null,
  error: null,
};

const adminUpdateLeadSlice = createSlice({
  name: "adminUpdateLead",
  initialState,
  reducers: {
    resetUpdateLeadState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUpdateLeadApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminUpdateLeadApi.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updatedLead = action.payload;
      })
      .addCase(adminUpdateLeadApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateLeadState } = adminUpdateLeadSlice.actions;
export default adminUpdateLeadSlice.reducer;
