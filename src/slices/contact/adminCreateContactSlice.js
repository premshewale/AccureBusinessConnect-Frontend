import { createSlice } from "@reduxjs/toolkit";
import { adminCreateContact } from "../../services/contact/adminCreateContactApi";

const initialState = {
  loading: false,
  success: false,
  createdContact: null,
  error: null,
};

const adminCreateContactSlice = createSlice({
  name: "adminCreateContact",
  initialState,
  reducers: {
    resetAdminCreateContact: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminCreateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminCreateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdContact = action.payload;
      })
      .addCase(adminCreateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminCreateContact } =
  adminCreateContactSlice.actions;

export default adminCreateContactSlice.reducer;
