import { createSlice } from "@reduxjs/toolkit";
import { adminConvertLeadApi } from "../../services/lead/adminConvertLeadApi";

const initialState = {
  loading: false,
  success: false,
  customer: null, // optional: backend may return created customer
  error: null,
};

const adminConvertLeadSlice = createSlice({
  name: "adminConvertLead",
  initialState,
  reducers: {
    resetConvertLeadState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminConvertLeadApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminConvertLeadApi.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.customer = action.payload;
      })
      .addCase(adminConvertLeadApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetConvertLeadState } = adminConvertLeadSlice.actions;
export default adminConvertLeadSlice.reducer;
