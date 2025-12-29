import { createSlice } from "@reduxjs/toolkit";
import { adminCreateStaff } from "../../services/staff/adminCreateStaffApi";

const initialState = {
  loading: false,
  success: false,
  createdStaff: null,
  error: null,
};

const adminCreateStaffSlice = createSlice({
  name: "adminCreateStaff",
  initialState,
  reducers: {
    resetAdminCreateStaff: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminCreateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminCreateStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdStaff = action.payload;
      })
      .addCase(adminCreateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminCreateStaff } = adminCreateStaffSlice.actions;
export default adminCreateStaffSlice.reducer;
