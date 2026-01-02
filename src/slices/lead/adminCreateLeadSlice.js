import { createSlice } from "@reduxjs/toolkit";
import { adminCreateLead } from "../../services/lead/adminCreateLeadApi";

const initialState = {
  loading: false,
  success: false,
  createdLead: null,
  error: null,
};

const adminCreateLeadSlice = createSlice({
  name: "adminCreateLead",
  initialState,
  reducers: {
    resetAdminCreateLead: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminCreateLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminCreateLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdLead = action.payload;
      })
      .addCase(adminCreateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminCreateLead } = adminCreateLeadSlice.actions;
export default adminCreateLeadSlice.reducer;
