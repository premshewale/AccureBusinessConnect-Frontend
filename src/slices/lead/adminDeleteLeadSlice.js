import { createSlice } from "@reduxjs/toolkit";
import { adminDeleteLeadApi } from "../../services/lead/adminDeleteLeadApi";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const adminDeleteLeadSlice = createSlice({
  name: "adminDeleteLead",
  initialState,
  reducers: {
    resetDeleteLeadState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminDeleteLeadApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminDeleteLeadApi.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminDeleteLeadApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeleteLeadState } = adminDeleteLeadSlice.actions;
export default adminDeleteLeadSlice.reducer;
