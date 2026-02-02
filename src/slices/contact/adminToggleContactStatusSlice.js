import { createSlice } from "@reduxjs/toolkit";
import {
  adminActivateContact,
  adminDeactivateContact,
} from "../../services/contact/adminToggleContactStatusApi";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const adminToggleContactStatusSlice = createSlice({
  name: "adminToggleContactStatus",
  initialState,
  reducers: {
    resetAdminToggleContactStatus: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      // 🔹 Activate Contact
      .addCase(adminActivateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminActivateContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminActivateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Deactivate Contact
      .addCase(adminDeactivateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminDeactivateContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminDeactivateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminToggleContactStatus } =
  adminToggleContactStatusSlice.actions;

export default adminToggleContactStatusSlice.reducer;
