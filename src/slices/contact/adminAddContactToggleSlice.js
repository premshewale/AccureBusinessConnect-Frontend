import { createSlice } from "@reduxjs/toolkit";
import {
  adminAddContactToGoogle,
  adminRemoveContactFromGoogle,
} from "../../services/contact/adminAddContactToggleApi";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const adminAddContactToggleSlice = createSlice({
  name: "adminAddContactToggle",
  initialState,
  reducers: {
    resetAdminAddContactToggle: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      // 🔹 Add to Google
      .addCase(adminAddContactToGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminAddContactToGoogle.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminAddContactToGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Remove from Google
      .addCase(adminRemoveContactFromGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminRemoveContactFromGoogle.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminRemoveContactFromGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminAddContactToggle } =
  adminAddContactToggleSlice.actions;

export default adminAddContactToggleSlice.reducer;
