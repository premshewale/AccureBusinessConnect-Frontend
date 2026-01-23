import { createSlice } from "@reduxjs/toolkit";
import {
  adminActivateUser,
  adminDeactivateUser,
} from "../../services/user/adminToggleUserStatusApi";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const adminToggleUserStatusSlice = createSlice({
  name: "adminToggleUserStatus",
  initialState,
  reducers: {
    resetAdminToggleUserStatus: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      // 🔹 Activate
      .addCase(adminActivateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminActivateUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminActivateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Deactivate
      .addCase(adminDeactivateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminDeactivateUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminDeactivateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminToggleUserStatus } =
  adminToggleUserStatusSlice.actions;

export default adminToggleUserStatusSlice.reducer;
